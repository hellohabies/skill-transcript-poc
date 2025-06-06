import Elysia, { t } from "elysia";
import { authPlugin } from "../middlewares/auth";
import { errorResponseSchema } from "../schemas/response.schema";
import { prisma, Role } from "../config/prisma";
import { baseResponseSchema } from "./response";
import { getMeSchema } from "../schemas/auth.schema";

export async function getAllUsersByRole(role?: Role) {
  return await prisma.user.findMany({
    where: {
      AND: [
        {
          isDeleted: false,
          role: role || undefined,
        },
      ],
    },
    include: {
      admin: true,
      student: {
        include: {
          affiliatedCurriculum: {
            include: {
              faculty: {
                include: {
                  university: true,
                },
              },
            },
          },
        },
      },
      teacher: {
        include: {
          affiliatedCurriculum: {
            include: {
              faculty: {
                include: {
                  university: true,
                },
              },
            },
          },
        },
      },
    },
  });
}

export const usersRoute = new Elysia({
  name: "routes/v1/users",
  prefix: "/users",
  tags: ["users"],
})
  .use(authPlugin)
  .guard({
    response: {
      401: errorResponseSchema,
      403: errorResponseSchema,
      404: errorResponseSchema,
      500: errorResponseSchema,
    },
  })

  .get(
    "/",
    async ({ error }) => {
      try {
        const users = await getAllUsersByRole();

        return {
          statusCode: 200,
          isSuccess: true,
          error: null,
          data: users,
        };
      } catch (err) {
        return error("Internal Server Error", {
          statusCode: 500,
          isSuccess: false,
          error: { message: err instanceof Error ? err.message : "An unexpected error occurred" },
          data: null,
        });
      }
    },
    {
      response: {
        200: t.Object({
          ...baseResponseSchema,
          data: t.Array(getMeSchema),
        }),
      },
    }
  )

  .get("/teachers", async ({ error }) => {
    try {
      const teachers = await getAllUsersByRole(Role.TEACHER);

      return {
        statusCode: 200,
        isSuccess: true,
        error: null,
        data: teachers,
      };
    } catch (err) {
      return error("Internal Server Error", {
        statusCode: 500,
        isSuccess: false,
        error: { message: err instanceof Error ? err.message : "An unexpected error occurred" },
        data: null,
      });
    }
  })

  .get("/teachers/curriculum/:curriculumId", async ({ error, params }) => {
    try {
      const { curriculumId } = params;

      const teachers = await getAllUsersByRole(Role.TEACHER);

      const filteredTeachers = teachers.filter(
        (teacher) => teacher.teacher?.affiliatedCurriculumId === curriculumId
      );

      return {
        statusCode: 200,
        isSuccess: true,
        error: null,
        data: filteredTeachers,
      };
    } catch (err) {
      return error("Internal Server Error", {
        statusCode: 500,
        isSuccess: false,
        error: { message: err instanceof Error ? err.message : "An unexpected error occurred" },
        data: null,
      });
    }
  })

  .get("/students", async ({ error }) => {
    try {
      const students = await getAllUsersByRole(Role.STUDENT);

      return {
        statusCode: 200,
        isSuccess: true,
        error: null,
        data: students,
      };
    } catch (err) {
      return error("Internal Server Error", {
        statusCode: 500,
        isSuccess: false,
        error: { message: err instanceof Error ? err.message : "An unexpected error occurred" },
        data: null,
      });
    }
  })

  .get("/students/curriculum/:curriculumId", async ({ error, params }) => {
    try {
      const { curriculumId } = params;

      const students = await getAllUsersByRole(Role.STUDENT);

      const filteredStudents = students.filter(
        (student) => student.student?.affiliatedCurriculumId === curriculumId
      );

      return {
        statusCode: 200,
        isSuccess: true,
        error: null,
        data: filteredStudents,
      };
    } catch (err) {
      return error("Internal Server Error", {
        statusCode: 500,
        isSuccess: false,
        error: { message: err instanceof Error ? err.message : "An unexpected error occurred" },
        data: null,
      });
    }
  });
