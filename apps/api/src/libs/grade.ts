import { CourseGradingCriteria, Grade, GradingResult } from "@prisma/client";

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

export const getGradingCriteriaByGrade = (
  criteria: CourseGradingCriteria[],
  grade: Grade
): { minScore: number; maxScore: number } => {
  return (
    criteria.find((criteria) => criteria.grade === grade) || {
      minScore: 0,
      maxScore: 0,
    }
  );
};

export const getStudentGradeByScore = (criteria: CourseGradingCriteria[], score: number): Grade => {
  const a = getGradingCriteriaByGrade(criteria, "A");
  const bPlus = getGradingCriteriaByGrade(criteria, "B_PLUS");
  const b = getGradingCriteriaByGrade(criteria, "B");
  const cPlus = getGradingCriteriaByGrade(criteria, "C_PLUS");
  const c = getGradingCriteriaByGrade(criteria, "C");
  const dPlus = getGradingCriteriaByGrade(criteria, "D_PLUS");
  const d = getGradingCriteriaByGrade(criteria, "D");
  const f = getGradingCriteriaByGrade(criteria, "F");

  const isSomeZero = [a, bPlus, b, cPlus, c, dPlus, d, f].some(
    (v) => v.minScore === 0 && v.maxScore === 0
  );

  if (isSomeZero) return "X";

  console.log;

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
