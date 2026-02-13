import { WEB_APP_URL } from "./config.js";

const ACTION_LAST10 = "last10";

export async function fetchLast10Records() {
  const res = await fetch(`${WEB_APP_URL}?action=${encodeURIComponent(ACTION_LAST10)}`, {
    method: "GET",
  });

  const data = await res.json();

  const rows = Array.isArray(data?.rows) ? data.rows : [];
  return rows;
}
