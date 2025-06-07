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
import { api } from "@/config/api";
import type { GradingResult } from "../../../../../../api/src/config/prisma";
import { toast } from "sonner";
import { calculateStudentGradeAndScores, gradeResultToGradeLabel } from "@/lib/grade";

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
  const handleSaveStudentGrade = async (
    cloId: string,
    studentId: string,
    courseId: string,
    value: GradingResult
  ) => {
    try {
      const { data, error } = await api.gradings.students.grades.put({
        cloId: cloId,
        courseId: courseId,
        studentId: studentId,
        grade: value as GradingResult,
      });

      if (error && error.value) {
        toast.error("ไม่สามารถบันทึกคะแนน CLO ได้", {
          description: (error.value as { error: { message: string } }).error.message,
        });
        return;
      }

      if (data) {
        toast.success("บันทึกคะแนน CLO สำเร็จ", {
          description: "คะแนน CLO ได้ถูกบันทึกเรียบร้อยแล้ว",
        });
      }
    } catch (error) {
      console.error("Error updating grade:", error);
      return;
    }
  };

  const handleGradeChange = async (studentId: string, cloId: string, value: string) => {
    const courseId = course.id;

    await handleSaveStudentGrade(cloId, studentId, courseId, value as GradingResult);

    setStudentGrades((prev) => {
      const updatedStudent = {
        ...prev[studentId],
        clos: prev[studentId].clos.map((clo) =>
          clo.id === cloId ? { ...clo, result: value as typeof clo.result } : clo
        ),
      };

      const [newScore, newGrade] = calculateStudentGradeAndScores(course, updatedStudent);

      return {
        ...prev,
        [studentId]: {
          ...updatedStudent,
          score: newScore,
          grade: newGrade,
        },
      };
    });
  };

  const cloCount = course.clos.length;

  return (
    <Card>
      <CardContent>
        <Table className="my-7 mb-2">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">รหัสนักศึกษา</TableHead>
              <TableHead className="w-[150px]">ชื่อ</TableHead>

              {new Array(cloCount).fill(0).map((_, index) => (
                <TableHead className="w-[100px]" key={index}>
                  <div className="flex items-center gap-2">CLO {index + 1}</div>
                </TableHead>
              ))}

              <TableHead className="w-[50px] text-center">เกรด</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.entries(studentGrades).map(([studentId, student]) => (
              <TableRow key={studentId}>
                <TableCell className="font-bold">{student.universityStudentId}</TableCell>
                <TableCell className="font-bold">{student.name}</TableCell>
                {student.clos.map((clo) => (
                  <TableCell key={clo.id}>
                    <GradingSelect
                      value={clo.result}
                      onValueChange={(value) => handleGradeChange(studentId, clo.id, value)}
                    />
                  </TableCell>
                ))}
                <TableCell>
                  <p className="font-bold flex items-center justify-center gap-2">
                    <span className="w-[25px]">({student.score})</span>
                    {" | "}
                    <span className="w-[25px] ">
                      {" "}
                      {gradeResultToGradeLabel(student.grade) || "-"}
                    </span>
                  </p>
                </TableCell>
              </TableRow>
            ))}
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
