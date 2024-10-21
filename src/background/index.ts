import { runtime, storage } from "webextension-polyfill";
import { getCurrentTab } from "../helpers/tabs";

type Message = {
  from: string;
  to: string;
  action: string;
};

async function incrementStoredValue(tabId: string) {
  const data = await storage.local.get(tabId);
  const currentValue = (data?.[tabId] ?? 0) as number;

  return storage.local.set({ [tabId]: currentValue + 1 });
}

export async function init() {
  await storage.local.clear();

  runtime.onMessage.addListener(async (message) => {
    const msg = message as Message;

    if (msg.to === "background") {
      console.log("background handled: ", msg.action);

      const tab = await getCurrentTab();
      const tabId = tab.id;

      if (tabId) {
        return incrementStoredValue(tabId.toString());
      }
    }
  });
}

runtime.onInstalled.addListener(() => {
  init().then(() => {
    console.log("[background] loaded ");
  });
});
