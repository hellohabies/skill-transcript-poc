import Elysia from "elysia";
import { authRoutes } from "./auth.route";
import { facultiesRoutes } from "./faculties.route";
import { coursesRoutes } from "./courses.route";
import { usersRoute } from "./users.route";

const routes = new Elysia({
  prefix: "/api/v1",
})
  .use(authRoutes)
  .use(facultiesRoutes)
  .use(coursesRoutes)
  .use(usersRoute);

export { routes as v1AppRoutes };
