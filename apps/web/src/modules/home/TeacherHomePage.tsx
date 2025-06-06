import { PageTitleSubtitle } from "@/components/PageTitleSubtitle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuthContext } from "@/contexts/AuthContext";
import { withAuth } from "@/hocs/withAuth";
import { ChevronRightIcon } from "lucide-react";
import { Link } from "react-router";

function TeacherHomePage() {
  const { authUser } = useAuthContext();

  return (
    <>
      <Card className="mb-7 shadow-xs">
        <CardHeader>
          <CardTitle>
            {authUser?.nameTitle + " " + authUser?.firstName + " " + authUser?.lastName}
          </CardTitle>
          <CardDescription>
            อาจารย์ประจำหลักสูตร{authUser?.teacher?.affiliatedCurriculum.degreeName} / สาขา
            {authUser?.teacher?.affiliatedCurriculum.programName} / คณะ
            {authUser?.teacher?.affiliatedCurriculum.faculty.name} / มหาวิทยาลัย
            {authUser?.teacher?.affiliatedCurriculum.faculty.university.name}
          </CardDescription>
        </CardHeader>
      </Card>

      <PageTitleSubtitle
        title="รายวิชาที่สอน"
        subtitle="รายวิชาที่คุณเปิดสอนในเทอมและปีการศึกษานี้ภายในระบบ Skill Transcript"
      />

      <div className="mt-7 grid grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>1171102 - พัฒนาการและการเรียนรู้สาหรับเด็กปฐมวัย</CardTitle>
            <CardDescription>Early Childhood Development and Learning</CardDescription>
          </CardHeader>

          <CardContent>
            <p className="text-sm">
              พัฒนาการและการเรียนรู้เด็กปฐมวัยด้านร่างกาย อารมณ์-จิตใจ สังคม และสติปัญญา
              พฤติกรรมการเรียนรู้เด็กปฐมวัย ปัจจัยที่มีอิทธิพลต่อพัฒนาการและการเรียนรู้เด็กปฐมวัย
              วิธีการอบรมเลี้ยงดู การออกแบบกิจกรรมส่งเสริมพัฒนาการและการเรียนรู้สำหรับเด็กปฐมวัย
              บทบาทของผู้ที่เกี่ยวข้องในการส่งเสริมพัฒนาการและการเรียนรู้สำหรับเด็กปฐมวัย
              งานวิจัยที่เกี่ยวข้อง และฝึกปฏิบัติ
            </p>
          </CardContent>

          <CardFooter>
            <Link to={`/courses/1/grading`} className="w-full">
              <Button className="w-full" variant={"outline"}>
                ผลการเรียน / ตัดเกรด <ChevronRightIcon />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

const ProtectedTeacherHomePage = withAuth(TeacherHomePage, {
  allowedRoles: ["TEACHER"],
});

export default ProtectedTeacherHomePage;
