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
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ChevronRightIcon } from "lucide-react";
import { Link } from "react-router";

export default function AuthCurriculumsPage() {
  return (
    <>
      <div className="mb-7">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/faculties">คณะ</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>คณะเทคโนโลยีสารสนเทศ</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <PageTitleSubtitle title="หลักสูตร" subtitle="หลักสูตรภายในคณะ ...." />

      <div className="grid grid-cols-4">
        <Card className="mt-7 pt-0 rounded-xl">
          <CardHeader className="p-0">
            <img src="https://picsum.photos/1920/1080" className="rounded-t-xl" />
          </CardHeader>
          <CardContent>
            <div>
              <p className="text-muted-foreground font-medium">วิทยาศาสตร์บันฑิฒ</p>
              <p className="text-xl font-bold mt-1">วิทยาการข้อมูลและการวิเคราห์ทางธุรกิจ</p>
            </div>

            <Link to={`/faculties/1/curriculums/1`}>
              <Button className="w-full mt-6" variant={"outline"}>
                รายวิชา <ChevronRightIcon />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
