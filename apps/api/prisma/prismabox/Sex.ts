import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const Sex = t.Union([
  t.Literal("MALE"),
  t.Literal("FEMALE"),
  t.Literal("OTHER"),
]);
