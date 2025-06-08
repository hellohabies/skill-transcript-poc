import type { Role } from "../../../../api/src/config/prisma";
import { SYSTEM_ADMIN_SIDEBAR_ITEMS } from "./systemAdmin";
import { STUDENT_SIDEBAR_ITEMS, USER_SIDEBAR_ITEMS } from "./teacher";

export function getSidebarItemsConfigByRole(role: Role | undefined) {
  if (role === "ADMIN") return SYSTEM_ADMIN_SIDEBAR_ITEMS;
  else if (role === "STUDENT") return STUDENT_SIDEBAR_ITEMS;
  else return USER_SIDEBAR_ITEMS;
}
