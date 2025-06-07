import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { CourseDetailSchema } from "../../../../../../api/src/schemas/courses.schema";
import type { CloType } from "../../../../../../api/src/config/prisma";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CircleIcon } from "lucide-react";

interface CloDetailsTabContentProps {
  course: CourseDetailSchema;
}

export function getCloTypeLabel(type: CloType) {
  switch (type) {
    case "K":
      return "ด้านความรู้ (K - Knowledge)";
    case "S":
      return "ด้านทักษะ (S - Skill)";
    case "A":
      return "ด้านคุณลักษณะ (A - Attitude)";
    default:
      return "ไม่ระบุ";
  }
}

export function CloDetailsTabContent({ course }: CloDetailsTabContentProps) {
  const { clos, skills } = course;

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardContent>
          <div className="flex flex-col gap-1">
            <p className="font-bold">ผลลัพธ์การเรียนรู้ (CLOs)</p>

            {clos.map(({ clo, index }) => (
              <div
                className="rounded-xl border p-4 flex flex-row items-center justify-between gap-1 mt-4"
                key={clo.id}
              >
                <div className="flex flex-row gap-2">
                  <p className="font-bold">CLO {index + 1}</p>
                  <p>{clo.name}</p>
                </div>

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
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <div className="flex flex-col gap-1">
            <p className="font-bold">ทักษะ (Skills)</p>

            {skills.map((skill) => (
              <div
                className="rounded-xl border p-4 flex flex-row items-center justify-between gap-1 mt-4"
                key={skill.id}
              >
                <div className="flex flex-col gap-1 w-full">
                  <p className="font-bold">
                    ทักษะ: {skill.nameTh} ({skill.nameEn})
                  </p>
                  <p>{skill.descriptionTh}</p>

                  <div className="mt-2 w-full">
                    <Accordion type="single" collapsible className="w-full">
                      {skill.skillLevels.map((skillLevel) => (
                        <AccordionItem value={skillLevel.id} className="w-full" key={skillLevel.id}>
                          <AccordionTrigger className="text-md font-bold bg-muted-foreground/5 px-4">
                            ระดับ {skillLevel.level}
                          </AccordionTrigger>
                          <AccordionContent className="flex flex-col gap-2 p-4 py-6 text-base text-balance w-full">
                            {skillLevel.criterias.map((criteria, index) => (
                              <div className="flex flex-col gap-2" key={criteria.id}>
                                <p className="font-semibold">
                                  เกณท์ {skillLevel.level}.{index + 1} {criteria.criteriaNameTh}
                                </p>

                                <div>
                                  {criteria.cloSkillLevelCriterias.map(({ clo }) => {
                                    const cloIndex =
                                      clos.find((c) => c.clo.id === clo.id)?.index ?? 0;
                                    return (
                                      <div className="flex items-center gap-2">
                                        <CircleIcon size={6} className="bg-black rounded-full" />
                                        <p>
                                          CLO {cloIndex + 1} {clo.name}
                                        </p>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            ))}
                          </AccordionContent>
                        </AccordionItem>
                      ))}

                      {/* <AccordionItem value="item-2">
                        <AccordionTrigger>Shipping Details</AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-4 text-balance">
                          <p>
                            We offer worldwide shipping through trusted courier partners. Standard
                            delivery takes 3-5 business days, while express shipping ensures
                            delivery within 1-2 business days.
                          </p>
                          <p>
                            All orders are carefully packaged and fully insured. Track your shipment
                            in real-time through our dedicated tracking portal.
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-3">
                        <AccordionTrigger>Return Policy</AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-4 text-balance">
                          <p>
                            We stand behind our products with a comprehensive 30-day return policy.
                            If you&apos;re not completely satisfied, simply return the item in its
                            original condition.
                          </p>
                          <p>
                            Our hassle-free return process includes free return shipping and full
                            refunds processed within 48 hours of receiving the returned item.
                          </p>
                        </AccordionContent>
                      </AccordionItem> */}
                    </Accordion>
                  </div>
                  {/* 
                  {skill.skillLevels.map((skillLevel, index) => (
                    <p className="mt-2" key={skillLevel.id}>
                      <span className="font-bold">เกณฑ์ที่ {index + 1}:</span>{" "}
                    </p>
                  ))} */}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
