import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SaveIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import type { CourseDetailSchema } from "../../../../../../api/src/schemas/courses.schema";
import type { Grade } from "../../../../../../api/src/config/prisma";
import { getCloTypeLabel } from "./CloDetailsTabContent";
import { cn } from "@/lib/utils";

interface SettingTabContentProps {
  course: CourseDetailSchema;
}

export type CloWeightSettingsForm = {
  [cloId: string]: number;
};

export function gradeEnumMapping(grade: Grade): string {
  switch (grade) {
    case "A":
      return "A";
    case "B_PLUS":
      return "B+";
    case "B":
      return "B";
    case "C_PLUS":
      return "C+";
    case "C":
      return "C";
    case "D_PLUS":
      return "D+";
    case "D":
      return "D";
    case "F":
      return "F";
    default:
      return ""; // Assuming 'X' is the default or unknown grade
  }
}

export function SettingTabContent({ course }: SettingTabContentProps) {
  const [gradeSettings, setGradeSettings] = useState<
    Record<string, { min: number; max: number; id: string }>
  >({});
  const [cloWeightSettings, setCloWeightSettings] = useState<CloWeightSettingsForm>({});
  const [weightSum, setWeightSum] = useState<number>(0);

  useEffect(() => {
    if (!course) return;

    const initialGradeSettings = course.gradingCriterias
      .filter((gc) => gc.grade !== "X")
      .reduce(
        (acc, setting) => {
          acc[gradeEnumMapping(setting.grade)] = {
            min: setting.minScore,
            max: setting.maxScore,
            id: setting.id,
          };
          return acc;
        },
        {} as Record<string, { min: number; max: number; id: string }>
      );

    const initialCloWeights = course.clos.reduce((acc, clo) => {
      acc[clo.cloWeights?.id || ""] = clo.cloWeights?.weight ?? 0;
      return acc;
    }, {} as CloWeightSettingsForm);

    const initialWeightSum = course.clos.reduce((sum, clo) => {
      return sum + (clo.cloWeights?.weight ?? 0);
    }, 0);

    setCloWeightSettings(initialCloWeights);
    setWeightSum(initialWeightSum);

    setGradeSettings(initialGradeSettings);
  }, [course]);

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

  const handleOnCloWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cloId = e.target.name;
    let newWeight = parseInt(e.target.value, 10);

    if (isNaN(newWeight) || newWeight < 0 || newWeight > 100) newWeight = 0;

    const newWeightSum = Object.values({ ...cloWeightSettings, [cloId]: newWeight }).reduce(
      (sum, weight) => sum + weight,
      0
    );

    if (newWeightSum > 100) {
      alert("สัดส่วนรวมไม่สามารถเกิน 100% ได้");
      newWeight = 0;

      setCloWeightSettings((prev) => ({
        ...prev,
        [cloId]: newWeight,
      }));

      return;
    }

    setCloWeightSettings((prev) => ({
      ...prev,
      [cloId]: newWeight,
    }));

    setWeightSum(newWeightSum);
  };

  const handleSave = useCallback(() => {
    console.log("gradeSettings", gradeSettings);
    console.log("cloWeightSettings", cloWeightSettings);
  }, [gradeSettings, cloWeightSettings]);

  return (
    <Card>
      <CardContent>
        <p className="font-bold">สัดส่วนการคิดคะแนน</p>
        <form className="flex flex-col gap-6 mt-4">
          {course.clos.map(({ clo, index }) => (
            <div className="flex items-center justify-between gap-10" key={clo.id}>
              <div className="flex items-center gap-6 w-full">
                <p className="w-[70%]">
                  <span className="font-bold">CLO {index + 1}</span> {clo.name}
                </p>

                <div className="w-[30%] flex justify-end">
                  <Badge
                    className={cn("text-sm px-4 rounded-full", {
                      "bg-blue-100 text-blue-800": clo.type === "K",
                      "bg-green-100 text-green-800": clo.type === "S",
                      "bg-yellow-100 text-yellow-800": clo.type === "A",
                      "bg-gray-100 text-gray-800": !clo.type,
                    })}
                  >
                    {getCloTypeLabel(clo.type)}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <p>สัดส่วน</p>
                <Input
                  className="w-[200px]"
                  name={clo.id}
                  value={cloWeightSettings[clo.id]}
                  onChange={handleOnCloWeightChange}
                />
                <p>%</p>
              </div>
            </div>
          ))}
        </form>

        <div className="flex items-center justify-end gap-4 mt-8">
          <p>รวม</p>
          <Input
            className={cn("w-[200px]", {
              "border-green-500 bg-green-100": weightSum === 100,
            })}
            value={weightSum}
            readOnly
          />
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
        <Button onClick={handleSave}>
          <SaveIcon />
          บันทึก
        </Button>
      </CardFooter>
    </Card>
  );
}
