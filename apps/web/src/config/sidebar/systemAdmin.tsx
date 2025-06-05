import { BookIcon } from "lucide-react";
export const ACTIVE_ICON_PROPS = {
  strokeWidth: 3,
  size: 20,
};

export const INACTIVE_ICON_PROPS = {
  size: 20,
};

export const SYSTEM_ADMIN_SIDEBAR_ITEMS = [
  [
    {
      type: "LABEL",
      label: "รายวิชาและหลักสูตร",
    },
    {
      type: "ITEM",
      label: "รายวิชา",

      url: "/courses",
      activeIcon: <BookIcon {...ACTIVE_ICON_PROPS} />,
      inActiveIcon: <BookIcon {...INACTIVE_ICON_PROPS} />,
    },
  ],
];
