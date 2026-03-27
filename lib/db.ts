import { init } from "@instantdb/react";

const fallbackAppId = "00000000-0000-0000-0000-000000000000";
const appId = process.env.NEXT_PUBLIC_INSTANT_APP_ID || fallbackAppId;

if (!process.env.NEXT_PUBLIC_INSTANT_APP_ID && typeof window !== "undefined") {
  console.warn(
    "Missing NEXT_PUBLIC_INSTANT_APP_ID. Set it in .env.local and Vercel project environment variables.",
  );
}

const db = init({ appId });

export default db;

