import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SaveIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import type { CourseDetailSchema } from "../../../../../../api/src/schemas/courses.schema";
import type { CloType, Grade } from "../../../../../../api/src/config/prisma";
import { getCloTypeLabel } from "./CloDetailsTabContent";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { api } from "@/config/api";
import type { CloWeightSettingsRequestSchema } from "../../../../../../api/src/schemas/gradings.schema";

interface SettingTabContentProps {
  course: CourseDetailSchema;
}

export type CloWeightSettingsForm = {
  [cloId: string]: {
    cloIndex: number;
    cloName: string;
    cloType: string;
    id: string;
    weight: number;
  };
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

    const initialCloWeights = course.clos.reduce((acc, courseClo) => {
      acc[courseClo.cloWeights?.id || ""] = {
        cloIndex: courseClo.index,
        cloName: courseClo.clo.name,
        cloType: courseClo.clo.type,
        id: courseClo.cloWeights?.id || "",
        weight: courseClo.cloWeights?.weight || 0,
      };
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
    const cloWeightId = e.target.name;
    let newWeight = parseInt(e.target.value, 10);

    if (isNaN(newWeight) || newWeight < 0 || newWeight > 100) newWeight = 0;

    const newWeightSum = Object.values({
      ...cloWeightSettings,
      [cloWeightId]: { ...cloWeightSettings[cloWeightId], weight: newWeight },
    }).reduce((sum, cloWeightSetting) => sum + cloWeightSetting.weight, 0);

    if (newWeightSum > 100) {
      alert("สัดส่วนรวมไม่สามารถเกิน 100% ได้");
      newWeight = 0;

      setCloWeightSettings((prev) => ({
        ...prev,
        [cloWeightId]: { ...prev[cloWeightId], weight: newWeight },
      }));

      return;
    }

    setCloWeightSettings((prev) => ({
      ...prev,
      [cloWeightId]: { ...prev[cloWeightId], weight: newWeight },
    }));

    setWeightSum(newWeightSum);
  };

  const handleSave = useCallback(async () => {
    console.log("gradeSettings", gradeSettings);
    console.log("cloWeightSettings", cloWeightSettings);

    try {
      const updateData: CloWeightSettingsRequestSchema = Object.entries(cloWeightSettings).map(
        ([cloWeightSettingId, cloWeightSetting]) => ({
          courseCloWeightId: cloWeightSettingId,
          weight: cloWeightSetting.weight,
        })
      );

      const { data: cloWeightUpdateResponse, error: cloWeightUpdateError } =
        await api.gradings.settings["clo-weights"].put(updateData);

      if (cloWeightUpdateError && cloWeightUpdateError.value) {
        toast.error("ไม่สามารถบันทึกการตั้งค่าได้ กรุณาลองใหม่อีกครั้ง", {
          description: (cloWeightUpdateError.value as { error: { message: string } }).error.message,
        });
        return;
      }

      const gradingCriteria = Object.entries(gradeSettings).map(([, { min, max, id }]) => ({
        courseGradingCriteriaId: id,
        minScore: min,
        maxScore: max,
      }));

      const { data: gradingCrtieriaUpdateResponse, error: gradingCriteriaUpdateError } =
        await api.gradings.settings["grade-criteria"].put(gradingCriteria);

      if (gradingCriteriaUpdateError && gradingCriteriaUpdateError.value) {
        toast.error("ไม่สามารถบันทึกเกณฑ์การตัดเกรดได้ กรุณาลองใหม่อีกครั้ง", {
          description: (gradingCriteriaUpdateError.value as { error: { message: string } }).error
            .message,
        });
        return;
      }

      if (!cloWeightUpdateResponse || !gradingCrtieriaUpdateResponse) {
        toast.error("ไม่สามารถบันทึกการตั้งค่าได้ กรุณาลองใหม่อีกครั้ง");
        return;
      }

      toast.success("บันทึกการตั้งค่าเรียบร้อยแล้ว");

      window.location.reload();
    } catch (err) {
      console.error("Error saving settings:", err);
    }
  }, [gradeSettings, cloWeightSettings]);

  const handleApplyDefaultValue = useCallback(() => {
    const defaultCloWeights = Object.entries(cloWeightSettings).reduce(
      (acc, [cloWeightSettingId, cloWeightSetting]) => {
        acc[cloWeightSettingId] = {
          ...cloWeightSetting,
          weight: 20,
        };
        return acc;
      },
      {} as CloWeightSettingsForm
    );

    setCloWeightSettings(defaultCloWeights);
    setGradeSettings((prev) => ({
      ...prev,
      A: { min: 80, max: 100, id: prev.A?.id || "" },
      "B+": { min: 75, max: 79, id: prev["B+"]?.id || "" },
      B: { min: 70, max: 74, id: prev.B?.id || "" },
      "C+": { min: 65, max: 69, id: prev["C+"]?.id || "" },
      C: { min: 60, max: 64, id: prev.C?.id || "" },
      "D+": { min: 55, max: 59, id: prev["D+"]?.id || "" },
      D: { min: 50, max: 54, id: prev.D?.id || "" },
      F: { min: 0, max: 49, id: prev.F?.id || "" },
    }));
    setWeightSum(100);
  }, [cloWeightSettings]);

  return (
    <Card>
      <CardContent>
        <p className="font-bold">สัดส่วนการคิดคะแนน</p>
        <form className="flex flex-col gap-6 mt-4">
          {Object.entries(cloWeightSettings).map(([cloWeightSettingId, cloWeightSetting]) => (
            <div className="flex items-center justify-between gap-10" key={cloWeightSettingId}>
              <div className="flex items-center gap-6 w-full">
                <p className="w-[70%]">
                  <span className="font-bold">CLO {cloWeightSetting.cloIndex + 1}</span>{" "}
                  {cloWeightSetting.cloName}
                </p>

                <div className="w-[30%] flex justify-end">
                  <Badge
                    className={cn("text-sm px-4 rounded-full", {
                      "bg-blue-100 text-blue-800": cloWeightSetting.cloType === "K",
                      "bg-green-100 text-green-800": cloWeightSetting.cloType === "S",
                      "bg-yellow-100 text-yellow-800": cloWeightSetting.cloType === "A",
                      "bg-gray-100 text-gray-800": !cloWeightSetting.cloType,
                    })}
                  >
                    {getCloTypeLabel(cloWeightSetting.cloType as CloType)}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <p>สัดส่วน</p>
                <Input
                  className="w-[200px]"
                  name={cloWeightSettingId}
                  value={cloWeightSettings[cloWeightSettingId].weight}
                  onChange={handleOnCloWeightChange}
                />
                <p>%</p>
              </div>
            </div>
          ))}
        </form>

        <div className="flex items-center justify-end gap-4 mt-8">
          <p>รวม</p>
          <Input className={cn("w-[200px]")} value={weightSum} readOnly />
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

      <CardFooter className="flex justify-end mt-4 gap-4">
        <Button variant="outline" onClick={handleApplyDefaultValue}>
          ใช้ค่าเริ่มต้น
        </Button>
        <Button onClick={handleSave}>
          <SaveIcon />
          บันทึก
        </Button>
      </CardFooter>
    </Card>
  );
}
