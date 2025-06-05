import { PageTitleSubtitle } from "@/components/PageTitleSubtitle";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

function AuthCoursesPage() {
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
              <BreadcrumbLink href="/faculties/1/curriculums">คณะเทคโนโลยีสารสนเทศ</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>หลักสูตร X</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex items-center justify-between">
        <PageTitleSubtitle title="รายวิชา" subtitle="รายวิชาทั้งหมดภายในระบบ Skill Transcript" />
        <Link to={"/auth/courses/assign"}>
          <Button>มอบหมายอาจารย์</Button>
        </Link>
      </div>

      <Table className="my-7">
        <TableCaption>รายวิชาและอาจารย์ผู้สอน</TableCaption>
        <TableHeader>
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
          {/* {[].map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="font-medium">{invoice.invoice}</TableCell>
            <TableCell>{invoice.paymentStatus}</TableCell>
            <TableCell>{invoice.paymentMethod}</TableCell>
            <TableCell className="text-right">{invoice.totalAmount}</TableCell>
          </TableRow>
        ))} */}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
}

export default AuthCoursesPage;
