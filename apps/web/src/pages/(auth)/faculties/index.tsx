import { PageTitleSubtitle } from "@/components/PageTitleSubtitle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useFaculties } from "@/hooks/query/faculties/useFaculties";
import { ChevronRightIcon, Loader } from "lucide-react";
import { Link } from "react-router";

export default function AuthFacultiesPage() {
  const { faculties, isLoadingFaculties } = useFaculties();

  if (isLoadingFaculties) {
    return <Loader />;
  }

  return (
    <>
      <PageTitleSubtitle title="คณะ" subtitle="คณะทั้งหมดภายในระบบ Skill Transcript" />

      <div className="grid grid-cols-4 mt-7 gap-6">
        {faculties?.map((faculty) => (
          <Card className="pt-0 rounded-xl">
            <CardHeader className="p-0">
              <img
                src="https://picsum.photos/200/300"
                className="rounded-t-xl h-[125px] w-full object-cover"
              />
            </CardHeader>
            <CardContent className="h-full">
              <p className="text-xl font-bold">{faculty.name}</p>
            </CardContent>

            <CardFooter>
              <Link to={`/faculties/${faculty.id}/curriculums`} className="w-full">
                <Button className="w-full mt-6" variant={"outline"}>
                  หลักสูตร <ChevronRightIcon />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
