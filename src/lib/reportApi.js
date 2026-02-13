import { WEB_APP_URL } from "./config.js";

export async function fetchReportK5M15() {
  const res = await fetch(`${WEB_APP_URL}?action=reportK5M15`, { method: "GET" });
  const data = await res.json();
  if (!data || data.success !== true) return null;

  const report = Array.isArray(data.report) ? data.report : [];
  return report;
}
