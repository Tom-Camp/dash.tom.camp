// Utility for consistent date formatting across the app

export const coopDateFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/New_York",
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

// Optionally, you can export a function if you want to format directly:
export function formatCoopDate(date: string | Date) {
  const d = typeof date === "string" ? new Date(date.endsWith("Z") ? date : date + "Z") : date;
  return coopDateFormatter.format(d);
}
