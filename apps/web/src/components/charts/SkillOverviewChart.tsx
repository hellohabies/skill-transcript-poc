"use client";

import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { StudentSkillsResponse } from "../../../../api/src/schemas/student.schema";
import { useMemo } from "react";

const chartConfig = {
  level: {
    label: "ระดับ",
    color: "hsla(21 96% 45% / 0.8)",
  },
} satisfies ChartConfig;

interface SkillOverviewChartProps {
  studentSkills: StudentSkillsResponse;
}

export default function SkillOverviewChart({ studentSkills }: SkillOverviewChartProps) {
  const chartData = useMemo(
    () =>
      studentSkills.skillsWithLevels.map((swl) => ({
        skillName: swl.nameEn,
        level: swl.finalLevel,
      })),
    [studentSkills.skillsWithLevels]
  );

  return (
    <Card className="shadow-sm">
      <CardHeader className="items-center pb-4">
        <CardTitle>ภาพรวม Skills ของคุณ</CardTitle>
        <CardDescription>แสดงผลการเรียนของคุณในแต่ละรายวิชาที่ลงทะเบียนเรียน</CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer config={chartConfig} className="mx-auto max-h-[300px]">
          <RadarChart data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="skillName" />
            <PolarGrid />
            <PolarRadiusAxis domain={[0, 3]} tick={false} tickCount={3} className="hidden" />
            <Radar dataKey="level" fill="hsla(21 96% 45% / 0.8)" fillOpacity={0.6} />
          </RadarChart>
        </ChartContainer>
      </CardContent>

      {/* <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="flex items-center gap-2 leading-none text-muted-foreground">
          January - June 2024
        </div>
      </CardFooter> */}
    </Card>
  );
}
