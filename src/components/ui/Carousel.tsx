"use client";

import useEmblaCarousel from "embla-carousel-react";
import {
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/cn";
import { trackCarouselNavigate } from "@/lib/analytics";

type Props = {
  children: ReactNode[];
  className?: string;
  slideClassName?: string;
  ariaLabel?: string;
  showArrows?: boolean;
  showDots?: boolean;
  /** GA計測用のカルーセル識別子。未指定時は ariaLabel を使用 */
  analyticsId?: string;
};

export default function Carousel({
  children,
  className,
  slideClassName,
  ariaLabel,
  showArrows = true,
  showDots = true,
  analyticsId,
}: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    dragFree: false,
  });
  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);
  const lastTrackedIndex = useRef<number | null>(null);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    const index = emblaApi.selectedScrollSnap();
    setSelected(index);
    // 初期表示（index 0）は計測せず、矢印・ドット・スワイプによる移動のみ送信する
    if (lastTrackedIndex.current !== null && lastTrackedIndex.current !== index) {
      trackCarouselNavigate(analyticsId ?? ariaLabel ?? "carousel", index);
    }
    lastTrackedIndex.current = index;
  }, [emblaApi, analyticsId, ariaLabel]);

  useEffect(() => {
    if (!emblaApi) return;
    setSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (idx: number) => emblaApi?.scrollTo(idx),
    [emblaApi],
  );

  return (
    <div
      className={cn("relative", className)}
      aria-label={ariaLabel}
      role="region"
    >
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4 md:gap-6">
          {children.map((c, i) => (
            <div
              key={i}
              className={cn(
                "min-w-0 shrink-0 grow-0 basis-[85%] sm:basis-[60%] md:basis-[42%] lg:basis-[32%]",
                slideClassName,
              )}
            >
              {c}
            </div>
          ))}
        </div>
      </div>
      {showArrows ? (
        <div className="mt-6 flex items-center justify-between">
          {showDots ? (
            <div className="flex flex-wrap items-center gap-2">
              {snaps.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`スライド ${i + 1}`}
                  aria-current={selected === i}
                  onClick={() => scrollTo(i)}
                  className={cn(
                    "h-2 rounded-full transition-all",
                    selected === i
                      ? "w-6 bg-primary-500"
                      : "w-2 bg-neutral-300 hover:bg-neutral-400",
                  )}
                />
              ))}
            </div>
          ) : (
            <span />
          )}
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="前へ"
              onClick={scrollPrev}
              className="grid h-10 w-10 place-items-center rounded-full border border-neutral-200 bg-white text-neutral-600 shadow-sm transition hover:bg-neutral-50 hover:text-primary-600"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              type="button"
              aria-label="次へ"
              onClick={scrollNext}
              className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md transition hover:shadow-lg"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
