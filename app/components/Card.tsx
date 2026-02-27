// components/Card.tsx
import React from "react";

type CardProps = {
  title: string;
  subtitle?: string;
  headerRight?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  headerRight,
  children,
  className = "",
}) => {
  return (
    <section
      className={`rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 ${className}`}
    >
      {/* Header */}
      <header className="flex items-start gap-2 border-b border-slate-200 px-4 py-3 dark:border-slate-800">
        <div className="flex-1">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              {subtitle}
            </p>
          )}
        </div>
        {headerRight && (
          <div className="flex shrink-0 items-center gap-2">
            {headerRight}
          </div>
        )}
      </header>

      {/* Body */}
      <div className="px-4 py-3 text-sm text-slate-700 dark:text-slate-200">
        {children}
      </div>
    </section>
  );
};
