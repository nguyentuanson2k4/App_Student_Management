import React, { useState } from "react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Calendar, CheckCircle2, Circle, SquarePen, Trash2 } from "lucide-react";
import { Input } from "./ui/input";
import api from "@/lib/axios";
import { toast } from "sonner";
import { useNavigate } from "react-router";

const StudentCard = ({ student, index, handleStudentChanged }) => {
  const [isEditting, setIsEditting] = useState(false);
  const [updateStudentName, setUpdateStudentName] = useState(
    student.name || ""
  );
  const navigate = useNavigate();

  const deleteStudent = async (studentCode) => {
    try {
      await api.delete(`/students/${studentCode}`);
      toast.success("Sinh viên đã xoá.");
      handleStudentChanged();
    } catch (error) {
      console.error("Lỗi xảy ra khi xoá student.", error);
      toast.error("Lỗi xảy ra khi xoá sinh viên.");
    }
  };

  const updateStudent = async () => {
    try {
      setIsEditting(false);
      await api.put(`/students/${student.student_code}`, {
        name: updateStudentName,
      });
      toast.success(`Tên sinh viên đã đổi thành ${updateStudentName}`);
      handleStudentChanged();
    } catch (error) {
      console.error("Lỗi xảy ra khi update student.", error);
      toast.error("Lỗi xảy ra khi cập nhập sinh viên.");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      updateStudent();
    }
  };

  return (
    <Card
      onClick={() => navigate(`/students/${student.student_code}/scores`)}
      className={cn(
        "p-4 bg-gradient-card border-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fade-in group cursor-pointer"
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-center gap-4">
        {/* avatar */}
        <div className="flex-shrink-0">
          {student.avatar_url ? (
            // simple avatar
            // eslint-disable-next-line jsx-a11y/img-redundant-alt
            <img
              src={student.avatar_url}
              alt="avatar"
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <Circle className="size-8 text-muted-foreground" />
          )}
        </div>

        {/* hiển thị hoặc chỉnh sửa tên */}
        <div className="flex-1 min-w-0">
          {isEditting ? (
            <Input
              placeholder="Họ và tên"
              className="flex-1 h-12 text-base border-border/50 focus:border-primary/50 focus:ring-primary/20"
              type="text"
              value={updateStudentName}
              onChange={(e) => setUpdateStudentName(e.target.value)}
              onKeyPress={handleKeyPress}
              onBlur={() => {
                setIsEditting(false);
                setUpdateStudentName(student.name || "");
              }}
            />
          ) : (
            <p className={cn("text-base transition-all duration-200", "text-foreground")}>
              {student.name}
            </p>
          )}

          {/* mã sinh viên & email */}
          <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
            <span>{student.student_code}</span>
            {student.email && <span>• {student.email}</span>}
            {student.phone && <span>• {student.phone}</span>}
          </div>
        </div>

        {/* nút chỉnh và xoá */}
        <div className="hidden gap-2 group-hover:inline-flex animate-slide-up">
          {/* nút edit */}
          <Button
            variant="ghost"
            size="icon"
            className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-info"
            onClick={() => {
              setIsEditting(true);
              setUpdateStudentName(student.name || "");
            }}
          >
            <SquarePen className="size-4" />
          </Button>

          {/* nút xoá */}
          <Button
            variant="ghost"
            size="icon"
            className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-destructive"
            onClick={() => deleteStudent(student.student_code)}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default StudentCard;
