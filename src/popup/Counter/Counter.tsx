import { useEffect, useState } from "react";
import { storage } from "webextension-polyfill";
import { getCurrentTab } from "../../helpers/tabs";

export const Counter = () => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const readBackgroundMessage = async () => {
      const tab = await getCurrentTab();
      const tabId = tab.id;

      if (tabId) {
        const data = await storage.local.get(tabId.toString());
        const currentValue = Number(data?.[tabId] ?? 0);

        setValue(currentValue);
      }
    };

    readBackgroundMessage();
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        fontSize: "24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      Clicks: {value}
    </div>
  );
};
