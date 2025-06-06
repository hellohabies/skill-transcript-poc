import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SaveIcon } from "lucide-react";
import { useState } from "react";

export function SettingTabContent() {
  const [gradeSettings, setGradeSettings] = useState({
    A: { min: 85, max: 100 },
    "B+": { min: 80, max: 84 },
    B: { min: 75, max: 79 },
    "C+": { min: 70, max: 74 },
    C: { min: 65, max: 69 },
    "D+": { min: 60, max: 64 },
    D: { min: 50, max: 59 },
  });

  const handleGradeSettingChange = (grade: string, newValue: number, type: "MIN" | "MAX") => {
    if (isNaN(newValue) || newValue < 0 || newValue > 100) newValue = 0;
    setGradeSettings((prev) => ({
      ...prev,
      [grade]: {
        ...prev[grade as keyof typeof prev],
        [type === "MIN" ? "min" : "max"]: newValue,
      },
    }));
  };

  return (
    <Card>
      <CardContent>
        <p className="font-bold">สัดส่วนการคิดคะแนน</p>
        <form className="flex flex-col gap-6 mt-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <p>
                <span className="font-bold">CLO 1.</span> อธิบายพัฒนาการองค์รวม
                และพฤติกรรมการเรียนรู้เด็กปฐมวัยได้ถูกต้อง
              </p>

              <Badge>ด้านความรู้ (K - Knowledge)</Badge>
            </div>

            <div className="flex items-center gap-4">
              <p>สัดส่วน</p>
              <Input className="w-[200px]" />
              <p>%</p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <p>
                <span className="font-bold">CLO 1.</span> อธิบายพัฒนาการองค์รวม
                และพฤติกรรมการเรียนรู้เด็กปฐมวัยได้ถูกต้อง
              </p>

              <Badge>ด้านความรู้ (K - Knowledge)</Badge>
            </div>

            <div className="flex items-center gap-4">
              <p>สัดส่วน</p>
              <Input className="w-[200px]" />
              <p>%</p>
            </div>
          </div>
        </form>

        <div className="flex items-center justify-end gap-4 mt-8">
          <p>รวม</p>
          <Input className="w-[200px]" />
          <p>%</p>
        </div>

        <p className="font-bold">เกณฑ์การตัดเกรด</p>
        <form className="mt-4 flex flex-col gap-6">
          {Object.entries(gradeSettings).map(([grade, { min, max }], index) => (
            <div className="flex items-center gap-4" key={index}>
              <p className="w-[70px]">เกรด {grade}</p>
              <div className="flex items-center gap-2">
                <Input
                  className="w-[100px]"
                  value={min}
                  min={0}
                  onChange={(e) => {
                    const newValue = parseInt(e.target.value, 10);
                    handleGradeSettingChange(grade, newValue, "MIN");
                  }}
                />
                ถึง
                <Input
                  className="w-[100px]"
                  value={max}
                  max={100}
                  onChange={(e) => {
                    const newValue = parseInt(e.target.value, 10);
                    handleGradeSettingChange(grade, newValue, "MAX");
                  }}
                />
                คะแนน
              </div>
            </div>
          ))}
        </form>
      </CardContent>

      <CardFooter className="flex justify-end mt-4">
        <Button>
          <SaveIcon />
          บันทึก
        </Button>
      </CardFooter>
    </Card>
  );
}
