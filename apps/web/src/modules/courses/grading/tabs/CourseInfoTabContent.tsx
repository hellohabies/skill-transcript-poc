import { Card, CardContent } from "@/components/ui/card";

export function CourseInfoTabContent() {
  return (
    <Card>
      <CardContent className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <p className=" font-bold">คำอธิบายรายวิชา (ภาษาไทย)</p>
          <p>
            พัฒนาการและการเรียนรู้เด็กปฐมวัยด้านร่างกาย อารมณ์-จิตใจ สังคม และสติปัญญา
            พฤติกรรมการเรียนรู้เด็กปฐมวัย ปัจจัยที่มีอิทธิพลต่อพัฒนาการและการเรียนรู้เด็กปฐมวัย
            วิธีการอบรมเลี้ยงดู การออกแบบกิจกรรมส่งเสริมพัฒนาการและการเรียนรู้สำหรับเด็กปฐมวัย
            บทบาทของผู้ที่เกี่ยวข้องในการส่งเสริมพัฒนาการและการเรียนรู้สำหรับเด็กปฐมวัย
            งานวิจัยที่เกี่ยวข้อง และฝึกปฏิบัติ
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <p className="font-bold">คำอธิบายรายวิชา (ภาษาอังกฤษ)</p>
          <p>
            Development and learning of young children in physical, emotional, social, and cognitive
            aspects; early childhood learning behavior, factor influencing early childhood
            development and learning, method of nurture, activity design to promote early childhood
            development and learning, role of stakeholder in enhancing early childhood development
            and learning, relevant research, and practice
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
