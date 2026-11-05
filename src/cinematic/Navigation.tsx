import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  BookOpen,
  Menu,
  Pause,
  Play,
  X,
} from "lucide-react";
import { brandLogos, chapters } from "../data/cinematic";
import { useExperience } from "./ExperienceContext";
import { Dialog } from "./Dialogs";
export function Navigation({
  onFilm,
  onEvidence,
}: {
  onFilm: () => void;
  onEvidence: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const header = useRef<HTMLElement>(null);
  const [surface, setSurface] = useState<"dark" | "light" | "cream">("dark");
  const { active, paused, setPaused, reduced, still, setStill } =
    useExperience();
  const current = chapters.findIndex((c) => c[0] === active);
  useEffect(() => {
    const footer = document.getElementById("site-footer");
    if (!footer) return;
    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    // Read the surface at the fixed logo, rather than the chapter at screen center.
    const stages = Array.from(document.querySelectorAll<HTMLElement>(".chapter-stage, #film"));
    let frame = 0;
    const update = () => {
      frame = 0;
      const logo = header.current?.querySelector(".brand-wordmark");
      if (!logo) return;
      const bounds = logo.getBoundingClientRect();
      const y = bounds.top + bounds.height / 2;
      let next: "dark" | "light" | "cream" = "dark";
      for (const stage of stages) {
        const rect = stage.getBoundingClientRect();
        if (rect.top > y || rect.bottom <= y) continue;
        if (stage.id === "film") next = "cream";
        else {
          const chapter = stage.closest<HTMLElement>("[data-chapter]");
          next = chapter?.id === "contribute" && Number(chapter.dataset.beat) >= 3
            ? "light" : "dark";
        }
      }
      setSurface(next);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const observer = new MutationObserver(schedule);
    const contribution = document.getElementById("contribute");
    if (contribution) observer.observe(contribution, { attributes: true, attributeFilter: ["data-beat"] });
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    for (const src of Object.values(brandLogos)) {
      const image = new Image();
      image.src = src;
    }
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [reduced]);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to story
      </a>
      <header
        ref={header}
        className={`film-header ${surface === "light" ? "over-light" : surface === "cream" ? "over-light film-light" : ""}`}
      >
        <a
          href="#opening"
          className="brand-wordmark"
          aria-label="FridgeStreet AI — back to beginning"
        >
          <img
            key={surface === "dark" ? "white" : "blue"}
            src={surface === "dark" ? brandLogos.white : brandLogos.blue}
            alt="FridgeStreet AI"
            width={surface === "dark" ? 617 : 1234}
            height={surface === "dark" ? 91 : 182}
          />
        </a>
        <div className="header-actions">
          <button onClick={onFilm} className="header-film">
            <Play size={12} />
            Watch the film <ArrowUpRight size={12} />
          </button>
          <button
            className="chapter-menu"
            onClick={() => setOpen(true)}
            aria-label="Open chapters"
          >
            <span>Explore</span>
            <Menu size={19} />
          </button>
        </div>
      </header>
      <div
        className={`reading-controls ${active === "contribute" ? "over-light" : active === "film" ? "over-light film-light" : ""}`}
        data-footer-visible={footerVisible}
        aria-hidden={footerVisible || undefined}
        inert={footerVisible}
      >
        <button
          className="current-chapter"
          onClick={() => setOpen(true)}
          aria-label="Choose chapter"
        >
          <span>{String(Math.max(0, current)).padStart(2, "0")} / 10</span>
          <span>{chapters[current]?.[1] || "The beginning"}</span>
          <ArrowDown size={12} />
        </button>
        <button
          className="motion-control"
          onClick={() => setPaused(!paused)}
          aria-pressed={paused}
          aria-label={
            paused ? "Resume cinematic motion" : "Pause cinematic motion"
          }
          disabled={reduced}
        >
          {paused || reduced ? <Play size={13} /> : <Pause size={13} />}
          <span>
            {reduced ? "Still mode" : paused ? "Motion paused" : "Motion on"}
          </span>
        </button>
      </div>
      {open && (
        <Dialog
          title="Explore the story"
          kind="chapters-dialog"
          onClose={() => setOpen(false)}
        >
          <label className="reader-preference">
            <input
              type="checkbox"
              checked={still}
              onChange={(e) => setStill(e.target.checked)}
            />
            Read without motion
          </label>
          <nav aria-label="Story chapters">
            {chapters.map(([id, label], i) => (
              <a
                key={id}
                href={`#${id}`}
                aria-current={active === id ? "location" : undefined}
                onClick={() => setOpen(false)}
              >
                <span>{String(i).padStart(2, "0")}</span>
                <strong>{label}</strong>
                <ArrowUpRight size={19} />
              </a>
            ))}
          </nav>
          <button
            className="drawer-research"
            onClick={() => {
              setOpen(false);
              onEvidence();
            }}
          >
            <BookOpen size={17} />
            Research & design notes <ArrowUpRight size={16} />
          </button>
          <button className="sr-only" onClick={() => setOpen(false)}>
            <X />
            Close chapters
          </button>
        </Dialog>
      )}
    </>
  );
}
