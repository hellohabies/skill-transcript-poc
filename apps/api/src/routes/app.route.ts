import Elysia from "elysia";
import { authRoutes } from "./auth.route";
import { facultiesRoutes } from "./faculties.route";
import { coursesRoutes } from "./courses.route";
import { usersRoute } from "./users.route";
import { gradingsRoutes } from "./gradings.route";
import { studentsRoutes } from "./students.route";

const routes = new Elysia({
  prefix: "/api/v1",
})
  .use(authRoutes)
  .use(facultiesRoutes)
  .use(coursesRoutes)
  .use(usersRoute)
  .use(gradingsRoutes)
  .use(studentsRoutes);

export { routes as v1AppRoutes };
