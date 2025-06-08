import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Badge } from "../ui/badge";
import { CircleCheckIcon, CircleDashedIcon } from "lucide-react";

interface SkillLevelOverviewChartProps {}

export function SkillLevelOverviewChart({}: SkillLevelOverviewChartProps) {
  return (
    <Card className="shadow-sm">
      <CardHeader className="items-center ">
        <CardTitle>ภาพรวมทักษะและระดับทั้งหมด</CardTitle>
        <CardDescription>แสดงผลการเรียนของคุณในแต่ละทักษะและระดับที่คุณได้เรียนรู้</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion
          type="single"
          collapsible
          className="w-full flex flex-col gap-2"
          defaultValue="item-1"
        >
          <AccordionItem value="item-1" className="border rounded-xl px-4">
            <AccordionTrigger className="w-full">
              <div className="flex items-center gap-2 justify-start w-full">
                <Badge className="bg-green-100 text-green-800 rounded-full font-bold">ทักษะ</Badge>
                <p className="font-bold">Coding</p>
              </div>

              <div className="flex items-center gap-2 justify-end w-full">
                <Badge className="rounded-full bg-orange-100 text-orange-800 font-bold">
                  ระดับ 1/3
                </Badge>
                <p>(1 วิชา)</p>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-1 flex flex-col gap-4">
              <p className="font-semibold">ระดับทักษะรายวิชา</p>

              <div className=" flex flex-col gap-2">
                <div className="bg-muted-foreground/5 rounded-xl p-3 px-2 flex flex-row justify-between">
                  <div className="flex items-center gap-2">
                    <p className="font-bold">CS201</p>
                    <p>Introduction to Artificial Intelligence</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-[#e35205] border rounded-full"></div>
                      <div className="w-3 h-3 bg-[#e35205] border rounded-full"></div>
                      <div className="w-3 h-3 bg-[#e35205] border rounded-full"></div>
                      <div className="w-3 h-3 bg-[#e35205] border rounded-full"></div>
                      <div className="w-3 h-3 bg-[#e3520540] border rounded-full"></div>
                      <div className="w-3 h-3 bg-[#e3520540] border rounded-full"></div>
                    </div>

                    <Badge className="rounded-full bg-orange-100 text-orange-800 font-bold">
                      ระดับ 4/6
                    </Badge>
                  </div>
                </div>

                <div className="bg-muted-foreground/5 rounded-xl p-3 px-2 flex flex-row justify-between">
                  <div className="flex items-center gap-2">
                    <p className="font-bold">CS201</p>
                    <p>Computer Programming</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-[#e35205] border rounded-full"></div>
                      <div className="w-3 h-3 bg-[#e35205] border rounded-full"></div>
                      <div className="w-3 h-3 bg-[#e35205] border rounded-full"></div>
                      <div className="w-3 h-3 bg-[#e3520540] border rounded-full"></div>
                      <div className="w-3 h-3 bg-[#e3520540] border rounded-full"></div>
                      <div className="w-3 h-3 bg-[#e3520540] border rounded-full"></div>
                    </div>

                    <Badge className="rounded-full bg-orange-100 text-orange-800 font-bold">
                      ระดับ 3/6
                    </Badge>
                  </div>
                </div>
              </div>

              <p className="font-semibold">เกณฑ์การประเมิน</p>

              <Accordion
                type="single"
                collapsible
                className="w-full flex flex-col gap-2"
                defaultValue="item-1"
              >
                <AccordionItem value="item-1" className="border rounded-xl px-4">
                  <AccordionTrigger className="w-full">
                    <div className="flex items-center gap-3 justify-start w-full">
                      <CircleCheckIcon size={20} color="#00a63e" strokeWidth={3} />

                      <div>
                        <p className="font-bold">ระดับที่ 1</p>
                        <p className="text-green-600 font-semibold">
                          ระดับขอบคุณ - คลิกเพื่อดูรายละเอียด
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent className="px-1 flex flex-col gap-4">
                    <div>
                      <p className="font-semibold">เกณท์ 1.1 เข้าใจแนวคิดพื้นฐานของทักษะ</p>
                      <div className="mt-2">
                        <div className="flex items-center gap-2">
                          <CircleCheckIcon size={16} color="#00a63e" strokeWidth={3} />
                          <p>CLO 4 สามารถประยุกต์ใช้ปัญญาประดิษฐ์ในการแก้ปัญหาได้</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="font-semibold">เกณท์ 1.1 เข้าใจแนวคิดพื้นฐานของทักษะ</p>
                      <div className="mt-2">
                        <div className="flex items-center gap-2">
                          <CircleCheckIcon size={16} color="#00a63e" strokeWidth={3} />
                          <p>CLO 4 สามารถประยุกต์ใช้ปัญญาประดิษฐ์ในการแก้ปัญหาได้</p>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2" className="border rounded-xl px-4">
                  <AccordionTrigger className="w-full">
                    <div className="flex items-center gap-3 justify-start w-full">
                      <CircleDashedIcon size={20} strokeWidth={3} />

                      <div>
                        <p className="font-bold">ระดับที่ 2</p>
                      </div>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent className="px-1 flex flex-col gap-4"></AccordionContent>
                </AccordionItem>
                <div></div>
              </Accordion>
            </AccordionContent>
          </AccordionItem>

          <div></div>
        </Accordion>
      </CardContent>
    </Card>
  );
}
