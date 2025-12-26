// // import React, { useState } from "react";
// // import { Card } from "./ui/card";
// // import { cn } from "@/lib/utils";
// // import { Button } from "./ui/button";
// // import { Calendar, CheckCircle2, Circle, SquarePen, Trash2 } from "lucide-react";
// // import { Input } from "./ui/input";
// // import api from "@/lib/axios";
// // import { toast } from "sonner";
// // import { useNavigate } from "react-router";

// // const StudentCard = ({ student, index, handleStudentChanged }) => {
// //   const [isEditting, setIsEditting] = useState(false);
// //   const [updateStudentName, setUpdateStudentName] = useState(
// //     student.name || ""
// //   );
// //   const navigate = useNavigate();

// //   const deleteStudent = async (e, studentCode) => {
// //     e.stopPropagation(); // CHẶN CHUYỂN TRANG khi bấm nút xoá
// //     if (!window.confirm(`Bạn có chắc muốn xóa sinh viên ${student.name}?`)) {
// //       return;
// //     }

// //     try {
// //       await api.delete(`/students/${studentCode}`);
// //       toast.success("Sinh viên đã xoá.");
// //       handleStudentChanged();
// //     } catch (error) {
// //       console.error("Lỗi xảy ra khi xoá student.", error);
// //       toast.error("Lỗi xảy ra khi xoá sinh viên.");
// //     }
// //   };

// //   const updateStudent = async () => {
// //     try {
// //       setIsEditting(false);
// //       await api.put(`/students/${student.student_code}`, {
// //         name: updateStudentName,
// //       });
// //       toast.success(`Tên sinh viên đã đổi thành ${updateStudentName}`);
// //       handleStudentChanged();
// //     } catch (error) {
// //       console.error("Lỗi xảy ra khi update student.", error);
// //       toast.error("Lỗi xảy ra khi cập nhập sinh viên.");
// //     }
// //   };

// //   const handleKeyPress = (event) => {
// //     if (event.key === "Enter") {
// //       updateStudent();
// //     }
// //   };

// //   const handleEditClick = (e) => {
// //     e.stopPropagation(); // CHẶN CHUYỂN TRANG khi bấm nút sửa
// //     setIsEditting(true);
// //     setUpdateStudentName(student.name || "");
// //   }

// //   return (
// //     <Card
// //       onClick={() => !isEditting && navigate(`/students/${student.student_code}/scores`)}
// //             className={cn(
// //                 "group relative overflow-hidden p-5 transition-all duration-300",
// //                 "bg-white/70 backdrop-blur-md border border-white/20",
// //                 "shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]",
// //                 "hover:-translate-y-1 animate-fade-in"
// //             )}
// //             style={{ animationDelay: `${index * 50}ms` }}

// //     >
// //       {/* Đường line trang trí phía trên */}
// //       <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 opacity-70" />
// //       <div className="flex items-center gap-4">
// //         {/* avatar */}
// //         <div className="flex-shrink-0">
// //           {student.avatar_url ? (
// //             // simple avatar
// //             // eslint-disable-next-line jsx-a11y/img-redundant-alt
// //             <img
// //               src={student.avatar_url}
// //               alt="avatar"
// //               className="w-12 h-12 rounded-full object-cover"
// //             />
// //           ) : (
// //             <Circle className="size-8 text-muted-foreground" />
// //           )}
// //         </div>

// //         {/* hiển thị hoặc chỉnh sửa tên */}
// //         <div className="flex-1 min-w-0">
// //           {isEditting ? (
// //             <div className="flex items-center gap-2 animate-in fade-in zoom-in duration-200">
// //               <Input
// //                 autoFocus
// //                 className="h-10 border-purple-200 focus-visible:ring-purple-400 bg-white/50"
// //                 value={updateStudentName}
// //                 onClick={(e) => e.stopPropagation()}
// //                 onChange={(e) => setUpdateStudentName(e.target.value)}
// //                 onKeyDown={(e) => e.key === "Enter" && updateStudent()}
// //                 onBlur={() => setIsEditting(false)}
// //               />
// //             </div>
// //           ) : (
// //             <p className="text-lg font-bold text-slate-800 truncate leading-tight group-hover:text-purple-700 transition-colors">
// //               {student.name}
// //             </p>
// //           )}

// //           {/* mã sinh viên & email */}
// //           <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
// //             <span className="font-semibold text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded">
// //               {student.student_code}
// //             </span>
// //             {student.email && <span className="truncate">• {student.email}</span>}
// //             {student.phone && <span className="truncate">• {student.phone}</span>}
// //           </div>
// //         </div>

// //         {/* nút chỉnh và xoá */}
// //         <div className="hidden gap-2 group-hover:inline-flex animate-slide-up">
// //           {/* nút edit */}
// //           <Button
// //             variant="ghost"
// //             size="icon"
// //             className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-info"
// //             onClick={handleEditClick} // Gọi hàm đã chặn nổi bọt
// //           >
// //             <SquarePen className="size-4" />
// //           </Button>

// //           {/* nút xoá */}
// //           <Button
// //             variant="ghost"
// //             size="icon"
// //             className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-destructive hover:bg-red-50"
// //             onClick={(e) => deleteStudent(e, student.student_code)} // Truyền event vào
// //           >
// //             <Trash2 className="size-4" />
// //           </Button>
// //         </div>
// //       </div>
// //     </Card>
// //   );
// // };

// // export default StudentCard;

// import React, { useState } from "react";
// import { Card } from "./ui/card";
// import { cn } from "@/lib/utils";
// import { Button } from "./ui/button";
// import { Calendar, CheckCircle2, Circle, SquarePen, Trash2, Trophy } from "lucide-react"; // Thêm Trophy
// import { Input } from "./ui/input";
// import api from "@/lib/axios";
// import { toast } from "sonner";
// import { useNavigate } from "react-router";

// const StudentCard = ({ student, index, handleStudentChanged }) => {
//   const [isEditting, setIsEditting] = useState(false);
//   const [updateStudentName, setUpdateStudentName] = useState(student.name || "");
//   const navigate = useNavigate();

//   const deleteStudent = async (e, studentCode) => {
//     e.stopPropagation();
//     if (!window.confirm(`Bạn có chắc muốn xóa sinh viên ${student.name}?`)) return;

//     try {
//       await api.delete(`/students/${studentCode}`);
//       toast.success("Sinh viên đã xoá.");
//       handleStudentChanged();
//     } catch (error) {
//       toast.error("Lỗi xảy ra khi xoá sinh viên.");
//     }
//   };

//   const updateStudent = async () => {
//     try {
//       setIsEditting(false);
//       await api.put(`/students/${student.student_code}`, {
//         name: updateStudentName,
//       });
//       toast.success(`Tên sinh viên đã đổi thành ${updateStudentName}`);
//       handleStudentChanged();
//     } catch (error) {
//       toast.error("Lỗi xảy ra khi cập nhập sinh viên.");
//     }
//   };

//   const handleEditClick = (e) => {
//     e.stopPropagation();
//     setIsEditting(true);
//     setUpdateStudentName(student.name || "");
//   };

//   return (
//     <Card
//       className={cn(
//         "group relative overflow-hidden p-5 transition-all duration-300",
//         "bg-white/70 backdrop-blur-md border border-white/20",
//         "shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]",
//         "hover:-translate-y-1 animate-fade-in cursor-pointer"
//       )}
//       style={{ animationDelay: `${index * 50}ms` }}
//     >
//       <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 opacity-70" />
      
//       <div className="flex items-center gap-4">
//         {/* avatar */}
//         <div className="flex-shrink-0">
//           {student.avatar_url ? (
//             <img
//               src={student.avatar_url}
//               alt="avatar"
//               className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
//             />
//           ) : (
//             <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
//                <Circle className="size-6 text-slate-400" />
//             </div>
//           )}
//         </div>

//         {/* content */}
//         <div className="flex-1 min-w-0">
//           {isEditting ? (
//             <Input
//               autoFocus
//               className="h-9 border-purple-200 focus-visible:ring-purple-400 bg-white/50"
//               value={updateStudentName}
//               onClick={(e) => e.stopPropagation()}
//               onChange={(e) => setUpdateStudentName(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && updateStudent()}
//               onBlur={() => setIsEditting(false)}
//             />
//           ) : (
//             <p className="text-lg font-bold text-slate-800 truncate group-hover:text-purple-700 transition-colors">
//               {student.name}
//             </p>
//           )}

//           <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
//             <span className="font-bold text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded">
//               {student.student_code}
//             </span>
//             {student.email && <span className="truncate hidden sm:inline">• {student.email}</span>}
//           </div>
//         </div>

//         {/* Nhóm nút hành động */}
//         <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          
//           {/* NÚT NHẬP ĐIỂM */}
//           <Button
//             variant="ghost"
//             size="icon"
//             className="size-8 rounded-full text-amber-500 hover:bg-amber-50 hover:text-amber-600"
//             onClick={(e) => {
//               e.stopPropagation();
//               navigate(`/students/${student.student_code}/scores`);
//             }}
//             title="Nhập điểm"
//           >
//             <Trophy className="size-4" />
//           </Button>

//           {/* NÚT SỬA */}
//           <Button
//             variant="ghost"
//             size="icon"
//             className="size-8 rounded-full text-blue-500 hover:bg-blue-50 hover:text-blue-600"
//             onClick={handleEditClick}
//             title="Sửa tên"
//           >
//             <SquarePen className="size-4" />
//           </Button>

//           {/* NÚT XOÁ */}
//           <Button
//             variant="ghost"
//             size="icon"
//             className="size-8 rounded-full text-slate-400 hover:bg-red-50 hover:text-red-600"
//             onClick={(e) => deleteStudent(e, student.student_code)}
//             title="Xoá sinh viên"
//           >
//             <Trash2 className="size-4" />
//           </Button>
//         </div>
//       </div>
//     </Card>
//   );
// };

// export default StudentCard;

import React from "react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Circle, SquarePen, Trash2, Trophy } from "lucide-react";
import api from "@/lib/axios";
import { toast } from "sonner";
import { useNavigate } from "react-router";

const StudentCard = ({ student, index, handleStudentChanged, onEdit }) => {
  const navigate = useNavigate();

  const deleteStudent = async (e, studentCode) => {
    e.stopPropagation();
    if (!window.confirm(`Bạn có chắc muốn xóa sinh viên ${student.name}?`)) return;
    try {
      await api.delete(`/students/${studentCode}`);
      toast.success("Đã xoá sinh viên.");
      handleStudentChanged();
    } catch (error) {
      toast.error("Lỗi khi xoá.");
    }
  };

  return (
    <Card
      className={cn(
        "group relative overflow-hidden p-5 transition-all duration-300 bg-white/70 backdrop-blur-md border border-white/20 shadow-sm hover:shadow-md hover:-translate-y-1 animate-fade-in"
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 opacity-70" />
      
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0">
          {student.avatar_url ? (
            <img src={student.avatar_url} alt="avatar" className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" />
          ) : (
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center"><Circle className="size-6 text-slate-400" /></div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-lg font-bold text-slate-800 truncate group-hover:text-purple-700 transition-colors">{student.name}</p>
          <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
            <span className="font-bold text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded">{student.student_code}</span>
            {student.email && <span className="truncate hidden sm:inline">• {student.email}</span>}
          </div>
        </div>

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="ghost" size="icon" className="size-8 rounded-full text-amber-500 hover:bg-amber-50" onClick={(e) => { e.stopPropagation(); navigate(`/students/${student.student_code}/scores`); }} title="Nhập điểm">
            <Trophy className="size-4" />
          </Button>

          {/* NÚT SỬA: Đẩy dữ liệu lên form cha */}
          <Button variant="ghost" size="icon" className="size-8 rounded-full text-blue-500 hover:bg-blue-50" onClick={(e) => { e.stopPropagation(); onEdit(student); }} title="Sửa tất cả thông tin">
            <SquarePen className="size-4" />
          </Button>

          <Button variant="ghost" size="icon" className="size-8 rounded-full text-slate-400 hover:bg-red-50 hover:text-red-600" onClick={(e) => deleteStudent(e, student.student_code)} title="Xoá">
            <Trash2 className="size-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default StudentCard;