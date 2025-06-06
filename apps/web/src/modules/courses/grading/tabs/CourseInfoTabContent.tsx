import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { CourseDetailSchema } from "../../../../../../api/src/schemas/courses.schema";

interface CourseInfoTabContentProps {
  course: CourseDetailSchema;
}

export function CourseInfoTabContent({ course }: CourseInfoTabContentProps) {
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardContent className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <p className=" font-bold">คำอธิบายรายวิชา (ภาษาไทย)</p>
            <p>{course.descriptionTh}</p>
          </div>

          <div className="flex flex-col gap-1">
            <p className="font-bold">คำอธิบายรายวิชา (ภาษาอังกฤษ)</p>
            <p>{course.descriptionEn}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <p className=" font-bold">รายชื่อนักศึกษา</p>

            <Table className="mt-4">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">รหัสนักศึกษา</TableHead>
                  <TableHead className="w-[200px]">ชื่อ</TableHead>
                  <TableHead className="w-[150px]">อีเมล</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {course.students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>{student.universityStudentId}</TableCell>
                    <TableCell>{`${student.user?.firstName} ${student.user?.lastName}`}</TableCell>
                    <TableCell>{student.user?.email}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
