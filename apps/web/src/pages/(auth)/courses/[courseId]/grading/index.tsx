import Loader from "@/components/Loader";
import { PageTitleSubtitle } from "@/components/PageTitleSubtitle";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "@/config/api";
import { withAuth } from "@/hocs/withAuth";
import { CloDetailsTabContent } from "@/modules/courses/grading/tabs/CloDetailsTabContent";
import { CourseInfoTabContent } from "@/modules/courses/grading/tabs/CourseInfoTabContent";
import { GradingTabContent } from "@/modules/courses/grading/tabs/GradingTabContent";
import { SettingTabContent } from "@/modules/courses/grading/tabs/SettingTabContent";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeftIcon, EditIcon, InfoIcon, ListIcon, ShareIcon, WeightIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { useParams } from "react-router";
import type { CloType, Grade, GradingResult } from "../../../../../../../api/src/config/prisma";
import { calculateStudentGradeAndScores } from "@/lib/grade";

export type GradingForm = {
  [studentId: string]: {
    universityStudentId: string;
    name: string;
    clos: {
      id: string;
      type: CloType;
      result: GradingResult;
    }[];
    score: number;
    grade: Grade;
  };
};

function CourseGradingPage() {
  const { courseId } = useParams();

  const { data: courseResponse, isLoading: isLoadingCourse } = useQuery({
    queryKey: ["courses", courseId],
    queryFn: () => api.courses({ id: courseId as string }).get(),
  });

  const course = useMemo(() => courseResponse?.data?.data, [courseResponse]);

  const [isAllowToAnnounce, setIsAllowToAnnounce] = useState(false);
  const [studentGrades, setStudentGrades] = useState<GradingForm>({});

  useEffect(() => {
    if (!course) return;

    const initialGrades = course.students.reduce((acc: GradingForm, student) => {
      const clos = student.grading!.gradingCloResults.map((gcr) => ({
        id: gcr.clo.id,
        type: gcr.clo.type as CloType,
        result: gcr.result as GradingResult,
      }));

      const [newScore, newGrade] = calculateStudentGradeAndScores(course, {
        clos,
        universityStudentId: student.universityStudentId || "",
        score: student.grading?.score || 0,
        grade: student.grading?.grade || "X",
        name: `${student.user?.firstName} ${student.user?.lastName}`,
      });

      acc[student.id] = {
        universityStudentId: student.universityStudentId || "",
        name: `${student.user?.firstName} ${student.user?.lastName}`,
        clos,
        score: newScore,
        grade: newGrade,
      };
      return acc;
    }, {});

    setStudentGrades(initialGrades);
  }, [course]);

  useEffect(() => {
    let isAllow = true;

    for (const student of Object.values(studentGrades)) {
      if (student.clos.some((clo) => clo.result === "X")) {
        isAllow = false;
        break;
      }
    }

    setIsAllowToAnnounce(isAllow);
  }, [studentGrades]);

  if (isLoadingCourse) {
    return <Loader />;
  }

  if (!course) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">ไม่พบข้อมูลรายวิชานี้</p>
      </div>
    );
  }

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
          <CardTitle>
            {course?.courseCode} - {course?.nameTh}
          </CardTitle>
          <CardDescription>{course?.nameEn}</CardDescription>
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
          <CourseInfoTabContent course={course} />
        </TabsContent>
        <TabsContent value="clos">
          <CloDetailsTabContent course={course} />
        </TabsContent>
        <TabsContent value="grading">
          <GradingTabContent
            setStudentGrades={setStudentGrades}
            studentGrades={studentGrades}
            course={course}
          />
        </TabsContent>
        <TabsContent value="setting">
          <SettingTabContent course={course} />
        </TabsContent>
      </Tabs>
    </>
  );
}

const ProtectedCourseGradingPage = withAuth(CourseGradingPage, {
  allowedRoles: ["TEACHER"],
});

export default ProtectedCourseGradingPage;
