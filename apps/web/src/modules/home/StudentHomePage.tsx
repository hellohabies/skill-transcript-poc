import { withAuth } from "@/hocs/withAuth";

function StudentHomePage() {
  return <div>StudentHomePage</div>;
}

const ProtectedStudentHomePage = withAuth(StudentHomePage, {
  allowedRoles: ["STUDENT"],
});

export default ProtectedStudentHomePage;
