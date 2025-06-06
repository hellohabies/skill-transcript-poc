import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const CloType = t.Union([
  t.Literal("K"),
  t.Literal("S"),
  t.Literal("A"),
]);
