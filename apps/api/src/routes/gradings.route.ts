import Elysia, { t } from "elysia";
import { authPlugin } from "../middlewares/auth";
import { errorResponseSchema } from "../schemas/response.schema";
import {
  cloWeightSettingsRequestSchema,
  cloWeightSettingsResponseSchema,
  gradingCriteriaRequestSchema,
  gradingCriteriaResponseSchema,
  studentGradingRequestSchema,
  studentGradingResponseSchema,
} from "../schemas/gradings.schema";
import { Grade, prisma } from "../config/prisma";
import { T } from "@faker-js/faker/dist/airline-BUL6NtOJ";
import { baseResponseSchema } from "./response";
import { ERROR_RESPONSES } from "../error";

export const gradingsRoutes = new Elysia({
  name: "routes/v1/gradings",
  prefix: "/gradings",
  tags: ["gradings"],
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

  .put(
    "/settings/grade-criteria",
    async ({ body, error }) => {
      try {
        await prisma.$transaction(async (tx) => {
          for (let criteria of body) {
            await tx.courseGradingCriteria.update({
              where: {
                id: criteria.courseGradingCriteriaId,
              },
              data: {
                minScore: criteria.minScore,
                maxScore: criteria.maxScore,
              },
            });
          }
        });

        return {
          statusCode: 200,
          isSuccess: true,
          data: body.map((criteria) => ({
            courseGradingCriteriaId: criteria.courseGradingCriteriaId,
            minScore: criteria.minScore,
            maxScore: criteria.maxScore,
          })),
          error: null,
        };
      } catch (err) {
        return error(500, {
          statusCode: 500,
          isSuccess: false,
          error: {
            message: error instanceof Error ? error.message : "Internal Server Error",
          },
          data: null,
        });
      }
    },
    {
      body: gradingCriteriaRequestSchema,
      response: {
        200: t.Object({
          ...baseResponseSchema,
          data: gradingCriteriaResponseSchema,
        }),
      },
    }
  )

  .put(
    "/settings/clo-weights/",
    async ({ body, error }) => {
      try {
        await prisma.$transaction(async (tx) => {
          for (let weight of body) {
            await tx.courseCloWeight.update({
              where: {
                id: weight.courseCloWeightId,
              },
              data: {
                weight: weight.weight,
              },
            });
          }
        });

        return {
          statusCode: 200,
          isSuccess: true,
          data: body.map((weight) => ({
            courseCloWeightId: weight.courseCloWeightId,
            weight: weight.weight,
          })),
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
      body: cloWeightSettingsRequestSchema,
      response: {
        200: t.Object({
          ...baseResponseSchema,
          data: cloWeightSettingsResponseSchema,
        }),
      },
    }
  )

  .put(
    "/students/grades",
    async ({ body, error }) => {
      try {
        const { courseId, studentId, cloId, grade } = body;

        const studentCourseGrading = await prisma.studentCourseGrading.findFirst({
          where: {
            studentCourse: {
              courseId: courseId,
              studentId: studentId,
            },
          },
        });

        if (!studentCourseGrading) {
          return error(404, ERROR_RESPONSES.notFound);
        }

        const gragingCloResult = await prisma.gradingCloResult.updateMany({
          where: {
            studentCourseGrading: {
              id: studentCourseGrading.id,
            },
            cloId: cloId,
          },
          data: {
            result: grade,
          },
        });

        if (gragingCloResult.count === 0) {
          return error(404, ERROR_RESPONSES.notFound);
        }

        return {
          statusCode: 200,
          isSuccess: true,
          data: {
            courseId: courseId,
            studentId: studentId,
            cloId: cloId,
            grade: grade,
          },
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
      body: studentGradingRequestSchema,
      response: {
        200: t.Object({
          ...baseResponseSchema,
          data: studentGradingResponseSchema,
        }),
      },
    }
  );
