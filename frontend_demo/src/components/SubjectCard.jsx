// // import React, { useState } from "react";
// // import { Card } from "./ui/card";
// // import { Button } from "./ui/button";
// // import { Book, Trash2, User, SquarePen } from "lucide-react";
// // import { Input } from "./ui/input";
// // import api from "@/lib/axios";
// // import { toast } from "sonner";
// // import { cn } from "@/lib/utils";

// // const SubjectCard = ({ subject, index, handleSubjectChanged }) => {
// //     const [isEditting, setIsEditting] = useState(false);
// //     const [updateSubjectName, setUpdateSubjectName] = useState(subject.name || "");

// //     const handleEditClick = (e) => {
// //         e.stopPropagation(); // Chặn nổi bọt
// //         setIsEditting(true);
// //     };

// //     const updateSubject = async () => {
// //         try {
// //             await api.put(`/subjects/${subject.subject_code}`, {
// //                 name: updateSubjectName,
// //             });
// //             toast.success(`Đã đổi tên môn học thành ${updateSubjectName}`);
// //             setIsEditting(false);
// //             handleSubjectChanged?.();
// //         } catch (error) {
// //             toast.error("Lỗi khi cập nhật môn học");
// //         }
// //     };

// //     const deleteSubject = async (e) => {
// //         e.stopPropagation();
// //         if (!window.confirm(`Bạn có chắc muốn xóa môn ${subject.name}?`)) return;
// //         try {
// //             await api.delete(`/subjects/${subject.subject_code}`);
// //             toast.success("Đã xóa môn học");
// //             handleSubjectChanged?.();
// //         } catch (error) {
// //             toast.error("Lỗi khi xóa môn học");
// //         }
// //     };

// //     const handleKeyPress = (e) => {
// //         if (e.key === "Enter") updateSubject();
// //     };

// //     return (
// //         <Card
// //             className={cn(
// //                 "p-4 bg-gradient-card border-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fade-in group cursor-pointer"
// //             )}
// //             style={{ animationDelay: `${index * 50}ms` }}
// //         >
// //             <div className="flex items-center gap-4">
// //                 <div className="flex-shrink-0">
// //                     <Book className="w-12 h-12 rounded-full object-cover" />
// //                 </div>

// //                 <div className="flex-1 min-w-0">
// //                     {isEditting ? (
// //                         <div className="flex items-center gap-2">
// //                             <Input
// //                                 autoFocus
// //                                 className="flex-1 h-12 text-base border-border/50 focus:border-primary/50 focus:ring-primary/20"
// //                                 type="ext"
// //                                 value={updateSubjectName}
// //                                 onClick={(e) => e.stopPropagation()}
// //                                 onChange={(e) => setUpdateSubjectName(e.target.value)}
// //                                 onKeyDown={handleKeyPress}
// //                                 onBlur={() => setIsEditting(false)}
// //                             />
// //                         </div>
// //                     ) : (
// //                         <p className={cn("text-base transition-all duration-200", "text-foreground")}>
// //                             {subject.name}
// //                         </p>
// //                     )}

// //                     <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
// //                         <span className="font-semibold text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded">
// //                             {subject.subject_code}
// //                         </span>
// //                         <span className="truncate">• {subject.credit}</span>

// //                     </div>
// //                 </div>


// //                 <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-2">
// //                     <Button
// //                         variant="ghost"
// //                         size="icon"
// //                         onClick={handleEditClick}
// //                         className="size-8 text-gray-400 hover:text-blue-600 hover:bg-blue-50"
// //                     >
// //                         <SquarePen className="size-4" />
// //                     </Button>

// //                     <Button
// //                         variant="ghost"
// //                         size="icon"
// //                         onClick={deleteSubject}
// //                         className="size-8 text-gray-400 hover:text-red-600 hover:bg-red-50"
// //                     >
// //                         <Trash2 className="size-4" />
// //                     </Button>
// //                 </div>
// //             </div>
// //         </Card>
// //     );
// // };

// // export default SubjectCard;

// import React, { useState } from "react";
// import { Card } from "./ui/card";
// import { Button } from "./ui/button";
// import { Book, Trash2, User, SquarePen, GraduationCap, Layers } from "lucide-react";
// import { Input } from "./ui/input";
// import api from "@/lib/axios";
// import { toast } from "sonner";
// import { cn } from "@/lib/utils";

// const SubjectCard = ({ subject, index, handleSubjectChanged }) => {
//     const [isEditting, setIsEditting] = useState(false);
//     const [updateSubjectName, setUpdateSubjectName] = useState(subject.name || "");

//     const handleEditClick = (e) => {
//         e.stopPropagation();
//         setIsEditting(true);
//     };

//     const updateSubject = async () => {
//         if (!updateSubjectName.trim()) {
//             toast.error("Tên môn học không được để trống");
//             return;
//         }
//         try {
//             await api.put(`/subjects/${subject.subject_code}`, {
//                 name: updateSubjectName,
//             });
//             toast.success(`Cập nhật thành công`);
//             setIsEditting(false);
//             handleSubjectChanged?.();
//         } catch (error) {
//             toast.error("Lỗi khi cập nhật môn học");
//         }
//     };

//     const deleteSubject = async (e) => {
//         e.stopPropagation();
//         if (!window.confirm(`Bạn có chắc muốn xóa môn: ${subject.name}?`)) return;
//         try {
//             await api.delete(`/subjects/${subject.subject_code}`);
//             toast.success("Đã xóa môn học");
//             handleSubjectChanged?.();
//         } catch (error) {
//             toast.error("Lỗi khi xóa môn học");
//         }
//     };

//     return (
//         <Card
//             className={cn(
//                 "group relative overflow-hidden p-5 transition-all duration-300",
//                 "bg-white/70 backdrop-blur-md border border-white/20",
//                 "shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]",
//                 "hover:-translate-y-1 animate-fade-in"
//             )}
//             style={{ animationDelay: `${index * 50}ms` }}
//         >
//             {/* Đường line trang trí phía trên */}
//             <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 opacity-70" />

//             <div className="flex items-start gap-4">
//                 {/* Icon Wrapper - Làm mới với Gradient tròn */}
//                 <div className="flex-shrink-0">
//                     <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 shadow-lg shadow-purple-200">
//                         <Book className="h-7 w-7 text-white" />
//                         <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-sm">
//                             <Layers className="h-3 w-3 text-purple-600" />
//                         </div>
//                     </div>
//                 </div>

//                 {/* Content Area */}
//                 <div className="flex-1 min-w-0 pt-1">
//                     {isEditting ? (
//                         <div className="flex items-center gap-2 animate-in fade-in zoom-in duration-200">
//                             <Input
//                                 autoFocus
//                                 className="h-10 border-purple-200 focus-visible:ring-purple-400 bg-white/50"
//                                 value={updateSubjectName}
//                                 onClick={(e) => e.stopPropagation()}
//                                 onChange={(e) => setUpdateSubjectName(e.target.value)}
//                                 onKeyDown={(e) => e.key === "Enter" && updateSubject()}
//                                 onBlur={() => setIsEditting(false)}
//                             />
//                         </div>
//                     ) : (
//                         <h3 className="text-lg font-bold text-slate-800 truncate leading-tight group-hover:text-purple-700 transition-colors">
//                             {subject.name}
//                         </h3>
//                     )}

//                     <div className="mt-3 flex flex-wrap gap-2">
//                         <div className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-bold text-purple-700 ring-1 ring-inset ring-purple-700/10">
//                             {subject.subject_code}
//                         </div>

//                         <div className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
//                             {subject.credits || subject.credit || 0} Tín chỉ
//                         </div>
//                     </div>
//                 </div>

//                 <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
//                     {/* NÚT SỬA */}
//                     <Button
//                         variant="ghost"
//                         size="icon"
//                         className="size-8 rounded-full text-blue-500 hover:bg-blue-50 hover:text-blue-600"
//                         onClick={handleEditClick}
//                         title="Sửa tên"
//                     >
//                         <SquarePen className="size-4" />
//                     </Button>

//                     {/* NÚT XOÁ */}
//                     <Button
//                         variant="ghost"
//                         size="icon"
//                         className="size-8 rounded-full text-slate-400 hover:bg-red-50 hover:text-red-600"
//                         onClick={(e) => deleteSubject(e, subject.subject_code)}
//                         title="Xoá môn học"
//                     >
//                         <Trash2 className="size-4" />
//                     </Button>
//                 </div>
//             </div>
//         </Card>

//     );
// };

// export default SubjectCard;
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