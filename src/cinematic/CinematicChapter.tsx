import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { media } from "../data/cinematic";
import { useExperience } from "./ExperienceContext";
gsap.registerPlugin(ScrollTrigger);
type ChapterState = { beat: number; choose: (i: number) => void };
export function CinematicChapter({
  id,
  number,
  label,
  video,
  beats = 1,
  length = 200,
  className = "",
  position = "50% 50%",
  children,
}: {
  id: string;
  number: string;
  label: string;
  video?: number;
  beats?: number;
  length?: number;
  className?: string;
  position?: string;
  children: (state: ChapterState) => ReactNode;
}) {
  const section = useRef<HTMLElement>(null);
  const movie = useRef<HTMLVideoElement>(null);
  const [beat, setBeat] = useState(0);
  const [near, setNear] = useState(false);
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const manual = useRef(false);
  const progress = useRef(0);
  const { reduced, paused, setActive } = useExperience();
  const [isMobile, setIsMobile] = useState(
    () => matchMedia("(max-width: 800px)").matches,
  );
  const choose = useCallback(
    (i: number) => {
      manual.current = true;
      setBeat(i);
      if (isMobile)
        section.current?.scrollIntoView({
          behavior: reduced ? "instant" : "smooth",
          block: "start",
        });
    },
    [isMobile, reduced],
  );
  useEffect(() => {
    const node = section.current!;
    const nearObserver = new IntersectionObserver(
      (entries) => entries.forEach((entry) => setNear(entry.isIntersecting)),
      { rootMargin: "80% 0px" },
    );
    const activeObserver = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          setVisible(entry.isIntersecting);
          if (entry.isIntersecting) setActive(id);
        }),
      { rootMargin: "-35% 0px -45% 0px" },
    );
    nearObserver.observe(node);
    activeObserver.observe(node);
    const resume = (event: Event) => {
      if (
        !(event.target as Element)?.closest("input,select,.interaction-panel")
      )
        manual.current = false;
    };
    node.addEventListener("wheel", resume, { passive: true });
    node.addEventListener("touchmove", resume, { passive: true });
    const query = matchMedia("(max-width: 800px)");
    const resize = () => setIsMobile(query.matches);
    query.addEventListener("change", resize);
    const trigger = ScrollTrigger.create({
      trigger: node,
      start: "top top",
      end: "bottom bottom",
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        progress.current = self.progress;
        node.style.setProperty("--chapter-progress", String(self.progress));
        if (!manual.current && !reduced && !paused && !isMobile)
          setBeat(Math.min(beats - 1, Math.floor(self.progress * beats)));
      },
    });
    return () => {
      nearObserver.disconnect();
      activeObserver.disconnect();
      trigger.kill();
      node.removeEventListener("wheel", resume);
      node.removeEventListener("touchmove", resume);
      query.removeEventListener("change", resize);
    };
  }, [id, beats, reduced, paused, isMobile, setActive]);
  useEffect(() => {
    const el = movie.current;
    if (!el) return;
    if (!near || reduced) {
      el.pause();
      el.removeAttribute("src");
      el.load();
      setLoaded(false);
      return;
    }
    const source = isMobile ? media[video!].mobile : media[video!].src;
    if (el.getAttribute("src") !== source) {
      setLoaded(false);
      el.src = source;
      el.load();
    }
    if (paused || !visible) {
      el.pause();
      return;
    }
    if (isMobile) {
      void el.play().catch(() => {});
      return () => el.pause();
    }
    let frame = 0;
    const seek = () => {
      if (el.readyState >= 2 && Number.isFinite(el.duration) && !el.seeking) {
        const target = Math.min(
          el.duration - 0.04,
          Math.max(0.02, progress.current * el.duration),
        );
        if (Math.abs(el.currentTime - target) > 0.065) el.currentTime = target;
      }
      frame = requestAnimationFrame(seek);
    };
    frame = requestAnimationFrame(seek);
    return () => {
      cancelAnimationFrame(frame);
      el.pause();
    };
  }, [near, visible, video, reduced, paused, isMobile]);
  return (
    <section
      ref={section}
      id={id}
      data-chapter
      data-beat={beat}
      className={`cinematic-chapter ${className} ${reduced ? "reduced" : ""}`}
      style={
        {
          "--chapter-length": `${length}svh`,
          "--video-position": position,
        } as CSSProperties
      }
      aria-label={`${number} ${label}`}
    >
      <div className="chapter-stage">
        {video !== undefined && (
          <div className="world-media">
            <img
              className="scene-poster"
              src={media[video].poster}
              alt=""
              loading={id === "opening" ? "eager" : "lazy"}
              fetchPriority={id === "opening" ? "high" : "auto"}
            />
            <video
              ref={movie}
              muted
              playsInline
              preload="none"
              aria-hidden="true"
              aria-label={`${label} — approved concept film footage`}
              className={loaded && !failed ? "video-ready" : ""}
              onLoadedData={() => setLoaded(true)}
              onError={() => setFailed(true)}
            />
            {failed && (
              <span className="media-fallback">
                Still from the project film
              </span>
            )}
          </div>
        )}
        <div className="cinema-scrim" />
        <div className="scene-topline">
          <span>
            {number} <i /> {label}
          </span>
          <span>THE NEXT NEIGHBOR</span>
        </div>
        {children({ beat, choose })}
        <div className="scene-progress" aria-hidden="true">
          <i />
        </div>
      </div>
    </section>
  );
}
export function BeatCopy({ lines, beat }: { lines: string[]; beat: number }) {
  return (
    <div className="beat-copy">
      {lines.map((line, i) => (
        <h2
          key={line}
          className={`narrative-line ${i === beat ? "is-current" : ""}`}
        >
          {line}
        </h2>
      ))}
    </div>
  );
}
