import { GradingSelect } from "@/components/select/GradingSelect";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { InfoIcon } from "lucide-react";

interface GradingTabContentProps {
  studentGrades: any[];
  setStudentGrades: React.Dispatch<React.SetStateAction<any>>;
}
export function GradingTabContent({ studentGrades, setStudentGrades }: GradingTabContentProps) {
  const handleGradeChange = (studentId: string, cloId: string, value: string) => {
    setStudentGrades((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId as keyof typeof prev],
        clos: prev[studentId as keyof typeof prev].clos.map((clo) =>
          clo.id === cloId ? { ...clo, result: value } : clo
        ),
      },
    }));
  };

  return (
    <Card>
      <CardContent>
        <Table className="my-7">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">รหัสนักศึกษา</TableHead>
              <TableHead className="w-[150px]">ชื่อ</TableHead>
              <TableHead className="w-[100px]">
                <div className="flex items-center gap-2">
                  CLO 1 <InfoIcon size={14} />
                </div>
              </TableHead>
              <TableHead className="w-[100px]">CLO 2</TableHead>
              <TableHead className="w-[100px]">CLO 3</TableHead>
              <TableHead className="w-[100px]">CLO 4</TableHead>
              <TableHead className="w-[100px]">CLO 5</TableHead>
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
