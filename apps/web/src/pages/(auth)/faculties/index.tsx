import { PageTitleSubtitle } from "@/components/PageTitleSubtitle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ChevronRightIcon } from "lucide-react";
import { Link } from "react-router";

export default function AuthFacultiesPage() {
  return (
    <>
      <PageTitleSubtitle title="คณะ" subtitle="คณะทั้งหมดภายในระบบ Skill Transcript" />

      <div className="grid grid-cols-4">
        <Card className="mt-7 pt-0 rounded-xl">
          <CardHeader className="p-0">
            <img src="https://picsum.photos/1920/1080" className="rounded-t-xl" />
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold">คณะเทคโนโลยีสารสนเทศ</p>
            <Link to={`/faculties/1/curriculums`}>
              <Button className="w-full mt-6" variant={"outline"}>
                หลักสูตร <ChevronRightIcon />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
