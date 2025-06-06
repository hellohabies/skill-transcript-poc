import { AppSidebar } from "@/components/sidebar/AppSidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useAuthContext } from "@/contexts/AuthContext";
import { withAuth } from "@/hocs/withAuth";
import { Outlet } from "react-router";

const ROLE_TITLE = {
  ADMIN: "ผู้ดูแลระบบส่วนกลาง (System Administrator)",
  STUDENT: "นักเรียน",
  TEACHER: "ครูผู้สอน",
};

function getTitleByRole(role: "ADMIN" | "STUDENT" | "TEACHER"): string {
  return ROLE_TITLE[role];
}

function RootLayout() {
  const { authUserRole } = useAuthContext();

  return (
    <SidebarProvider>
      <AppSidebar />

      <main className="w-full">
        <div className="px-5 py-4 max-h-[70px] flex items-center justify-between">
          <div className="flex items-center gap-0">
            <SidebarTrigger />

            <Separator
              orientation="vertical"
              className="hidden md:block ml-2 data-[orientation=vertical]:h-4"
            />

            <div className=" flex-col gap-0 ml-4 hidden md:flex ">
              <p className="text-base font-bold">Skill Transcript Administrator Console </p>
              <p className="text-sm">{getTitleByRole(authUserRole || "STUDENT")}</p>
            </div>
          </div>

          {/* <Button variant={"ghost"} onClick={signOut}>
            <LogOutIcon />
            ออกจากระบบ
          </Button> */}
        </div>

        <div className="bg-[#F9FAFB] p-5 min-h-[calc(100dvh-60px)] overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
}

const ProtectedRootLayout = withAuth(RootLayout, {
  allowedRoles: ["ADMIN", "STUDENT", "TEACHER"],
});

export default ProtectedRootLayout;
