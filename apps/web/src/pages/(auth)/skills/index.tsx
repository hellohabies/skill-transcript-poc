import { withAuth } from "@/hocs/withAuth";

function Page() {
  return <div>Skills</div>;
}

export const ProtectedSkillTranscriptPage = withAuth(Page, {
  allowedRoles: ["STUDENT"],
});

export default ProtectedSkillTranscriptPage;
