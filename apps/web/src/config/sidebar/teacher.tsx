import { FileChartPieIcon, HomeIcon } from "lucide-react";
export const ACTIVE_ICON_PROPS = {
  strokeWidth: 3,
  size: 20,
};

export const INACTIVE_ICON_PROPS = {
  size: 20,
};

export const USER_SIDEBAR_ITEMS = [
  [
    {
      type: "ITEM",
      label: "หน้าแรก",

      url: "/home",
      activeIcon: <HomeIcon {...ACTIVE_ICON_PROPS} />,
      inActiveIcon: <HomeIcon {...INACTIVE_ICON_PROPS} />,
    },
  ],
];

export const STUDENT_SIDEBAR_ITEMS = [
  [
    {
      type: "ITEM",
      label: "หน้าแรก",

      url: "/home",
      activeIcon: <HomeIcon {...ACTIVE_ICON_PROPS} />,
      inActiveIcon: <HomeIcon {...INACTIVE_ICON_PROPS} />,
    },
    {
      type: "ITEM",
      label: "Skill Transcript",

      url: "/skills",
      activeIcon: <FileChartPieIcon {...ACTIVE_ICON_PROPS} />,
      inActiveIcon: <FileChartPieIcon {...INACTIVE_ICON_PROPS} />,
    },
  ],
];
