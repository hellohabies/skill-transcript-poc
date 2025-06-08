import Elysia, { error, t } from "elysia";
import { authPlugin } from "../middlewares/auth";
import { errorResponseSchema } from "../schemas/response.schema";
import { Clo, GradingCloResult, prisma } from "../config/prisma";
import { baseResponseSchema } from "./response";
import {
  StudentResponse,
  studentResponseSchema,
  studentSkillsResponseSchema,
} from "../schemas/student.schema";
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
  )

  .get(
    "/:studentId/skills",
    async ({ params, error }) => {
      try {
        const { studentId } = params;

        const coursesAndCloResults = await getStudentCoursesAndCloResults(studentId);
        if (!coursesAndCloResults) return error(404, ERROR_RESPONSES.notFound);

        const studentSkillIds = coursesAndCloResults
          .map((course) => course.courseSkills)
          .flat()
          .map((cs) => cs.skillId);

        const uniqueStudentSkills = Array.from(new Set(studentSkillIds));
        const skillsWithLevels = [];

        for (const skillId of uniqueStudentSkills) {
          const skill = await prisma.skill.findUnique({
            where: {
              id: skillId,
            },
            include: {
              skillLevels: {
                select: {
                  skillId: true,
                  criterias: {
                    select: {
                      id: true,
                      criteriaNameTh: true,
                      criteriaNameEn: true,
                    },
                  },
                },
              },
            },
          });

          const levels = coursesAndCloResults
            .map((course) => ({ ...course.courseSkills.find((cs) => cs.skillId === skillId) }))
            .map((sl) => (sl.studentLevel !== undefined ? sl.studentLevel : 0));

          skillsWithLevels.push({
            finalLevel: Math.min(...levels),
            ...skill,
          });
        }

        const crteriaIdAndCourseIdToCloMap = new Map<
          string,
          { clo: Clo; isPass: boolean; courseCode: string; courseName: string }[]
        >();

        for (const courseSkill of coursesAndCloResults.flatMap((course) => course.courseSkills)) {
          for (const skillLevel of courseSkill.skillLevels) {
            for (const criteria of skillLevel.criterias) {
              const courseId = criteria.cloSkillLevelCriterias[0].courseId;

              const course = await prisma.course.findUnique({
                where: {
                  id: courseId,
                  isDeleted: false,
                },
              });

              const prev = crteriaIdAndCourseIdToCloMap.get(
                `${criteria.id}::${courseSkill.skillId}`
              );
              if (prev) {
                prev.push(
                  ...criteria.cloSkillLevelCriterias.map((clc) => ({
                    clo: clc.clo,
                    isPass: clc.isPass,
                    courseCode: course?.courseCode ?? "",
                    courseName: course?.nameEn ?? "",
                  }))
                );
              } else {
                crteriaIdAndCourseIdToCloMap.set(
                  `${criteria.id}::${courseSkill.skillId}`,
                  criteria.cloSkillLevelCriterias.map((clc) => ({
                    clo: clc.clo,
                    isPass: clc.isPass,
                    courseCode: course?.courseCode ?? "",
                    courseName: course?.nameEn ?? "",
                  }))
                );
              }
            }
          }
        }

        const xx = skillsWithLevels.map((skill) => ({
          ...skill,
          skillLevels: skill.skillLevels?.map((sl) =>
            sl.criterias.map((c) => ({
              ...c,
              criterias: crteriaIdAndCourseIdToCloMap.get(`${c.id}::${skill.id}`),
            }))
          ),
        }));

        return {
          statusCode: 200,
          isSuccess: true,
          data: {
            // s: Array.from(crteriaIdAndCourseIdToCloMap.keys()),
            skillsWithLevels: xx,
            // coursesAndCloResults: coursesAndCloResults,
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
      response: {
        200: t.Object({
          ...baseResponseSchema,
          data: studentSkillsResponseSchema,
        }),
      },
    }
  );

async function getCourseSkillsLevelsCriterias(courseId: string) {
  return await prisma.course.findUnique({
    where: {
      id: courseId,
      isDeleted: false,
    },
    include: {
      courseSkills: {
        where: {
          courseId: courseId,
          isDeleted: false,
        },
        include: {
          skill: {
            include: {
              skillLevels: {
                where: {
                  isDeleted: false,
                },
                include: {
                  methods: {
                    where: {
                      isDeleted: false,
                    },
                  },
                  criterias: {
                    where: {
                      isDeleted: false,
                    },
                    include: {
                      cloSkillLevelCriterias: {
                        where: {
                          courseId: courseId,
                          isDeleted: false,
                        },
                        include: {
                          clo: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });
}

async function getStudentCourseGradingAndCloResults(studentId: string, courseId: string) {
  return prisma.studentCourseGrading.findFirst({
    where: {
      studentCourse: {
        studentId: studentId,
        courseId: courseId,
        isDeleted: false,
      },
    },
    include: {
      gradingCloResults: true,
    },
  });
}

type LevelAndCriteria = {
  level: number;
  criterias: {
    id: string;
    skillLevelId: string;
    criteriaNameTh: string;
    criteriaNameEn: string;
    isDeleted: boolean;
    deletedAt: Date | null;
    cloSkillLevelCriterias: {
      id: string;
      courseId: string;
      clo: Clo;
      cloId: string;
      skillLevelCriteriaId: string;
    }[];
  }[];
};

type LevelAndCriteriaWithPassingStatus = {
  level: number;
  isPass: boolean;
  criterias: {
    id: string;
    skillLevelId: string;
    criteriaNameTh: string;
    criteriaNameEn: string;
    isDeleted: boolean;
    deletedAt: Date | null;
    cloSkillLevelCriterias: {
      id: string;
      courseId: string;
      clo: Clo;
      cloId: string;
      skillLevelCriteriaId: string;
      isPass: boolean;
    }[];
  }[];
};

// function getLevelsAndCriteriasPassingStatus(
//   levelAndCriterias: LevelAndCriteria,
//   gradingCloResults: GradingCloResult[]
// ): LevelAndCriteriaWithPassingStatus {
//   const result = {
//     level: levelAndCriterias.level,
//     isPass: false,
//     criterias: levelAndCriterias.criterias.map((criteria) => {
//       const cloIds = criteria.cloSkillLevelCriterias;
//       const cloResults = gradingCloResults.filter((gcr) =>
//         cloIds.some((clo) => clo.cloId === gcr.cloId)
//       );

//       return {
//         id: criteria.id,
//         skillLevelId: criteria.skillLevelId,
//         criteriaNameTh: criteria.criteriaNameTh,
//         criteriaNameEn: criteria.criteriaNameEn,
//         isDeleted: criteria.isDeleted,
//         deletedAt: criteria.deletedAt,
//         cloSkillLevelCriterias: criteria.cloSkillLevelCriterias.map((clo) => {
//           const cloResult = cloResults.find((gcr) => gcr.cloId === clo.cloId);
//           return {
//             ...clo,
//             isPass: cloResult ? cloResult.result !== "X" && cloResult.result !== "FAIL" : false,
//           };
//         }),
//       };
//     }),
//   };

//   result.isPass = result.criterias.every((criteria) =>
//     criteria.cloSkillLevelCriterias.every((clo) => clo.isPass)
//   );

//   return result;
// }

function getLevelsAndCriteriasPassingStatus(
  levelAndCriterias: LevelAndCriteria,
  gradingCloResults: GradingCloResult[]
): LevelAndCriteriaWithPassingStatus {
  const cloResultMap = new Map(gradingCloResults.map((gcr) => [gcr.cloId, gcr]));

  const criteriasWithStatus = levelAndCriterias.criterias.map((criteria) => {
    const cloSkillLevelCriteriasWithStatus = criteria.cloSkillLevelCriterias.map((clo) => {
      const cloResult = cloResultMap.get(clo.cloId);
      return {
        ...clo,
        isPass: cloResult ? cloResult.result !== "X" && cloResult.result !== "FAIL" : false,
      };
    });

    return {
      ...criteria,
      cloSkillLevelCriterias: cloSkillLevelCriteriasWithStatus,
    };
  });

  const isPass = criteriasWithStatus.every((criteria) =>
    criteria.cloSkillLevelCriterias.every((clo) => clo.isPass)
  );

  return {
    level: levelAndCriterias.level,
    isPass,
    criterias: criteriasWithStatus,
  };
}

async function getStudentCoursesAndCloResults(studentId: string) {
  const studentCourses = await prisma.studentCourse.findMany({
    where: {
      studentId,
      isDeleted: false,
    },
  });

  const coursesAndCloResults = [];

  for (const studentCourse of studentCourses) {
    const courseId = studentCourse.courseId;

    const courseSkillsLevelsCriterias = getCourseSkillsLevelsCriterias(courseId);
    const studentCourseGradingAndCloResults = getStudentCourseGradingAndCloResults(
      studentId,
      courseId
    );

    const [cslc, sclc] = await Promise.all([
      courseSkillsLevelsCriterias,
      studentCourseGradingAndCloResults,
    ]);

    if (!cslc || !sclc) continue;

    const result = {
      id: cslc.id,
      skillMappingRefId: cslc.skillMappingRefId,
      courseCode: cslc.courseCode,
      nameTh: cslc.nameTh,
      nameEn: cslc.nameEn,
      descriptionTh: cslc.descriptionTh,
      descriptionEn: cslc.descriptionEn,
      curriculumId: cslc.curriculumId,
      isDeleted: cslc.isDeleted,
      deletedAt: cslc.deletedAt,
      courseSkills: cslc.courseSkills.map((cs) => ({
        skillMappingRefId: cs.skill.skillMappingRefId,
        nameTh: cs.skill.nameTh,
        nameEn: cs.skill.nameEn,
        descriptionTh: cs.skill.descriptionTh,
        descriptionEn: cs.skill.descriptionEn,
        type: cs.skill.type,
        isMainSkill: cs.skill.isMainSkill,
        studentLevel: 0, // This will be calculated later
        id: cs.id,
        skillId: cs.skillId,
        skillLevels: cs.skill.skillLevels.map((sl) => ({
          id: sl.id,
          skillId: sl.skillId,
          ...getLevelsAndCriteriasPassingStatus(
            {
              level: sl.level,
              criterias: sl.criterias.map((c) => ({
                id: c.id,
                skillLevelId: c.skillLevelId,
                criteriaNameTh: c.criteriaNameTh,
                criteriaNameEn: c.criteriaNameEn,
                isDeleted: c.isDeleted,
                deletedAt: c.deletedAt,
                cloSkillLevelCriterias: c.cloSkillLevelCriterias.map((clc) => ({
                  id: clc.id,
                  courseId: clc.courseId,
                  clo: clc.clo,
                  cloId: clc.cloId,
                  skillLevelCriteriaId: clc.skillLevelCriteriaId,
                })),
              })),
            },
            sclc.gradingCloResults
          ),
          descriptionTh: sl.descriptionTh,
          descriptionEn: sl.descriptionEn,
          methods: sl.methods.map((m) => ({
            id: m.id,
            skillLevelId: m.skillLevelId,
            methodNameTh: m.methodNameTh,
            methodNameEn: m.methodNameEn,
            isDeleted: m.isDeleted,
            deletedAt: m.deletedAt,
          })),
          isDeleted: sl.isDeleted,
          deletedAt: sl.deletedAt,
        })),
      })),
    };

    for (const courseSkill of result.courseSkills) {
      let maxLevel = 0;
      for (const level of courseSkill.skillLevels) {
        if (!level.isPass) break;
        maxLevel = level.level;
      }
      courseSkill.studentLevel = maxLevel;
    }

    coursesAndCloResults.push(result);
  }
  return coursesAndCloResults;
}
