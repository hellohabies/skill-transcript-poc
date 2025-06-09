import { treaty } from "@elysiajs/eden";
import type { App } from "../../../api/src/index.ts";

const BACKEND_URL = "https://st-poc-api.up.railway.app";
const client = treaty<App>(BACKEND_URL, {
  fetch: {
    credentials: "include",
  },
});

export const api = client.api.v1;
