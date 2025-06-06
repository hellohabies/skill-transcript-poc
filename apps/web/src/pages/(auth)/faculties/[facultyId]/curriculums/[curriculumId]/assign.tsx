import { PageTitleSubtitle } from "@/components/PageTitleSubtitle";
import { Button } from "@/components/ui/button";
import { Link, useNavigate, useParams } from "react-router";
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
import { useCallback, useMemo, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Check, ChevronsUpDown, Loader2Icon, SearchIcon } from "lucide-react";
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
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "@/config/api";
import type { CreateCourseRequestSchema } from "../../../../../../../../api/src/schemas/courses.schema";
import { toast } from "sonner";

function AuthCurriculumAssign() {
  const navigate = useNavigate();
  const { facultyId, curriculumId } = useParams();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: CreateCourseRequestSchema) => api.courses.post(data),
  });

  const { data: curriculumTeachersRes, isLoading: isLoadingTeachers } = useQuery({
    queryKey: ["users", "teachers", "curriculum", curriculumId],
    queryFn: () => api.users.teachers.curriculum({ curriculumId: curriculumId || "" }).get(),
  });

  const [courseId, setCourseId] = useState("");

  const [courseNameTh, setCourseNameTh] = useState("");
  const [courseNameEn, setCourseNameEn] = useState("");
  const [courseDescriptionTh, setCourseDescriptionTh] = useState("");
  const [courseDescriptionEn, setCourseDescriptionEn] = useState("");

  const [open, setOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [isLoadingCourseData, setIsLoadingCourseData] = useState(false);

  const { selectedCurriculum, selectedFaculty, isLoadingFaculties } = useFaculties({
    facultiesId: facultyId || "",
    curriculumsId: curriculumId || "",
  });

  const teachers = useMemo(() => {
    if (isLoadingTeachers) return [];
    if (!curriculumTeachersRes?.data?.data) return [];

    return (
      curriculumTeachersRes?.data?.data.map((teacher) => ({
        label: `${teacher.firstName} ${teacher.lastName} - ${teacher.email}`,
        value: teacher.teacher?.id || "",
      })) || []
    );
  }, [curriculumTeachersRes, isLoadingTeachers]);

  const handleCreateCourse = useCallback(async () => {
    try {
      const { error } = await mutateAsync({
        courseCode: courseId,
        nameTh: courseNameTh,
        nameEn: courseNameEn,
        descriptionTh: courseDescriptionTh,
        descriptionEn: courseDescriptionEn,
        teacherId: selectedTeacher,
        curriculumId: selectedCurriculum?.id || "",
      });

      if (error) {
        toast.error("เกิดข้อผิดพลาดในการสร้างรายวิชา", {
          description: (error.value as { error: { message: string } }).error.message,
        });
        return;
      }

      toast.success("สร้างรายวิชาเรียบร้อยแล้ว", {
        description: "คุณได้สร้างรายวิชาใหม่เรียบร้อยแล้ว",
      });

      navigate(`/faculties/${facultyId}/curriculums/${curriculumId}`);
    } catch (error) {
      console.error(error);
    }
  }, [
    courseId,
    courseNameTh,
    courseNameEn,
    courseDescriptionTh,
    courseDescriptionEn,
    selectedTeacher,
    selectedCurriculum?.id,
    mutateAsync,
    navigate,
    facultyId,
    curriculumId,
  ]);

  if (isLoadingFaculties || isLoadingTeachers) {
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
            <Button variant={"secondary"} disabled={isPending}>
              ยกเลิก
            </Button>
          </Link>

          <Button onClick={handleCreateCourse} disabled={isPending}>
            {isPending && <Loader2Icon className="animate-spin" />} ยืนยัน
          </Button>
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
                  disabled={isPending}
                />

                <Button className="self-end">
                  {isLoadingCourseData ? <Loader2Icon className="animate-spin" /> : <SearchIcon />}
                  โหลดข้อมูล
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
                disabled={isPending}
              />

              <InputWithLabel
                type="text"
                label="ชื่อวิชา (ภาษาอังกฤษ)"
                id="courseNameEn"
                value={courseNameEn}
                onValueChange={setCourseNameEn}
                disabled={isPending}
              />

              <InputWithLabel
                inputType="textarea"
                label="คำอธิบายรายวิชา (ภาษาไทย)"
                id="courseDescriptionTh"
                value={courseDescriptionTh}
                onValueChange={setCourseDescriptionTh}
                disabled={isPending}
              />

              <InputWithLabel
                inputType="textarea"
                label="คำอธิบายรายวิชา (ภาษาอังกฤษ)"
                id="courseDescriptionEn"
                value={courseDescriptionEn}
                onValueChange={setCourseDescriptionEn}
                disabled={isPending}
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
                    disabled={isPending}
                  >
                    {teachers
                      ? teachers.find((option) => option.value === selectedTeacher)?.label
                      : "เลือกอาจารย์ผู้สอน"}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-full  self-start p-0">
                  <Command>
                    <CommandInput placeholder="ค้นหาอาจารย์ผู้สอน" className="h-9" />
                    <CommandList>
                      <CommandEmpty>ไม่พบข้อมูล</CommandEmpty>
                      <CommandGroup>
                        {teachers.map((option) => (
                          <CommandItem
                            disabled={isPending}
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
