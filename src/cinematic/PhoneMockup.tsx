import { ZoomIn } from "lucide-react";
import { useEffect, useRef } from "react";
import type { UiAsset } from "../data/cinematic";
export function PhoneMockup({
  asset,
  nextAsset,
  onInspect,
  priority = false,
  className = "",
}: {
  asset: UiAsset;
  nextAsset?: UiAsset;
  onInspect: (asset: UiAsset) => void;
  priority?: boolean;
  className?: string;
}) {
  const figure = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!nextAsset || !figure.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const image = new Image();
          image.src = nextAsset.webp;
          observer.disconnect();
        }
      },
      { rootMargin: "150px" },
    );
    observer.observe(figure.current);
    return () => observer.disconnect();
  }, [asset.key, nextAsset]);
  return (
    <figure
      ref={figure}
      className={`original-ui ${asset.flat ? "flat-screen" : ""} ${className}`}
      key={asset.key}
    >
      <picture>
        <source srcSet={asset.webp} type="image/webp" />
        <img
          src={asset.src}
          width={asset.width}
          height={asset.height}
          alt={asset.alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
        />
      </picture>
      <button
        className="inspect-ui"
        onClick={() => onInspect(asset)}
        aria-label={`Enlarge ${asset.alt}`}
      >
        <ZoomIn size={13} />
        <span>View original {asset.flat ? "screen" : "UI"}</span>
      </button>
    </figure>
  );
}
