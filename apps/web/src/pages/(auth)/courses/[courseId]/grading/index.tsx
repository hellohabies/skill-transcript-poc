import { PageTitleSubtitle } from "@/components/PageTitleSubtitle";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { withAuth } from "@/hocs/withAuth";
import { CloDetailsTabContent } from "@/modules/courses/grading/tabs/CloDetailsTabContent";
import { CourseInfoTabContent } from "@/modules/courses/grading/tabs/CourseInfoTabContent";
import { GradingTabContent } from "@/modules/courses/grading/tabs/GradingTabContent";
import { SettingTabContent } from "@/modules/courses/grading/tabs/SettingTabContent";
import { ChevronLeftIcon, EditIcon, InfoIcon, ListIcon, ShareIcon, WeightIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useParams } from "react-router";

function CourseGradingPage() {
  const { courseId } = useParams();

  const [isAllowToAnnounce, setIsAllowToAnnounce] = useState(false);
  const [studentGrades, setStudentGrades] = useState({
    "65070219": {
      name: "นายสมชาย ใจดี",
      clos: [
        {
          id: "1",
          type: "K",
          result: "",
        },
        {
          id: "2",
          type: "K",
          result: "",
        },
        {
          id: "3",
          type: "S",
          result: "",
        },
        {
          id: "4",
          type: "S",
          result: "",
        },
        {
          id: "5",
          type: "K",
          result: "",
        },
      ],
      score: 0,
      grade: "",
    },
  });

  useEffect(() => {
    let isAllow = true;

    for (const student of Object.values(studentGrades)) {
      if (student.clos.some((clo) => clo.result === "")) {
        isAllow = false;
        break;
      }
    }

    setIsAllowToAnnounce(isAllow);
  }, [studentGrades]);

  return (
    <>
      <Link to={`/home`}>
        <Button className="mb-7" variant={"outline"}>
          <ChevronLeftIcon />
          กลับไปยังหน้ารายวิชา
        </Button>
      </Link>

      <div className="flex items-center justify-between">
        <PageTitleSubtitle
          title="บันทึกคะแนน / ตัดเกรด"
          subtitle="บันทึกคะแนนและตัดเกรดนักศึกษาในรายวิชานี้"
        />

        <Button disabled={!isAllowToAnnounce}>
          <ShareIcon />
          ประกาศเกรด
        </Button>
      </div>

      <Card className="mt-7 shadow-xs">
        <CardHeader>
          <CardTitle>1171102 - พัฒนาการและการเรียนรู้สาหรับเด็กปฐมวัย</CardTitle>
          <CardDescription>Early Childhood Development and Learning</CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="info" className="!w-full mt-4">
        <TabsList className="!w-full">
          <TabsTrigger value="info">
            <InfoIcon />
            ข้อมูลรายวิชา
          </TabsTrigger>
          <TabsTrigger value="clos">
            <ListIcon />
            รายละเอียด CLO และ Skills
          </TabsTrigger>
          <TabsTrigger value="grading">
            <EditIcon /> บันทึกคะแนน
          </TabsTrigger>
          <TabsTrigger value="setting">
            <WeightIcon />
            ค่าน้ำหนัก (สัดส่วนคะแนน)
          </TabsTrigger>
        </TabsList>

        <div className="my-0"></div>
        <TabsContent value="info">
          <CourseInfoTabContent />
        </TabsContent>
        <TabsContent value="clos">
          <CloDetailsTabContent />
        </TabsContent>
        <TabsContent value="grading">
          <GradingTabContent setStudentGrades={setStudentGrades} studentGrades={studentGrades} />
        </TabsContent>
        <TabsContent value="setting">
          <SettingTabContent />
        </TabsContent>
      </Tabs>
    </>
  );
}

const ProtectedCourseGradingPage = withAuth(CourseGradingPage, {
  allowedRoles: ["TEACHER"],
});

export default ProtectedCourseGradingPage;
