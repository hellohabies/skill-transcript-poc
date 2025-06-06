import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const Grade = t.Union([
  t.Literal("A"),
  t.Literal("B_PLUS"),
  t.Literal("B"),
  t.Literal("C_PLUS"),
  t.Literal("C"),
  t.Literal("D_PLUS"),
  t.Literal("D"),
  t.Literal("F"),
  t.Literal("X"),
]);
