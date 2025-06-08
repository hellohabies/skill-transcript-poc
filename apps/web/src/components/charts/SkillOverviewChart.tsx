"use client";

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "Coding", level: 186 },
  { month: "AI", level: 305 },
  { month: "Leadership", level: 237 },
  { month: "Presentation", level: 273 },
  { month: "Problem Solving", level: 209 },
  { month: "Digital Literacy", level: 214 },
];

const chartConfig = {
  level: {
    label: "ระดับ",
    color: "hsla(21 96% 45% / 0.8)",
  },
} satisfies ChartConfig;

export default function SkillOverviewChart() {
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
            <PolarAngleAxis dataKey="month" />
            <PolarGrid />
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
