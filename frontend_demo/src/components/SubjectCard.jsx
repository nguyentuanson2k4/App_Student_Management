import React from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Book, Trash2, SquarePen, Layers } from "lucide-react";
import api from "@/lib/axios";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Thêm prop onEdit vào component
const SubjectCard = ({ subject, index, handleSubjectChanged, onEdit }) => {

    const deleteSubject = async (e) => {
        e.stopPropagation();
        if (!window.confirm(`Bạn có chắc muốn xóa môn: ${subject.name}?`)) return;
        try {
            await api.delete(`/subjects/${subject.subject_code}`);
            toast.success("Đã xóa môn học");
            handleSubjectChanged?.();
        } catch (error) {
            toast.error("Lỗi khi xóa môn học");
        }
    };

    return (
        <Card
            className={cn(
                "group relative overflow-hidden p-5 transition-all duration-300",
                "bg-white/70 backdrop-blur-md border border-white/20",
                "shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]",
                "hover:-translate-y-1 animate-fade-in"
            )}
            style={{ animationDelay: `${index * 50}ms` }}
        >
            <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 opacity-70" />

            <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                    <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 shadow-lg shadow-purple-200">
                        <Book className="h-7 w-7 text-white" />
                        <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-sm">
                            <Layers className="h-3 w-3 text-purple-600" />
                        </div>
                    </div>
                </div>

                <div className="flex-1 min-w-0 pt-1">
                    <h3 className="text-lg font-bold text-slate-800 truncate leading-tight group-hover:text-purple-700 transition-colors">
                        {subject.name}
                    </h3>

                    <div className="mt-3 flex flex-wrap gap-2">
                        <div className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-bold text-purple-700 ring-1 ring-inset ring-purple-700/10">
                            {subject.subject_code}
                        </div>
                        <div className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                            {subject.credits || subject.credit || 0} Tín chỉ
                        </div>
                        {subject.teacher && (
                            <div className="text-[10px] text-slate-400 w-full mt-1">
                                GV: {subject.teacher}
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 rounded-full text-blue-500 hover:bg-blue-50"
                        onClick={(e) => {
                            e.stopPropagation();
                            onEdit(subject); // Đẩy dữ liệu lên form ở component cha
                        }}
                        title="Sửa thông tin"
                    >
                        <SquarePen className="size-4" />
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 rounded-full text-slate-400 hover:bg-red-50 hover:text-red-600"
                        onClick={deleteSubject}
                        title="Xoá môn học"
                    >
                        <Trash2 className="size-4" />
                    </Button>
                </div>
            </div>
        </Card>
    );
};

export default SubjectCard;