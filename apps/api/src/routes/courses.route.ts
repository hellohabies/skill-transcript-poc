import Elysia, { t } from "elysia";
import { authPlugin } from "../middlewares/auth";
import { errorResponseSchema } from "../schemas/response.schema";
import { prisma } from "../config/prisma";
import { ERROR_RESPONSES } from "../error";
import { baseResponseSchema } from "./response";
import { CurriculumResponseSchema, curriculumResponseSchema } from "../schemas/curriculum.schema";
import { createCourseRequestSchema } from "../schemas/courses.schema";

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
    async ({ body, error }) => {
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

          await tx.courseGradingCriteria.createMany({
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

          const cloId = [crypto.randomUUID(), crypto.randomUUID(), crypto.randomUUID()];

          // MOCK
          await tx.clo.createMany({
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
                id: cloId[0],
                type: "S",
                name: "นักศึกษาสามารถเขียนโปรแกรมภาษา Python",
                courseId: course.id,
              },
              {
                id: cloId[1],
                type: "S",
                name: "นักศึกษาสามารถเขียนโปรแกรมภาษา C",
                courseId: course.id,
              },
              {
                id: cloId[2],
                type: "S",
                name: "นักศึกษาสามารถเขียนโปรแกรมภาษา Java",
                courseId: course.id,
              },
            ],
          });

          const skills = await tx.skill.create({
            data: {
              skillMappingRefId: "0",
              nameTh: "การเขียนโปรแกรมคอมพิวเตอร์",
              nameEn: "Computer Programming",
              descriptionTh: "คำอธิบายการเขียนโปรแกรมคอมพิวเตอร์",
              descriptionEn: "Description of Computer Programming",
              type: "SPECIFIC",
              courseId: course.id,
            },
          });

          // CourseSkillLevel
          const skillLevel1 = await tx.skillLevel.create({
            data: {
              level: 1,
              descriptionTh: "ระดับ 1: พื้นฐาน",
              descriptionEn: "Level 1: Basic",
              skill: {
                connect: {
                  id: skills.id,
                },
              },
            },
          });

          const skillLevel2 = await tx.skillLevel.create({
            data: {
              level: 2,
              descriptionTh: "ระดับ 2: ขั้นกลาง",
              descriptionEn: "Level 2: Intermediate",
              skill: {
                connect: {
                  id: skills.id,
                },
              },
            },
          });

          const skillLevel3 = await tx.skillLevel.create({
            data: {
              level: 3,
              descriptionTh: "ระดับ 3: ขั้นสูง",
              descriptionEn: "Level 3: Advanced",
              skill: {
                connect: {
                  id: skills.id,
                },
              },
            },
          });

          // CourseSkillLevelCriteria
          const skillLevelCriteria1 = await tx.skillLevelCriteria.create({
            data: {
              skillLevel: {
                connect: {
                  id: skillLevel1.id,
                },
              },
              criteriaNameTh: "เขียนโปรแกรมภาษา Python ได้",
              criteriaNameEn: "Able to write Python programs",
            },
          });

          const skillLevelCriteria2 = await tx.skillLevelCriteria.create({
            data: {
              skillLevel: {
                connect: {
                  id: skillLevel2.id,
                },
              },
              criteriaNameTh: "เขียนโปรแกรมภาษา Python และ C ได้อย่างมีประสิทธิภาพ",
              criteriaNameEn: "Able to write efficient Python and C programs",
            },
          });

          const skillLevelCriteria3 = await tx.skillLevelCriteria.create({
            data: {
              skillLevel: {
                connect: {
                  id: skillLevel3.id,
                },
              },
              criteriaNameTh: "เขียนโปรแกรมภาษา Python, C และ Java ได้อย่างมีประสิทธิภาพ",
              criteriaNameEn: "Able to write efficient Python, C, and Java programs",
            },
          });

          await tx.cloSkillLevelCriteria.create({
            data: {
              course: {
                connect: {
                  id: course.id,
                },
              },
              clo: {
                connect: {
                  id: cloId[0],
                },
              },
              skillLevelCriteria: {
                connect: {
                  id: skillLevelCriteria1.id,
                },
              },
            },
          });

          await tx.cloSkillLevelCriteria.createMany({
            data: [
              {
                courseId: course.id,
                cloId: cloId[0],
                skillLevelCriteriaId: skillLevelCriteria2.id,
              },
              {
                courseId: course.id,
                cloId: cloId[1],
                skillLevelCriteriaId: skillLevelCriteria2.id,
              },
            ],
          });

          await tx.cloSkillLevelCriteria.createMany({
            data: [
              {
                courseId: course.id,
                cloId: cloId[0],
                skillLevelCriteriaId: skillLevelCriteria3.id,
              },
              {
                courseId: course.id,
                cloId: cloId[1],
                skillLevelCriteriaId: skillLevelCriteria3.id,
              },
              {
                courseId: course.id,
                cloId: cloId[2],
                skillLevelCriteriaId: skillLevelCriteria1.id,
              },
            ],
          });

          await tx.courseTeacher.create({
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
      } catch (err) {
        return error("Internal Server Error", {
          statusCode: 500,
          isSuccess: false,
          error: {
            message: err instanceof Error ? err.message : "Internal Server Error",
          },
          data: null,
        });
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
      body: createCourseRequestSchema,
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
