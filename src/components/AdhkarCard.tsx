"use client";

import { useState } from "react";
import { Check, Play, Pause, ChevronDown, RotateCcw } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import type { AdhkarItem } from "@/types/adhkar";
import { cn } from "@/lib/utils";

interface Props {
  item: AdhkarItem;
  index: number;
  remainingCount: number;
  onDecrement: () => void;
  onReset: () => void;
}

const AdhkarCard = ({
  item,
  index,
  remainingCount,
  onDecrement,
  onReset,
}: Props) => {
  const { language, playAudio, playingUrl } = useApp();
  const [sourceOpen, setSourceOpen] = useState(false);
  const [fadlOpen, setFadlOpen] = useState(false);
  const isAr = language === "ar";
  const completed = remainingCount <= 0;
  const isPlaying = playingUrl === item.audio;

  return (
    <article
      className={cn(
        "group border-border bg-card relative rounded-xl border p-5 shadow-sm transition-all duration-300 md:p-6",
        completed && "border-primary/40 bg-accent opacity-70",
      )}
    >
      {completed && (
        <div className="bg-primary text-primary-foreground absolute end-4 top-4 flex h-8 w-8 items-center justify-center rounded-full">
          <Check className="h-5 w-5" />
        </div>
      )}

      {/* Order number */}
      <span className="bg-accent text-accent-foreground mb-3 inline-block rounded-full px-3 py-1 text-xs font-medium">
        {index + 1}
      </span>

      {/* Arabic content */}
      <p
        className="font-arabic text-foreground mb-4 text-xl leading-[2.2] md:text-2xl"
        dir="rtl"
      >
        {item.content}
      </p>

      {/* English details */}
      {!isAr && item.transliteration && (
        <p className="text-muted-foreground mb-2 text-sm italic" dir="ltr">
          {item.transliteration}
        </p>
      )}
      {!isAr && item.translation && (
        <p
          className="text-foreground/80 mb-4 text-sm leading-relaxed"
          dir="ltr"
        >
          {item.translation}
        </p>
      )}

      {/* Fadl accordion */}
      {item.fadl && (
        <div className="border-border mb-3 border-t pt-3">
          <button
            onClick={() => setFadlOpen(!fadlOpen)}
            dir="auto"
            className="text-muted-foreground hover:text-foreground flex w-full cursor-pointer items-center justify-between text-sm font-medium transition-colors"
          >
            <span className={cn(isAr && "font-arabic")}>
              {isAr ? "الفضل" : "Virtue"}
            </span>
            <ChevronDown
              className={cn(
                "h-4 w-4 transition-transform",
                fadlOpen && "rotate-180",
              )}
            />
          </button>
          {fadlOpen && (
            <p
              className={cn(
                "text-muted-foreground mt-2 text-sm leading-relaxed",
                isAr && "font-arabic",
              )}
              dir={isAr ? "rtl" : "ltr"}
            >
              {item.fadl}
            </p>
          )}
        </div>
      )}

      {/* Source accordion */}
      {item.source && (
        <div className="border-border mb-3 border-t pt-3">
          <button
            onClick={() => setSourceOpen(!sourceOpen)}
            dir="auto"
            className="text-muted-foreground hover:text-foreground flex w-full cursor-pointer items-center justify-between text-sm font-medium transition-colors"
          >
            <span className={cn(isAr && "font-arabic")}>
              {isAr ? "المصدر" : "Source"}
            </span>
            <ChevronDown
              className={cn(
                "h-4 w-4 transition-transform",
                sourceOpen && "rotate-180",
              )}
            />
          </button>
          {sourceOpen && (
            <p
              className={cn(
                "text-muted-foreground mt-2 text-sm leading-relaxed",
                isAr && "font-arabic",
              )}
              dir={isAr ? "rtl" : "ltr"}
            >
              {item.source}
            </p>
          )}
        </div>
      )}

      {/* Action area */}
      <div className="flex items-center gap-3">
        {/* Counter button */}
        <button
          onClick={onDecrement}
          disabled={completed}
          className={cn(
            "flex h-12 min-w-[80px] items-center justify-center gap-2 rounded-lg px-4 text-sm font-bold transition-all",
            completed
              ? "bg-primary text-primary-foreground cursor-default"
              : "bg-primary text-primary-foreground cursor-pointer active:scale-95",
          )}
        >
          {completed ? (
            <Check className="h-5 w-5" />
          ) : (
            <span>{remainingCount}</span>
          )}
        </button>

        {/* Count description */}
        <span className="text-muted-foreground text-xs">
          {item.count_description}
        </span>

        <div className="flex-1" />

        {/* Reset */}
        {completed && (
          <button
            onClick={onReset}
            className="text-muted-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer rounded-lg p-2 transition-colors"
            title={isAr ? "إعادة" : "Reset"}
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        )}

        {/* Audio */}
        {item.audio && (
          <button
            onClick={() => playAudio(item.audio)}
            className="bg-secondary text-secondary-foreground hover:bg-secondary/80 cursor-pointer rounded-lg p-2.5 transition-colors"
          >
            {isPlaying ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5" />
            )}
          </button>
        )}
      </div>
    </article>
  );
};

export default AdhkarCard;
