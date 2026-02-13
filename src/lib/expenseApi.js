import { WEB_APP_URL } from "./config.js";

export async function submitExpense(payload) {
  // NOTE: no-cors => response readable nahi hota, hum “assume success” karte hain
  await fetch(WEB_APP_URL, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(payload),
  });
  return true;
}
