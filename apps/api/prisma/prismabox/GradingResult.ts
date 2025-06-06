import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const GradingResult = t.Union([
  t.Literal("FAIL"),
  t.Literal("PASS"),
  t.Literal("GOOD"),
  t.Literal("VERY_GOOD"),
  t.Literal("EXCELLENT"),
  t.Literal("X"),
]);
