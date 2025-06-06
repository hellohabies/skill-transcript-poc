import { PageTitleSubtitle } from "@/components/PageTitleSubtitle";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useFaculties } from "@/hooks/query/faculties/useFaculties";
import Loader from "@/components/Loader";
import { Card, CardContent } from "@/components/ui/card";
import InputWithLabel from "@/components/input/InputWithLabel";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Check, ChevronsUpDown, SearchIcon } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

function AuthCurriculumAssign() {
  const { facultyId, curriculumId } = useParams();

  const [courseId, setCourseId] = useState("");

  const [courseNameTh, setCourseNameTh] = useState("");
  const [courseNameEn, setCourseNameEn] = useState("");
  const [courseDescriptionTh, setCourseDescriptionTh] = useState("");
  const [courseDescriptionEn, setCourseDescriptionEn] = useState("");

  const [open, setOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [teachers, setTeachers] = useState<
    {
      label: string;
      value: string;
    }[]
  >([]);

  const { selectedCurriculum, selectedFaculty, isLoadingFaculties } = useFaculties({
    facultiesId: facultyId || "",
    curriculumsId: curriculumId || "",
  });

  if (isLoadingFaculties) {
    return <Loader />;
  }

  return (
    <>
      <div className="mb-7">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link to="/faculties">
                <BreadcrumbLink>คณะ</BreadcrumbLink>
              </Link>
            </BreadcrumbItem>

            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <Link to={`/faculties/${selectedFaculty?.id}/curriculums`}>
                <BreadcrumbLink>{selectedFaculty?.name}</BreadcrumbLink>
              </Link>
            </BreadcrumbItem>

            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <Link to={`/faculties/${selectedFaculty?.id}/curriculums/${selectedCurriculum?.id}`}>
                <BreadcrumbLink>{selectedCurriculum?.programName}</BreadcrumbLink>
              </Link>
            </BreadcrumbItem>

            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>มอบหมายอาจารย์</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex items-center justify-between">
        <PageTitleSubtitle title="รายวิชา" subtitle="รายวิชาทั้งหมดภายในระบบ Skill Transcript" />
        <div className="flex items-center gap-4">
          <Link to={`/faculties/${facultyId}/curriculums/${curriculumId}`}>
            <Button variant={"secondary"}>ยกเลิก</Button>
          </Link>

          <Link to={`/faculties/${facultyId}/curriculums/${curriculumId}/assign`}>
            <Button>ยืนยัน</Button>
          </Link>
        </div>
      </div>

      <Card className="mt-7">
        <CardContent className="flex flex-col gap-10">
          <div className="grid grid-cols-2">
            <div>
              <p className="text-lg font-bold">รหัสวิชา</p>
              <p className="text-muted-foreground">
                โปรดกรอกรหัสรายวิชา (รหัสคอร์ส) จากระบบ Skill Mapping
              </p>
              <img src="/skill-mapping-course-id-helper.png" className="mt-4" />
            </div>

            <div className="flex flex-col items-center justify-center">
              <div className="flex flex-row items-center gap-4 w-full max-w-md">
                <InputWithLabel
                  type="text"
                  label="รหัสวิชา (รหัสคอร์ส)"
                  id="courseId"
                  value={courseId}
                  onValueChange={setCourseId}
                />

                <Button className="self-end">
                  <SearchIcon /> โหลดข้อมูล
                </Button>
              </div>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-2">
            <div>
              <p className="text-lg font-bold">ข้อมูลรายวิชา</p>
              <p className="text-muted-foreground">ข้อมูลรายวิชาจากระบบ Skill Mapping</p>
            </div>

            <div className="flex flex-col items-center justify-center gap-8">
              <InputWithLabel
                type="text"
                label="ชื่อวิชา (ภาษาไทย)"
                id="courseNamTh"
                value={courseNameTh}
                onValueChange={setCourseNameTh}
              />

              <InputWithLabel
                type="text"
                label="ชื่อวิชา (ภาษาอังกฤษ)"
                id="courseNameEn"
                value={courseNameEn}
                onValueChange={setCourseNameEn}
              />

              <InputWithLabel
                inputType="textarea"
                label="คำอธิบายรายวิชา (ภาษาไทย)"
                id="courseDescriptionTh"
                value={courseDescriptionTh}
                onValueChange={setCourseDescriptionTh}
              />

              <InputWithLabel
                inputType="textarea"
                label="คำอธิบายรายวิชา (ภาษาอังกฤษ)"
                id="courseDescriptionEn"
                value={courseDescriptionEn}
                onValueChange={setCourseDescriptionEn}
              />
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-2">
            <div>
              <p className="text-lg font-bold">เลือกอาจารย์</p>
              <p className="text-muted-foreground">อาจารย์ที่ต้องการมอบหมายให้สอนในรายวิชานี้</p>
            </div>

            <div className="flex flex-col items-center justify-center gap-8 ">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="justify-between !h-10 max-w-md w-full"
                  >
                    {teachers
                      ? teachers.find((option) => option.value === selectedTeacher)?.label
                      : "เลือกอาจารย์ผู้สอน"}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="min-w-full max-w-md self-start p-0">
                  <Command>
                    <CommandInput placeholder="ค้นหาอาจารย์ผู้สอน" className="h-9" />
                    <CommandList>
                      <CommandEmpty>ไม่พบข้อมูล</CommandEmpty>
                      <CommandGroup>
                        {teachers.map((option) => (
                          <CommandItem
                            key={option.value}
                            value={option.value}
                            onSelect={(currentValue) => {
                              setSelectedTeacher(
                                currentValue === selectedTeacher ? "" : currentValue
                              );
                              setOpen(false);
                            }}
                          >
                            {option.label}
                            <Check
                              className={cn(
                                "ml-auto",
                                selectedTeacher === option.value ? "opacity-100" : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default AuthCurriculumAssign;
