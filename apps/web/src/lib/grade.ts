import type { GradingForm } from "@/pages/(auth)/courses/[courseId]/grading";
import type { Grade, GradingResult } from "../../../api/src/config/prisma";
import type { CourseDetailSchema } from "../../../api/src/schemas/courses.schema";

export const cloResultToNumber = (result: GradingResult): number => {
  switch (result) {
    case "EXCELLENT":
      return 4.0;
    case "VERY_GOOD":
      return 3.0;
    case "GOOD":
      return 2.0;
    case "PASS":
      return 1.0;
    case "FAIL":
      return 0.0;
    case "X":
      return 0.0;
  }
};

export const gradeResultToGradeLabel = (result: Grade): string => {
  switch (result) {
    case "A":
      return "A";
    case "B_PLUS":
      return "B+";
    case "B":
      return "B";
    case "C_PLUS":
      return "C+";
    case "C":
      return "C";
    case "D_PLUS":
      return "D+";
    case "D":
      return "D";
    case "F":
      return "F";
    default:
      return ""; // Assuming 'X' is the default or unknown grade
  }
};

export const getGradingCriteriaByGrade = (
  course: CourseDetailSchema,
  grade: Grade
): { minScore: number; maxScore: number } => {
  return (
    course.gradingCriterias.find((criteria) => criteria.grade === grade) || {
      minScore: 0,
      maxScore: 0,
    }
  );
};

export const getStudentGradeByScore = (course: CourseDetailSchema, score: number): Grade => {
  const a = getGradingCriteriaByGrade(course, "A");
  const bPlus = getGradingCriteriaByGrade(course, "B_PLUS");
  const b = getGradingCriteriaByGrade(course, "B");
  const cPlus = getGradingCriteriaByGrade(course, "C_PLUS");
  const c = getGradingCriteriaByGrade(course, "C");
  const dPlus = getGradingCriteriaByGrade(course, "D_PLUS");
  const d = getGradingCriteriaByGrade(course, "D");
  const f = getGradingCriteriaByGrade(course, "F");

  const isSomeZero = [a, bPlus, b, cPlus, c, dPlus, d, f].some(
    (v) => v.minScore === 0 && v.maxScore === 0
  );
  if (isSomeZero) return "X";

  if (score >= a.minScore && score <= a.maxScore) return "A";
  if (score >= bPlus.minScore && score <= bPlus.maxScore) return "B_PLUS";
  if (score >= b.minScore && score <= b.maxScore) return "B";
  if (score >= cPlus.minScore && score <= cPlus.maxScore) return "C_PLUS";
  if (score >= c.minScore && score <= c.maxScore) return "C";
  if (score >= dPlus.minScore && score <= dPlus.maxScore) return "D_PLUS";
  if (score >= d.minScore && score <= d.maxScore) return "D";
  if (score >= f.minScore && score <= f.maxScore) return "F";
  else return "X";
};

export const calculateStudentGradeAndScores = (
  course: CourseDetailSchema,
  updatedStudent: GradingForm[string]
) => {
  const cloWeightSettings = course.clos.map((clo) => clo.cloWeights);

  let sum = 0;
  const cloWeightSum = cloWeightSettings.reduce(
    (acc, cloWeight) => acc + 4.0 * (cloWeight?.weight || 0),
    0
  );

  for (const cloWeight of cloWeightSettings) {
    const studentClo = updatedStudent.clos.find((clo) => clo.id === cloWeight?.cloId);
    const cloResultScore = studentClo ? cloResultToNumber(studentClo.result) : 0;

    if (studentClo) {
      const weight = cloWeight?.weight || 0;
      sum += studentClo.result === "X" ? 0 : cloResultScore * weight;
    }
  }

  sum = Math.round((sum / cloWeightSum) * 100);

  const grade = getStudentGradeByScore(course, sum);
  return [sum, grade] as const;
};
