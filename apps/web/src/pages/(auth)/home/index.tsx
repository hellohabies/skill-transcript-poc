import { withAuth } from "@/hocs/withAuth";

function AuthHomePage() {
  return <div>AuthHome</div>;
}

const ProtectedAuthHomePage = withAuth(AuthHomePage, {
  allowedRoles: ["ADMIN", "STUDENT", "TEACHER"],
});

export default ProtectedAuthHomePage;
