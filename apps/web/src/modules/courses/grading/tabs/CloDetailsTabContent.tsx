import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export function CloDetailsTabContent() {
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardContent>
          <div className="flex flex-col gap-1">
            <p className="font-bold">ผลลัพธ์การเรียนรู้ (CLOs)</p>

            <div className="rounded-xl border p-4 flex flex-row items-center justify-between gap-1 mt-4">
              <div className="flex flex-col gap-1">
                <p className="font-bold">ผลลัพธ์ที่ 1</p>
                <p>อธิบายพัฒนาการองค์รวม และพฤติกรรมการเรียนรู้เด็กปฐมวัยได้ถูกต้อง</p>
              </div>

              <Badge className="text-sm px-4 rounded-full">ด้านความรู้ (K - Knowledge)</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <div className="flex flex-col gap-1">
            <p className="font-bold">ทักษะ (Skills)</p>

            <div className="rounded-xl border p-4 flex flex-row items-center justify-between gap-1 mt-4">
              <div className="flex flex-col gap-1">
                <p className="font-bold">
                  ทักษะ: Organize activities to promote Early childhood development (Lv.1)
                </p>
                <p>อธิบายพัฒนาการองค์รวม และพฤติกรรมการเรียนรู้เด็กปฐมวัยได้ถูกต้อง</p>

                <p className="mt-2">
                  <span className="font-bold">เกณฑ์ที่ 1:</span>{" "}
                  จัดกิจกรรมส่งเสริมพัฒนาการเด็กปฐมวัยได้เหมาะสมกับวัย
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
