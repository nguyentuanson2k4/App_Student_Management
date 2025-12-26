import React from "react";
import { Card } from "./ui/card";
import { BookOpen } from "lucide-react";

const SubjectEmptyState = () => {
  return (
    <Card className="p-8 text-center border-0 bg-gradient-card shadow-custom-md">
      <div className="space-y-3">
        {/* Đổi icon Circle thành BookOpen để phù hợp với môn học */}
        <BookOpen className="mx-auto size-12 text-muted-foreground opacity-50" />
        <div>
          <h3 className="font-medium text-foreground">
            {"Chưa có môn học nào."}
          </h3>

          <p className="text-sm text-muted-foreground">
            Vui lòng thêm môn học mới để bắt đầu quản lý chương trình đào tạo.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default SubjectEmptyState;