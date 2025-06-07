import { PageTitleSubtitle } from "@/components/PageTitleSubtitle";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuthContext } from "@/contexts/AuthContext";
import { withAuth } from "@/hocs/withAuth";

function StudentHomePage() {
  const { authUser } = useAuthContext();

  return (
    <>
      <Card className="mb-7 shadow-xs">
        <CardHeader>
          <CardTitle>
            {authUser?.nameTitle + " " + authUser?.firstName + " " + authUser?.lastName}
          </CardTitle>
          <CardDescription>
            นักศึกษาประจำหลักสูตร{authUser?.teacher?.affiliatedCurriculum.degreeName} / สาขา
            {authUser?.student?.affiliatedCurriculum.programName} / คณะ
            {authUser?.student?.affiliatedCurriculum.faculty.name} / มหาวิทยาลัย
            {authUser?.student?.affiliatedCurriculum.faculty.university.name}
          </CardDescription>
        </CardHeader>
      </Card>

      <PageTitleSubtitle title="หน้าแรก" subtitle="ยินดีต้อนรับสู่ระบบ Skill Transcript" />

      <div className="grid grid-cols-3 my-7">
        <Card className=" shadow-xs">
          <CardHeader>
            <CardTitle>ผลการเรียน (GPA)</CardTitle>

            <p className="mt-4 text-xl font-bold">
              4.00 <span className="text-base font-medium text-muted-foreground">/ 4.00</span>
            </p>
          </CardHeader>
        </Card>
      </div>

      <PageTitleSubtitle title="ผลการเรียนรายวิชา" subtitle="" />

      <div className="my-7">
        <Table>
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead>ลำดับ</TableHead>
              <TableHead>รหัสวิชา</TableHead>
              <TableHead className="max-w-[100px]">ชื่อวิชา (ไทย)</TableHead>
              <TableHead className="max-w-[100px]">ชื่อวิชา (Eng)</TableHead>
              <TableHead>อาจารย์ผู้สอน</TableHead>
              <TableHead>คะแนน</TableHead>
              <TableHead>เกรด</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* {teacherCourses.map((course) => (
            <TableRow key={course.id}>
              <TableCell className="font-medium">{selectedFaculty?.name}</TableCell>
              <TableCell>{selectedCurriculum?.programName}</TableCell>
              <TableCell>{course.courseCode}</TableCell>
              <TableCell className="text-wrap">{course.nameTh}</TableCell>
              <TableCell className="text-wrap">{course.nameEn}</TableCell>
              <TableCell>
                {course.teachers[0].user.nameTitle +
                  " " +
                  course.teachers[0].user.firstName +
                  " " +
                  course.teachers[0].user.lastName}
              </TableCell>
            </TableRow>
          ))} */}
          </TableBody>
        </Table>
      </div>

      <PageTitleSubtitle title="รายละเอียด CLO แต่ละรายวิชา" subtitle="" />

      <div className="my-7">
        <Card className=" shadow-xs">
          <CardHeader>
            <CardTitle>(06066001) Introduction to Computer Science</CardTitle>

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2 w-[70%] justify-between">
                <p>
                  <span className="font-medium">CLO 1.</span> นักศึกษาประจำหลักสูตร
                </p>
                <Badge>ด้านความรู้ (K - Knowledge)</Badge>
              </div>

              <div className="flex items-center gap-2">
                <p>ระดับที่ได้ : </p>
                <p className="p-1 px-4 bg-kmitl-primary/10 rounded-xl min-w-[100px] text-center">
                  {" "}
                  X{" "}
                </p>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>
    </>
  );
}

const ProtectedStudentHomePage = withAuth(StudentHomePage, {
  allowedRoles: ["STUDENT"],
});

export default ProtectedStudentHomePage;
