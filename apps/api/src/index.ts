import { Elysia } from "elysia";
import { node } from "@elysiajs/node";
import { v1AppRoutes } from "./routes/app.route";

import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";

const app = new Elysia({ adapter: node() })
  .use(swagger())
  .use(cors())

  .get("/", () => "Hello Elysia")

  .use(v1AppRoutes)

  .listen(3333, ({ hostname, port }) => {
    console.log(`🦊 Elysia is running at ${hostname}:${port}`);
  });

export type App = typeof app;
