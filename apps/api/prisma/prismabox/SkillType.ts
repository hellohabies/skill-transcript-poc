import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const SkillType = t.Union([
  t.Literal("SPECIFIC"),
  t.Literal("GENERAL"),
  t.Literal("MAIN"),
  t.Literal("OTHER"),
]);
