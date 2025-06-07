import { GradingSelect } from "@/components/select/GradingSelect";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { GradingForm } from "@/pages/(auth)/courses/[courseId]/grading";
import type { CourseDetailSchema } from "../../../../../../api/src/schemas/courses.schema";

interface GradingTabContentProps {
  studentGrades: GradingForm;
  setStudentGrades: React.Dispatch<React.SetStateAction<GradingForm>>;
  course: CourseDetailSchema;
}
export function GradingTabContent({
  studentGrades,
  setStudentGrades,
  course,
}: GradingTabContentProps) {
  const handleGradeChange = (studentId: string, cloId: string, value: string) => {
    const courseId = course.id;
    // studentId // cloId // grade;

    setStudentGrades((prev) => {
      const updatedStudent = {
        ...prev[studentId],
        clos: prev[studentId].clos.map((clo) =>
          clo.id === cloId ? { ...clo, result: value as typeof clo.result } : clo
        ),
      };

      return {
        ...prev,
        [studentId]: updatedStudent,
      };
    });
  };

  const cloCount = course.clos.length;

  return (
    <Card>
      <CardContent>
        <Table className="my-7">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">รหัสนักศึกษา</TableHead>
              <TableHead className="w-[150px]">ชื่อ</TableHead>

              {new Array(cloCount).fill(0).map((_, index) => (
                <TableHead className="w-[100px]" key={index}>
                  <div className="flex items-center gap-2">CLO {index + 1}</div>
                </TableHead>
              ))}

              <TableHead className="w-[50px]">เกรด</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.entries(studentGrades).map(([studentId, student]) => (
              <TableRow key={studentId}>
                <TableCell>{studentId}</TableCell>
                <TableCell>{student.name}</TableCell>
                {student.clos.map((clo) => (
                  <TableCell key={clo.id}>
                    <GradingSelect
                      value={clo.result}
                      onValueChange={(value) => handleGradeChange(studentId, clo.id, value)}
                    />
                  </TableCell>
                ))}
                <TableCell>
                  <p>
                    ({student.score}) {student.grade || "-"}
                  </p>
                </TableCell>
              </TableRow>
            ))}

            {/* <TableRow>
              <TableCell>65070219</TableCell>
              <TableCell>นายสมชาย ใจดี</TableCell>
              <TableCell>
                <GradingSelect gradingType="normal" />
              </TableCell>
              <TableCell>
                <Input className="w-[100px]" />
              </TableCell>
              <TableCell>
                <Input className="w-[100px]" />
              </TableCell>
              <TableCell>
                <Input className="w-[100px]" />
              </TableCell>
              <TableCell>
                <Input className="w-[100px]" />
              </TableCell>
              <TableCell>
                <p>A</p>
              </TableCell>
            </TableRow> */}

            {/* {[].map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="font-medium">{invoice.invoice}</TableCell>
            <TableCell>{invoice.paymentStatus}</TableCell>
            <TableCell>{invoice.paymentMethod}</TableCell>
            <TableCell className="text-right">{invoice.totalAmount}</TableCell>
          </TableRow>
        ))} */}
          </TableBody>
        </Table>
      </CardContent>

      <CardFooter>
        <p className="text-sm text-muted-foreground">
          หมายเหตุ: การบันทึกคะแนนและตัดเกรดจะถูกบันทึกอัตโนมัติเมื่อมีการเปลี่ยนแปลง
        </p>
      </CardFooter>
    </Card>
  );
}
