import Elysia, { t } from "elysia";
import { authPlugin } from "../middlewares/auth";
import { errorResponseSchema } from "../schemas/response.schema";
import { prisma } from "../config/prisma";
import { baseResponseSchema } from "./response";
import { StudentResponse, studentResponseSchema } from "../schemas/student.schema";
import { ERROR_RESPONSES } from "../error";

export const studentsRoutes = new Elysia({
  name: "routes/v1/students",
  prefix: "/students",
  tags: ["students"],
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
    "/:studentId",
    async ({ params, error }) => {
      try {
        const { studentId } = params;

        const studentCourses = await prisma.studentCourse.findMany({
          where: {
            studentId,
            isDeleted: false,
          },
          include: {
            course: {
              include: {
                teachers: {
                  include: {
                    teacher: {
                      include: {
                        user: true,
                      },
                    },
                  },
                },
              },
            },

            gradings: {
              where: {
                isDeleted: false,
              },
              orderBy: {
                gradingDate: "desc",
              },
              include: {
                gradingCloResults: {
                  include: {
                    clo: true,
                  },
                },
              },
            },
          },
        });

        if (!studentCourses || studentCourses.length === 0) {
          return error(404, ERROR_RESPONSES.notFound);
        }

        const mappedData: StudentResponse = studentCourses.map((sc) => ({
          id: sc.id,
          courseId: sc.courseId,
          studentId: sc.studentId,
          courseSectionId: sc.courseSectionId ?? "",
          isDeleted: sc.isDeleted,
          deletedAt: sc.deletedAt,
          course: {
            ...sc.course,
            teacher: {
              ...sc.course.teachers[0].teacher,
            },
          },
          gradings: {
            id: sc.gradings[0].id,
            studentCourseId: sc.gradings[0].studentCourseId,
            gradingDate: sc.gradings[0].gradingDate,
            grade: sc.gradings[0].grade,
            score: sc.gradings[0].score,
            isDeleted: sc.gradings[0].isDeleted,
            deletedAt: sc.gradings[0].deletedAt,
            gradingCloResults: sc.gradings[0].gradingCloResults.map((gcr) => ({
              id: gcr.id,
              studentCourseGradingId: gcr.studentCourseGradingId,
              cloId: gcr.cloId,
              result: gcr.result,
              index: gcr.index,
              isDeleted: gcr.isDeleted,
              deletedAt: gcr.deletedAt,
              clo: {
                id: gcr.clo.id,
                type: gcr.clo.type,
                name: gcr.clo.name,
                isDeleted: gcr.clo.isDeleted,
                deletedAt: gcr.clo.deletedAt,
              },
            })),
          },
        }));

        return {
          statusCode: 200,
          isSuccess: true,
          data: mappedData,
          error: null,
        };
      } catch (err) {
        return error(500, {
          statusCode: 500,
          isSuccess: false,
          error: {
            message: err instanceof Error ? err.message : "Internal Server Error",
          },
          data: null,
        });
      }
    },
    {
      response: {
        200: t.Object({
          ...baseResponseSchema,
          data: studentResponseSchema,
        }),
      },
    }
  );
