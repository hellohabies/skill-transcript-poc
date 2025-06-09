import { SkillLevelOverviewChart } from "@/components/card/SkillLevelOverviewChart";
import SkillOverviewChart from "@/components/charts/SkillOverviewChart";
import Loader from "@/components/Loader";
import { PageTitleSubtitle } from "@/components/PageTitleSubtitle";
import { api } from "@/config/api";
import { useAuthContext } from "@/contexts/AuthContext";
import { withAuth } from "@/hocs/withAuth";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

function Page() {
  const { authUser } = useAuthContext();
  const studentId = authUser?.student?.id ?? "";

  const { data: studentSkillResponse, isLoading: isLoadingStudentSkill } = useQuery({
    queryKey: ["skills", "students", studentId],
    queryFn: () => api.students({ studentId }).skills.get(),
  });

  const studentSkills = useMemo(() => studentSkillResponse?.data?.data, [studentSkillResponse]);

  if (isLoadingStudentSkill) {
    return <Loader />;
  }

  if (!studentSkills) {
    return <PageTitleSubtitle title="Skill Transcript" subtitle="ไม่พบข้อมูลผลการเรียนของคุณ" />;
  }

  return (
    <div className="px-10 pb-20">
      <PageTitleSubtitle
        title="Skill Transcript"
        subtitle="ดูผลการเรียนของคุณในแต่ละรายวิชาที่ลงทะเบียนเรียน ในรูปแบบ Skill Transcript"
      />

      <div className="mt-7">
        <SkillOverviewChart studentSkills={studentSkills} />
      </div>

      <div className="mt-7">
        <SkillLevelOverviewChart studentSkills={studentSkills} />
      </div>
    </div>
  );
}

export const ProtectedSkillTranscriptPage = withAuth(Page, {
  allowedRoles: ["STUDENT"],
});

export default ProtectedSkillTranscriptPage;
