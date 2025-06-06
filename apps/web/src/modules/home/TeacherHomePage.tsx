import Loader from "@/components/Loader";
import { PageTitleSubtitle } from "@/components/PageTitleSubtitle";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "@/config/api";
import { useAuthContext } from "@/contexts/AuthContext";
import { withAuth } from "@/hocs/withAuth";
import { useQuery } from "@tanstack/react-query";
import { ChevronRightIcon } from "lucide-react";
import { useMemo } from "react";
import { Link } from "react-router";

function TeacherHomePage() {
  const { authUser } = useAuthContext();
  const curriculumId = authUser?.teacher?.affiliatedCurriculum.id || "";

  const { data: coursesResponse, isLoading: isLoadingCourses } = useQuery({
    queryKey: ["courses", "curriculums", curriculumId],
    queryFn: () => api.courses.curriculums({ curriculumId }).get(),
  });

  const teacherCourses = useMemo(() => {
    if (!coursesResponse?.data?.data?.courses) {
      return [];
    }

    return coursesResponse.data.data.courses.filter((course) =>
      course.teachers.some((teacher) => teacher.userId === authUser?.id)
    );
  }, [coursesResponse, authUser?.id]);

  if (isLoadingCourses) {
    return <Loader />;
  }

  return (
    <>
      <Card className="mb-7 shadow-xs">
        <CardHeader>
          <CardTitle>
            {authUser?.nameTitle + " " + authUser?.firstName + " " + authUser?.lastName}
          </CardTitle>
          <CardDescription>
            อาจารย์ประจำหลักสูตร{authUser?.teacher?.affiliatedCurriculum.degreeName} / สาขา
            {authUser?.teacher?.affiliatedCurriculum.programName} / คณะ
            {authUser?.teacher?.affiliatedCurriculum.faculty.name} / มหาวิทยาลัย
            {authUser?.teacher?.affiliatedCurriculum.faculty.university.name}
          </CardDescription>
        </CardHeader>
      </Card>

      <PageTitleSubtitle
        title="รายวิชาที่สอน"
        subtitle="รายวิชาที่คุณเปิดสอนในเทอมและปีการศึกษานี้ภายในระบบ Skill Transcript"
      />

      <div className="mt-7 md:grid-cols-2 lg:grid grid-cols-3">
        {teacherCourses.map((course) => (
          <Card>
            <CardHeader>
              <CardTitle>
                {course.courseCode} - {course.nameTh}
              </CardTitle>
              <CardDescription>{course.nameEn}</CardDescription>
            </CardHeader>

            <CardContent>
              <p className="text-sm">{course.descriptionTh}</p>
            </CardContent>

            <CardFooter>
              <Link to={`/courses/${course.id}/grading`} className="w-full">
                <Button className="w-full" variant={"outline"}>
                  ผลการเรียน / ตัดเกรด <ChevronRightIcon />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}

const ProtectedTeacherHomePage = withAuth(TeacherHomePage, {
  allowedRoles: ["TEACHER"],
});

export default ProtectedTeacherHomePage;
