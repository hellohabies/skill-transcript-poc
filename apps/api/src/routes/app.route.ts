import Elysia from "elysia";
import { authRoutes } from "./auth.route";
import { facultiesRoutes } from "./faculties.route";

const routes = new Elysia({
  prefix: "/api/v1",
})
  .use(authRoutes)
  .use(facultiesRoutes);

export { routes as v1AppRoutes };
