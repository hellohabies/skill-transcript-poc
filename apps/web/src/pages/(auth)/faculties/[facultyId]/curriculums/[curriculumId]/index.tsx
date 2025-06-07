import { PageTitleSubtitle } from "@/components/PageTitleSubtitle";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { useQuery } from "@tanstack/react-query";
import { api } from "@/config/api";
import { useMemo } from "react";

function AuthCoursesPage() {
  const { facultyId, curriculumId } = useParams();

  const { data: curriculumTeachersRes, isLoading: isLoadingTeachers } = useQuery({
    queryKey: ["courses", "curriculum", curriculumId],
    queryFn: () => api.courses.curriculums({ curriculumId: curriculumId || "" }).get(),
  });

  const teacherCourses = useMemo(() => {
    return curriculumTeachersRes?.data?.data.courses || [];
  }, [curriculumTeachersRes]);

  const { selectedCurriculum, selectedFaculty, isLoadingFaculties } = useFaculties({
    facultiesId: facultyId || "",
    curriculumsId: curriculumId || "",
  });

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
              <BreadcrumbPage>{selectedCurriculum?.programName}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex items-center justify-between">
        <PageTitleSubtitle title="รายวิชา" subtitle="รายวิชาทั้งหมดภายในระบบ Skill Transcript" />
        <Link to={`/faculties/${facultyId}/curriculums/${curriculumId}/assign`}>
          <Button>มอบหมายอาจารย์</Button>
        </Link>
      </div>

      <Table className="my-7">
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead>คณะ</TableHead>
            <TableHead>หลักสูตร</TableHead>
            <TableHead>รหัสวิชา</TableHead>
            <TableHead className="max-w-[100px]">ชื่อวิชา (ไทย)</TableHead>
            <TableHead className="max-w-[100px]">ชื่อวิชา (Eng)</TableHead>
            <TableHead>อาจารย์ผู้สอน</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teacherCourses.map((course) => (
            <TableRow key={course.id}>
              <TableCell className="font-medium">{selectedFaculty?.name}</TableCell>
              <TableCell>{selectedCurriculum?.programName}</TableCell>
              <TableCell>{course.courseCode}</TableCell>
              <TableCell className="text-wrap">{course.nameTh}</TableCell>
              <TableCell className="text-wrap">{course.nameEn}</TableCell>
              <TableCell>
                {course.teachers[0].user.nameTitle +
                  " " +
                  course.teachers[0].user.firstName +
                  " " +
                  course.teachers[0].user.lastName}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default AuthCoursesPage;
