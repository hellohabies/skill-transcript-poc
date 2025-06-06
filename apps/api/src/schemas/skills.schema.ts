import { t } from "elysia";
import { cloBaseSchema } from "./clos.schema";
import { SkillType } from "../../prisma/prismabox/SkillType";
import { softDeleteBaseSchema } from "./base.schema";

export const cloSkillLevelCriteriaBaseSchema = {
  id: t.String(),
  courseId: t.String(),
  cloId: t.String(),
  clo: t.Object({ ...cloBaseSchema }),
  skillLevelCriteriaId: t.String(),
  ...softDeleteBaseSchema,
};

export const skillLevelMethodBaseSchema = {
  id: t.String(),
  skillLevelId: t.String(),
  methodNameTh: t.String(),
  methodNameEn: t.String(),
  ...softDeleteBaseSchema,
};

export const skillLevelCriteriaBaseSchema = {
  id: t.String(),
  skillLevelId: t.String(),
  criteriaNameTh: t.String(),
  criteriaNameEn: t.String(),
  cloSkillLevelCriterias: t.Array(t.Object({ ...cloSkillLevelCriteriaBaseSchema })),
  ...softDeleteBaseSchema,
};

export const skillLevelBaseSchema = {
  id: t.String(),
  skillId: t.String(),
  level: t.Number(),
  descriptionTh: t.String(),
  descriptionEn: t.String(),
  methods: t.Array(t.Object({ ...skillLevelMethodBaseSchema })),
  criterias: t.Array(t.Object({ ...skillLevelCriteriaBaseSchema })),
  ...softDeleteBaseSchema,
};

export const skillBaseSchema = {
  id: t.String(),
  skillMappingRefId: t.String(),
  nameTh: t.String(),
  nameEn: t.String(),
  descriptionTh: t.String(),
  descriptionEn: t.String(),
  type: SkillType,
  isMainSkill: t.Boolean(),
  courseId: t.String(),
  skillLevels: t.Array(t.Object({ ...skillLevelBaseSchema })),
  ...softDeleteBaseSchema,
};
