import { SkillLevelOverviewChart } from "@/components/card/SkillLevelOverviewChart";
import SkillOverviewChart from "@/components/charts/SkillOverviewChart";
import { PageTitleSubtitle } from "@/components/PageTitleSubtitle";
import { withAuth } from "@/hocs/withAuth";

function Page() {
  return (
    <>
      <PageTitleSubtitle
        title="Skill Transcript"
        subtitle="ดูผลการเรียนของคุณในแต่ละรายวิชาที่ลงทะเบียนเรียน ในรูปแบบ Skill Transcript"
      />

      <div className="mt-7">
        <SkillOverviewChart />
      </div>

      <div className="mt-7">
        <SkillLevelOverviewChart />
      </div>
    </>
  );
}

export const ProtectedSkillTranscriptPage = withAuth(Page, {
  allowedRoles: ["STUDENT"],
});

export default ProtectedSkillTranscriptPage;
