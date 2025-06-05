import { treaty } from "@elysiajs/eden";
import type { App } from "../../../api/src/index.ts";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3333";
const client = treaty<App>(BACKEND_URL, {
  fetch: {
    credentials: "include",
  },
});

export const api = client.api.v1;
