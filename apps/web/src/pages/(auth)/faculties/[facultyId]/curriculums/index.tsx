import Loader from "@/components/Loader";
import { PageTitleSubtitle } from "@/components/PageTitleSubtitle";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useFaculties } from "@/hooks/query/faculties/useFaculties";
import { ChevronRightIcon } from "lucide-react";
import { Link, useParams } from "react-router";

export default function AuthCurriculumsPage() {
  const { facultyId } = useParams();

  const { curriculums, selectedFaculty, isLoadingFaculties } = useFaculties({
    facultiesId: facultyId || "",
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
              <BreadcrumbPage>{selectedFaculty?.name || ""}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <PageTitleSubtitle title="หลักสูตร" subtitle={`หลักสูตรภายในคณะ${selectedFaculty?.name}`} />

      <div className="grid grid-cols-4 mt-7 gap-6">
        {curriculums?.map((curriculum) => (
          <Card className=" pt-0 rounded-xl">
            <CardHeader className="p-0">
              <img
                src="https://picsum.photos/200/300"
                className="rounded-t-xl h-[125px] w-full object-cover"
              />
            </CardHeader>
            <CardContent className="h-full">
              <div>
                <p className="text-muted-foreground font-medium">{curriculum.degreeName}</p>
                <p className="text-xl font-bold mt-1">{curriculum.programName}</p>
              </div>
            </CardContent>

            <CardFooter>
              <Link
                to={`/faculties/${curriculum.facultyId}/curriculums/${curriculum.id}`}
                className="w-full"
              >
                <Button className="w-full mt-6" variant={"outline"}>
                  รายวิชา <ChevronRightIcon />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
