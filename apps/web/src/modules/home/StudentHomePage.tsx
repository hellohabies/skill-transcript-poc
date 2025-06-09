import { PageTitleSubtitle } from "@/components/PageTitleSubtitle";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { api } from "@/config/api";
import { useAuthContext } from "@/contexts/AuthContext";
import { withAuth } from "@/hocs/withAuth";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useMemo } from "react";
import { getCloTypeLabel } from "../courses/grading/tabs/CloDetailsTabContent";
import { cn } from "@/lib/utils";

function StudentHomePage() {
  const { authUser } = useAuthContext();
  const studentId = authUser?.student?.id ?? "";

  const { data: studentResponse, isLoading: isLoadingStudent } = useQuery({
    queryKey: ["students", "courses", studentId],
    queryFn: () => api.students({ studentId }).get(),
  });

  const studentCourses = useMemo(() => studentResponse?.data?.data, [studentResponse]);
  const courseAndClos = useMemo(() => {
    if (!studentCourses) return [];
    return studentCourses?.map((sc) => ({
      course: sc.course,
      gradingCloResults: sc.gradings.gradingCloResults.sort((a, b) => a.index - b.index),
    }));
  }, [studentCourses]);

  if (isLoadingStudent) {
    return <Loader />;
  }

  return (
    <div className="px-10 pb-20">
      <Card className="mb-7 shadow-xs">
        <CardHeader>
          <CardTitle>
            {authUser?.nameTitle + " " + authUser?.firstName + " " + authUser?.lastName}
          </CardTitle>
          <CardDescription>
            นักศึกษาประจำหลักสูตร{authUser?.teacher?.affiliatedCurriculum.degreeName} / สาขา
            {authUser?.student?.affiliatedCurriculum.programName} / คณะ
            {authUser?.student?.affiliatedCurriculum.faculty.name} / {""}
            {authUser?.student?.affiliatedCurriculum.faculty.university.name}
          </CardDescription>
        </CardHeader>
      </Card>

      <PageTitleSubtitle title="หน้าแรก" subtitle="ยินดีต้อนรับสู่ระบบ Skill Transcript" />
      {/* 
      <div className="grid grid-cols-3 my-7">
        <Card className=" shadow-xs">
          <CardHeader>
            <CardTitle>ผลการเรียน (GPA)</CardTitle>

            <p className="mt-4 text-xl font-bold">
              4.00 <span className="text-base font-medium text-muted-foreground">/ 4.00</span>
            </p>
          </CardHeader>
        </Card>
      </div> */}

      <div className="my-7"></div>

      <PageTitleSubtitle title="ผลการเรียนรายวิชา" subtitle="" />

      <div className="my-7">
        <Table>
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="text-center">ลำดับ</TableHead>
              <TableHead className="text-center">รหัสวิชา</TableHead>
              <TableHead className="max-w-[100px]">ชื่อวิชา (ไทย)</TableHead>
              <TableHead className="max-w-[100px]">ชื่อวิชา (Eng)</TableHead>
              <TableHead>อาจารย์ผู้สอน</TableHead>
              <TableHead className="text-center">คะแนน</TableHead>
              <TableHead className="text-center">เกรด</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {studentCourses?.map((sc, index) => (
              <TableRow key={sc.id}>
                <TableCell className="text-center">{index + 1}</TableCell>
                <TableCell className="text-center">{sc.course.courseCode}</TableCell>
                <TableCell className="text-wrap">{sc.course.nameTh}</TableCell>
                <TableCell className="text-wrap">{sc.course.nameEn}</TableCell>
                <TableCell>{`${sc.course.teacher.user.nameTitle} ${sc.course.teacher.user.firstName} ${sc.course.teacher.user.lastName}`}</TableCell>
                <TableCell className="text-center">{sc.gradings.score}</TableCell>
                <TableCell className="text-center">{sc.gradings.grade}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <PageTitleSubtitle title="รายละเอียด CLO แต่ละรายวิชา" subtitle="" />

      <div className="my-7 flex flex-col gap-4">
        {courseAndClos.map((courseClo) => (
          <Card className=" shadow-xs" key={courseClo.course.id + "clos"}>
            <CardHeader>
              <CardTitle className="text-lg">
                ({courseClo.course.courseCode}) {courseClo.course.nameEn}
              </CardTitle>

              {courseClo.gradingCloResults.map((gradingClo) => (
                <div className="flex items-center justify-between mt-4 text-sm">
                  <div className="flex items-center gap-2 w-[70%] justify-between">
                    <p>
                      <span className="font-medium">CLO {gradingClo.index + 1}</span>{" "}
                      {gradingClo.clo.name}
                    </p>
                    <Badge
                      className={cn("text-sm px-4 rounded-full ", {
                        "bg-blue-100 text-blue-800": gradingClo.clo.type === "K",
                        "bg-green-100 text-green-800": gradingClo.clo.type === "S",
                        "bg-yellow-100 text-yellow-800": gradingClo.clo.type === "A",
                        "bg-gray-100 text-gray-800": !gradingClo.clo.type,
                      })}
                    >
                      {getCloTypeLabel(gradingClo.clo.type)}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2">
                    <p>
                      ระดับที่ได้ : <span className="font-bold">{gradingClo.result}</span>
                    </p>
                  </div>
                </div>
              ))}
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}

const ProtectedStudentHomePage = withAuth(StudentHomePage, {
  allowedRoles: ["STUDENT"],
});

export default ProtectedStudentHomePage;
