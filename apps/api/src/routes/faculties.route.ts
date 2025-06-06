import Elysia, { error, t } from "elysia";
import { authPlugin } from "../middlewares/auth";
import { errorResponseSchema } from "../schemas/response.schema";
import { prisma } from "../config/prisma";
import { baseResponseSchema } from "./response";

export const facultiesRoutes = new Elysia({
  name: "routes/v1/faculties",
  prefix: "/faculties",
  tags: ["faculties"],
})
  .use(authPlugin)
  .guard({
    response: {
      401: errorResponseSchema,
      403: errorResponseSchema,
    },
  })

  .get(
    "/",
    async () => {
      const faculties = await prisma.faculty.findMany({
        include: {
          curriculums: {
            orderBy: {
              programName: "asc",
            },
          },
        },
        orderBy: {
          name: "asc",
        },
      });

      return {
        statusCode: 200,
        isSuccess: true,
        data: faculties.map((faculty) => ({
          id: faculty.id,
          name: faculty.name,
          universityId: faculty.universityId,
          curriculums: faculty.curriculums.map((c) => ({
            id: c.id,
            degreeName: c.degreeName,
            programName: c.programName,
            facultyId: c.facultyId,
          })),
        })),
        error: null,
      };
    },
    {
      response: {
        200: t.Object({
          ...baseResponseSchema,
          data: t.Array(
            t.Object({
              id: t.String(),
              name: t.String(),
              universityId: t.String(),
              curriculums: t.Array(
                t.Object({
                  id: t.String(),
                  degreeName: t.String(),
                  programName: t.String(),
                  facultyId: t.String(),
                })
              ),
            })
          ),
        }),
      },
    }
  );
