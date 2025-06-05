import type { Role } from "../../../../api/src/config/prisma";
import { SYSTEM_ADMIN_SIDEBAR_ITEMS } from "./systemAdmin";

export function getSidebarItemsConfigByRole(role: Role | undefined) {
  if (role === "ADMIN") return SYSTEM_ADMIN_SIDEBAR_ITEMS;
}
