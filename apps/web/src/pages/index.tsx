import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthContext } from "@/contexts/AuthContext";
import { useState } from "react";

function HomePage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn, authUser, authUserRole } = useAuthContext();

  if (authUser) {
    if (authUserRole === "ADMIN") {
      window.location.href = "/courses";
    }

    if (authUserRole === "STUDENT" || authUserRole === "TEACHER") {
      window.location.href = "/home";
    }
  }

  return (
    <div
      className={cn("flex flex-col gap-6 h-dvh items-center justify-center bg-muted-foreground/20")}
    >
      <Card className="w-lg">
        <CardHeader>
          <CardTitle>เข้าสู่ระบบ</CardTitle>
          <CardDescription>เข้าสู่ระบบด้วยอีเมลและรหัสผ่าน</CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">อีเมล</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="user@skill-transcript.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">รหัสผ่าน</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => {
                    e.preventDefault();
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button onClick={() => signIn({ email, password })} className="w-full">
                  Login
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default HomePage;
