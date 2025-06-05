import Elysia from "elysia";
import { authRoutes } from "./auth.route";

const routes = new Elysia({
  prefix: "/api/v1",
}).use(authRoutes);

export { routes as v1AppRoutes };
