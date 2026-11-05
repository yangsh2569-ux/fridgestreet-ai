import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowUpRight, FileText, Play, X } from "lucide-react";
import { evidence, media, type UiAsset } from "../data/cinematic";
export function Dialog({
  title,
  kind,
  children,
  onClose,
}: {
  title: string;
  kind: string;
  children: ReactNode;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const opener = useRef(document.activeElement as HTMLElement | null);
  useEffect(() => {
    const el = ref.current!;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    el.showModal();
    el.querySelector<HTMLButtonElement>(".close-dialog")?.focus();
    return () => {
      el.close();
      document.body.style.overflow = overflow;
      opener.current?.focus({ preventScroll: true });
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className={`story-dialog ${kind}`}
      aria-label={title}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="dialog-surface">
        <div className="dialog-heading">
          <span>{title}</span>
          <button
            className="icon-action close-dialog"
            aria-label={`Close ${title}`}
            onClick={onClose}
          >
            <X size={23} />
          </button>
        </div>
        {children}
      </div>
    </dialog>
  );
}
export function FilmModal({ onClose }: { onClose: () => void }) {
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  return (
    <Dialog title="The Next Neighbor film" kind="film-dialog" onClose={onClose}>
      <div className="full-film">
        {playing && !failed ? (
          <video
            controls
            autoPlay
            playsInline
            preload="metadata"
            src={media[9].src}
            poster={media[9].poster}
            onError={() => setFailed(true)}
            aria-label="The Next Neighbor full project film"
          />
        ) : (
          <>
            <img
              src={media[9].poster}
              alt="A neighbor at the community fridge in the project film"
            />
            <div className="film-cover-copy">
              <span className="eyebrow">A FRIDGESTREET AI FILM</span>
              <h2>The Next Neighbor</h2>
              {failed ? (
                <a
                  className="pill yellow"
                  href="https://youtu.be/ccwUKYgqmyw"
                  target="_blank"
                  rel="noreferrer"
                >
                  Watch on YouTube <ArrowUpRight size={18} />
                </a>
              ) : (
                <button
                  className="pill yellow"
                  onClick={() => setPlaying(true)}
                >
                  <Play size={17} fill="currentColor" />
                  Play film
                </button>
              )}
            </div>
          </>
        )}
      </div>
      <div className="film-endline">
        <span>Food to share. A community to care.</span>
        <a href="https://youtu.be/ccwUKYgqmyw" target="_blank" rel="noreferrer">
          Watch on YouTube <ArrowUpRight size={14} />
        </a>
      </div>
    </Dialog>
  );
}
export function EvidenceDrawer({ onClose }: { onClose: () => void }) {
  return (
    <Dialog
      title="Research & design notes"
      kind="evidence-dialog"
      onClose={onClose}
    >
      <div className="drawer-intro">
        <span className="eyebrow">BEHIND THE STORY</span>
        <h2>
          Care begins
          <br />
          with clarity.
        </h2>
        <p>
          Published context, considered design choices, and the limits of the
          concept.
        </p>
      </div>
      <div className="research-entries">
        {evidence.map((item, i) => (
          <details key={item.title} open={i === 0 || undefined}>
            <summary>
              <span>0{i + 1}</span>
              {item.title}
              <i>+</i>
            </summary>
            <div className="research-detail">
              <span className="research-type">{item.type}</span>
              <p>{item.text}</p>
              {item.url ? (
                <a href={item.url} target="_blank" rel="noreferrer">
                  <FileText size={15} />
                  {item.source}
                  <ArrowUpRight size={15} />
                </a>
              ) : (
                <small>{item.source}</small>
              )}
            </div>
          </details>
        ))}
      </div>
      <p className="drawer-end">
        No interviews, deployment results, or impact statistics have been
        invented for this case study.
      </p>
    </Dialog>
  );
}
export function ImageDialog({
  asset,
  onClose,
}: {
  asset: UiAsset;
  onClose: () => void;
}) {
  return (
    <Dialog title="Original Figma design" kind="image-dialog" onClose={onClose}>
      <p className="image-description">{asset.alt}</p>
      <img
        className="full-original"
        src={asset.src}
        width={asset.width}
        height={asset.height}
        alt={asset.alt}
      />
      <p className="image-description">
        Original export · {asset.width} × {asset.height} ·{" "}
        {asset.flat
          ? "Flow V2 supporting screen"
          : "Full device mockup; original screen and bezel"}
      </p>
    </Dialog>
  );
}
