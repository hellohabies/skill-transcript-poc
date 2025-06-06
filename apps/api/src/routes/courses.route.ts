import Elysia, { t } from "elysia";
import { authPlugin } from "../middlewares/auth";
import { errorResponseSchema } from "../schemas/response.schema";
import { prisma } from "../config/prisma";
import { ERROR_RESPONSES } from "../error";
import { baseResponseSchema } from "./response";
import { CurriculumResponseSchema, curriculumResponseSchema } from "../schemas/curriculum.schema";

export const coursesRoutes = new Elysia({
  name: "routes/v1/courses",
  prefix: "/courses",
  tags: ["courses"],
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
    "/curriculums/:curriculumId",
    async ({ params, error }) => {
      try {
        const { curriculumId } = params;

        const curriculum = await prisma.curriculum.findFirst({
          where: {
            AND: [
              {
                id: curriculumId,
                isDeleted: false,
              },
            ],
          },
          include: {
            courses: {
              where: { isDeleted: false },
              include: {
                teachers: {
                  where: { isDeleted: false },
                  select: {
                    teacherId: true,
                    teacher: {
                      include: {
                        user: true,
                      },
                    },
                  },
                },
              },
            },
          },
        });

        if (!curriculum) {
          return error("Not Found", ERROR_RESPONSES.notFound);
        }

        const mappedData: CurriculumResponseSchema = {
          id: curriculum.id,
          degreeName: curriculum.degreeName,
          programName: curriculum.programName,
          facultyId: curriculum.facultyId,
          courses: curriculum.courses.map((course) => ({
            id: course.id,
            skillMappingRefId: course.skillMappingRefId,
            courseCode: course.courseCode,
            nameTh: course.nameTh,
            nameEn: course.nameEn,
            descriptionTh: course.descriptionTh,
            descriptionEn: course.descriptionEn,
            curriculumId: course.curriculumId,
            teachers: course.teachers.map((teacher) => ({
              universityTeacherId: teacher.teacherId,
              identificationNumber: teacher.teacher.identificationNumber,
              affiliatedCurriculumId: teacher.teacher.affiliatedCurriculumId,
              userId: teacher.teacher.userId,
              user: teacher.teacher.user,
            })),
          })),
        };

        return {
          statusCode: 200,
          isSuccess: true,
          data: mappedData,
          error: null,
        };
      } catch (error) {
        console.error("Error fetching curriculum courses:", error);
        return {
          statusCode: 500,
          isSuccess: false,
          error: {
            message: error instanceof Error ? error.message : "Internal Server Error",
          },
          data: null,
        };
      }
    },
    {
      response: {
        200: t.Object({
          ...baseResponseSchema,
          data: curriculumResponseSchema,
        }),
      },
    }
  )

  .get("/:id", async () => {})

  .post(
    "/",
    async ({ body }) => {
      const { courseCode, nameTh, nameEn, descriptionTh, descriptionEn, teacherId, curriculumId } =
        body;

      try {
        await prisma.$transaction(async (tx) => {
          const course = await tx.course.create({
            data: {
              skillMappingRefId: courseCode,
              courseCode,
              nameEn,
              nameTh,
              descriptionEn,
              descriptionTh,
              curriculum: {
                connect: {
                  id: curriculumId,
                },
              },
            },
          });

          const courseSection = await tx.courseSection.create({
            data: {
              course: {
                connect: {
                  id: course.id,
                },
              },
              section: "1",
            },
          });

          const courseGradingCriteria = await tx.courseGradingCriteria.createMany({
            data: [
              {
                courseId: course.id,
                grade: "A",
                minScore: 0,
                maxScore: 0,
              },
              {
                courseId: course.id,
                grade: "B_PLUS",
                minScore: 0,
                maxScore: 0,
              },
              {
                courseId: course.id,
                grade: "B",
                minScore: 0,
                maxScore: 0,
              },
              {
                courseId: course.id,
                grade: "C_PLUS",
                minScore: 0,
                maxScore: 0,
              },
              {
                courseId: course.id,
                grade: "C",
                minScore: 0,
                maxScore: 0,
              },
              {
                courseId: course.id,
                grade: "D_PLUS",
                minScore: 0,
                maxScore: 0,
              },
              {
                courseId: course.id,
                grade: "D",
                minScore: 0,
                maxScore: 0,
              },
              {
                courseId: course.id,
                grade: "F",
                minScore: 0,
                maxScore: 0,
              },
            ],
          });

          // MOCK
          const clos = await tx.clo.createMany({
            data: [
              {
                type: "A",
                name: "MOCK_CLO_A",
                courseId: course.id,
              },
              {
                type: "A",
                name: "MOCK_CLO_B",
                courseId: course.id,
              },
              {
                type: "K",
                name: "MOCK_CLO_C",
                courseId: course.id,
              },
              {
                type: "K",
                name: "MOCK_CLO_D",
                courseId: course.id,
              },
              {
                type: "S",
                name: "MOCK_CLO_E",
                courseId: course.id,
              },
              {
                type: "S",
                name: "MOCK_CLO_F",
                courseId: course.id,
              },
            ],
          });

          const skills = await tx.skill.createMany({
            data: [
              {
                skillMappingRefId: "0",
                nameTh: "ทักษะตัวอย่าง 1",
                nameEn: "Sample Skill 1",
                descriptionTh: "คำอธิบายทักษะตัวอย่าง 1",
                descriptionEn: "Description of Sample Skill 1",
                type: "SPECIFIC",
                courseId: course.id,
              },
              {
                skillMappingRefId: "1",
                nameTh: "ทักษะตัวอย่าง 2",
                nameEn: "Sample Skill 2",
                descriptionTh: "คำอธิบายทักษะตัวอย่าง 2",
                descriptionEn: "Description of Sample Skill 2",
                type: "SPECIFIC",
                courseId: course.id,
              },
            ],
          });

          // CourseSkillLevel
          // CourseSkillLevelCriteria

          const courseTeacher = await tx.courseTeacher.create({
            data: {
              course: {
                connect: {
                  id: course.id,
                },
              },
              teacher: {
                connect: {
                  id: teacherId,
                },
              },
              courseSection: {
                connect: {
                  id: courseSection.id,
                },
              },
            },
          });

          const curriculumStudents = await tx.student.findMany({
            where: {
              AND: [
                {
                  isDeleted: false,
                  affiliatedCurriculumId: curriculumId,
                },
              ],
            },
          });

          await tx.studentCourse.createMany({
            data: curriculumStudents.map((student) => ({
              courseId: course.id,
              studentId: student.id,
              courseSectionId: courseSection.id,
            })),
          });
        });
      } catch (error) {
        console.error("Error creating course:", error);
        return {
          statusCode: 500,
          isSuccess: false,
          error: {
            message: error instanceof Error ? error.message : "Internal Server Error",
          },
          data: null,
        };
      }

      return {
        statusCode: 201,
        isSuccess: true,
        data: {
          message: "Course created successfully",
        },
        error: null,
      };
    },
    {
      body: t.Object({
        courseCode: t.String(),
        nameTh: t.String(),
        nameEn: t.String(),
        descriptionTh: t.String(),
        descriptionEn: t.String(),
        teacherId: t.String(),
        curriculumId: t.String(),
      }),
      response: {
        200: t.Object({
          ...baseResponseSchema,
          data: t.Object({
            message: t.String(),
          }),
        }),
      },
    }
  );
