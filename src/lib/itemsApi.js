import { WEB_APP_URL } from "./config.js";
import { jsonp } from "./jsonp.js";

// ✅ EXACT Apps Script actions
const ACTION_GET_ITEMS = "getItems";     // doGet JSONP
const ACTION_ADD_ITEM = "addItem";       // doPost JSON
const ACTION_DELETE_ITEM = "deleteItem"; // doGet JSONP (you used this)

export async function fetchItems() {
  const data = await jsonp(`${WEB_APP_URL}?action=${encodeURIComponent(ACTION_GET_ITEMS)}`);

  const items = Array.isArray(data?.items)
    ? data.items.map((x) => String(x).trim()).filter(Boolean)
    : [];

  return items;
}

export async function addItem(name) {
  await fetch(WEB_APP_URL, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify({ action: ACTION_ADD_ITEM, name }),
  });
  return { success: true };
}

export async function deleteItem(name) {
  return await jsonp(
    `${WEB_APP_URL}?action=${encodeURIComponent(ACTION_DELETE_ITEM)}&name=${encodeURIComponent(name)}`
  );
}
