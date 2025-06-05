import { Sidebar, SidebarContent, SidebarHeader } from "@/components/ui/sidebar";
import { useAuthContext } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { useLocation } from "react-router";
import { getSidebarItemsConfigByRole } from "@/config/sidebar";
import { setDocumentTitle } from "@/lib/utils";
import SidebarMenuItem from "./SidebarMenuItem";

export function AppSidebar() {
  const location = useLocation();

  const { authUserRole } = useAuthContext();

  const SIDEBAR_ITEMS_CONFIG = getSidebarItemsConfigByRole(authUserRole || "STUDENT");

  // const handleSignout = useCallback(() => {
  //   signOut()
  //     .then(() => {
  //       navigate("/auth/login");
  //       toast.success("Signed out successfully", {
  //         description: "ออกจากระบบเรียบร้อยแล้ว",
  //       });
  //     })
  //     .catch((error) => {
  //       getErrorResponseAndShowErrorToast(error);
  //     });
  // }, [navigate, signOut]);

  useEffect(() => {
    const currentPath = location.pathname;
    const currentPageConfig = SIDEBAR_ITEMS_CONFIG?.flat().find((item) =>
      item.url?.startsWith(currentPath)
    );

    if (currentPageConfig) {
      const title = currentPageConfig.label;
      setDocumentTitle(title);
    }
  }, [location.pathname, SIDEBAR_ITEMS_CONFIG]);

  return (
    <Sidebar>
      <SidebarHeader className="px-5 pt-4 flex flex-row items-center gap-2">
        <div className="bg-kmitl-primary relative z-10 h-9 w-9 rounded-[12px]  font-bold text-white flex items-center justify-center">
          <p>ST</p>
        </div>
        <p className="text-xl font-semibold">Skill Transcript</p>
      </SidebarHeader>

      <SidebarContent className="my-6 flex flex-col gap-8 px-3.5">
        {SIDEBAR_ITEMS_CONFIG?.map((group, index) => (
          <div className="flex flex-col gap-2" key={`sidebar-group-${index}`}>
            {group.map((item) => {
              if (item.type === "LABEL") {
                return (
                  <p
                    key={item.label}
                    className="text-sidebar-foreground/50 text-sm font-semibold px-2 mb-1"
                  >
                    {item.label}
                  </p>
                );
              } else if (item.type === "ITEM") {
                return (
                  <SidebarMenuItem
                    key={item.url}
                    inActiveIcon={item.inActiveIcon}
                    activeIcon={item.activeIcon}
                    label={item.label}
                    url={item.url}
                    isActive={window.location.pathname.startsWith(item.url ?? "")}
                  />
                );
              }
              return null;
            })}
          </div>
        ))}
      </SidebarContent>

      {/* <SidebarFooter className="px-3.5 pb-4 flex flex-col gap-2">
        <SidebarMenuItem
          inActiveIcon={<LogOutIcon size={20} />}
          activeIcon={<LogOutIcon size={20} />}
          label="ออกจากระบบ"
          isLogout
          onClick={handleSignout}
        />
      </SidebarFooter> */}
    </Sidebar>
  );
}
