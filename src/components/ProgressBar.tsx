"use client";

import { useApp } from "@/contexts/AppContext";

interface Props {
  completed: number;
  total: number;
}

const ProgressBar = ({ completed, total }: Props) => {
  const { language } = useApp();
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
  const isAr = language === "ar";

  return (
    <div className="mb-4">
      <div className="text-muted-foreground mb-1 flex items-center justify-between text-sm">
        <span>{isAr ? "التقدم" : "Progress"}</span>
        <span>
          {completed}/{total} ({pct}%)
        </span>
      </div>
      <div className="bg-secondary h-2 w-full overflow-hidden rounded-full">
        <div
          className="bg-primary h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
