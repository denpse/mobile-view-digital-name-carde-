import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { UAParser } from "ua-parser-js";
import FingerPrintjs from "@fingerprintjs/fingerprintjs";

type DeviceInfoType = {
  device_name: string;
  device_type: string;
  os: string;
  ip_address: string;
  browser: string;
  fingerprint: string;
};

type DeviceState = {
  device: DeviceInfoType | null;
  fetchDeviceInfo: () => void;
};

export const useDeviceStore = create<DeviceState>()(
  devtools((set) => ({
    device: null,
    fetchDeviceInfo: async () => {
      const parser = new UAParser();
      const result = parser.getResult();

      //fingerprint
      const fp = await FingerPrintjs.load();
      const fingerPrintResult = await fp.get();

      //fetch ip
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let ip_address = null as any;
      try {
        const res = await fetch("https://api.ipify.org?format=json");
        const data: { ip: string } = await res.json();
        ip_address = data.ip;
      } catch (error) {
        console.log(error);
      }

      const info: DeviceInfoType = {
        browser: result.browser.name || "unknown",
        os: result.os.name || "unknown",
        device_name: result.device.vendor || "unknown",
        fingerprint: fingerPrintResult.visitorId,
        device_type: result.device.model || "unknown",
        ip_address,
      };
      set({ device: info });
    },
  }))
);
