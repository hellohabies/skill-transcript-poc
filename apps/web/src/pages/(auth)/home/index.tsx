import { useAuthContext } from "@/contexts/AuthContext";
import { withAuth } from "@/hocs/withAuth";
import ProtectedStudentHomePage from "@/modules/home/studentHomePage";
import ProtectedTeacherHomePage from "@/modules/home/TeacherHomePage";

function AuthHomePage() {
  const { authUserRole } = useAuthContext();

  if (authUserRole === "TEACHER") {
    return <ProtectedTeacherHomePage />;
  } else if (authUserRole === "STUDENT") {
    return <ProtectedStudentHomePage />;
  }

  return <></>;
}

const ProtectedAuthHomePage = withAuth(AuthHomePage, {
  allowedRoles: ["ADMIN", "STUDENT", "TEACHER"],
});

export default ProtectedAuthHomePage;
