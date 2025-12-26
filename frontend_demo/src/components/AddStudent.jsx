// import React, { useState } from "react";
// import { Card } from "./ui/card";
// import { Input } from "./ui/input";
// import { Button } from "./ui/button";
// import { Plus, Users, BookOpen } from "lucide-react";
// import { toast } from "sonner";
// import api from "@/lib/axios";
// import { useNavigate } from "react-router-dom";


// const AddStudent = ({ handleStudentAdded }) => {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({
//     student_code: "",
//     name: "",
//     gender: "M",
//     dob: "",
//     email: "",
//     phone: "",
//     avatar_url: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const addStudent = async () => {
//     if (!form.student_code || !form.name) {
//       toast.error("Mã sinh viên và tên là bắt buộc");
//       return;
//     }

//     try {
//       await api.post("/students", form);
//       toast.success(`Đã thêm sinh viên ${form.name}`);
//       handleStudentAdded?.();

//       // reset form
//       setForm({
//         student_code: "",
//         name: "",
//         gender: "M",
//         dob: "",
//         email: "",
//         phone: "",
//         avatar_url: "",
//       });
//     } catch (error) {
//       console.error(error);
//       toast.error("Lỗi khi thêm sinh viên");
//     }
//   };

//   return (
//     // <Card className="p-6 border-0 bg-gradient-card shadow-custom-lg">
//     //   <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//     //     <Input
//     //       name="student_code"
//     //       placeholder="Mã sinh viên"
//     //       value={form.student_code}
//     //       onChange={handleChange}
//     //     />

//     //     <Input
//     //       name="name"
//     //       placeholder="Họ và tên"
//     //       value={form.name}
//     //       onChange={handleChange}
//     //     />

//     //     <select
//     //       name="gender"
//     //       value={form.gender}
//     //       onChange={handleChange}
//     //       className="h-12 rounded-md border px-3"
//     //     >
//     //       <option value="M">Nam</option>
//     //       <option value="F">Nữ</option>
//     //       <option value="O">Khác</option>
//     //     </select>

//     //     <Input
//     //       type="date"
//     //       name="dob"
//     //       value={form.dob}
//     //       onChange={handleChange}
//     //     />

//     //     <Input
//     //       name="email"
//     //       placeholder="Email"
//     //       value={form.email}
//     //       onChange={handleChange}
//     //     />

//     //     <Input
//     //       name="phone"
//     //       placeholder="Số điện thoại"
//     //       value={form.phone}
//     //       onChange={handleChange}
//     //     />

//     //     <Input
//     //       name="avatar_url"
//     //       placeholder="Avatar URL"
//     //       value={form.avatar_url}
//     //       onChange={handleChange}
//     //       className="sm:col-span-2"
//     //     />
//     //   </div>

//     //   <div className="mt-4 flex flex-wrap gap-3">
//     //     <Button variant="gradient" size="xl" onClick={addStudent}>
//     //       <Plus className="size-5 mr-2" />
//     //       Thêm sinh viên
//     //     </Button>
//     //     <Button
//     //       variant="outline"
//     //       size="xl"
//     //       onClick={() => navigate("/subjects")}
//     //       className="bg-white/50 border-purple-200 hover:bg-purple-50 text-purple-700 flex-1 sm:flex-none"
//     //     >
//     //       <BookOpen className="size-5 mr-2" />
//     //       Quản lý môn học
//     //     </Button>
//     //   </div>
//     // </Card>
//     <Card className="p-6 border-0 bg-gradient-card shadow-custom-lg">
//     {/* Phần Tiêu đề: Sinh Viên */}
//     <div className="flex items-center gap-3 mb-6 pb-4 border-b border-purple-100/50">
//         <div className="p-2 bg-purple-100 rounded-lg">
//             <Users className="size-6 text-purple-600" />
//         </div>
//         <div>
//             <h2 className="text-2xl font-bold text-gray-800">Sinh Viên</h2>
//             <p className="text-sm text-gray-500">Quản lý và thêm mới hồ sơ sinh viên</p>
//         </div>
//     </div>

//     {/* Form nhập liệu */}
//     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//         <div className="space-y-1">
//             <label className="text-sm font-medium text-gray-600 ml-1">Mã sinh viên</label>
//             <Input
//                 name="student_code"
//                 placeholder="VD: A00001"
//                 value={form.student_code}
//                 onChange={handleChange}
//                 className="bg-white/50"
//             />
//         </div>

//         <div className="space-y-1">
//             <label className="text-sm font-medium text-gray-600 ml-1">Họ và tên</label>
//             <Input
//                 name="name"
//                 placeholder="Nguyễn Văn A"
//                 value={form.name}
//                 onChange={handleChange}
//                 className="bg-white/50"
//             />
//         </div>

//         <div className="space-y-1">
//             <label className="text-sm font-medium text-gray-600 ml-1">Giới tính</label>
//             <select
//                 name="gender"
//                 value={form.gender}
//                 onChange={handleChange}
//                 className="flex h-12 w-full rounded-md border border-input bg-white/50 px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-purple-400"
//             >
//                 <option value="M">Nam</option>
//                 <option value="F">Nữ</option>
//                 <option value="O">Khác</option>
//             </select>
//         </div>

//         <div className="space-y-1">
//             <label className="text-sm font-medium text-gray-600 ml-1">Ngày sinh</label>
//             <Input
//                 type="date"
//                 name="dob"
//                 value={form.dob}
//                 onChange={handleChange}
//                 className="bg-white/50"
//             />
//         </div>

//         <div className="space-y-1">
//             <label className="text-sm font-medium text-gray-600 ml-1">Email</label>
//             <Input
//                 name="email"
//                 placeholder="example@gmail.com"
//                 value={form.email}
//                 onChange={handleChange}
//                 className="bg-white/50"
//             />
//         </div>

//         <div className="space-y-1">
//             <label className="text-sm font-medium text-gray-600 ml-1">Số điện thoại</label>
//             <Input
//                 name="phone"
//                 placeholder="09xxx..."
//                 value={form.phone}
//                 onChange={handleChange}
//                 className="bg-white/50"
//             />
//         </div>

//         <div className="space-y-1 sm:col-span-2">
//             <label className="text-sm font-medium text-gray-600 ml-1">Link ảnh đại diện (Avatar URL)</label>
//             <Input
//                 name="avatar_url"
//                 placeholder="https://..."
//                 value={form.avatar_url}
//                 onChange={handleChange}
//                 className="bg-white/50"
//             />
//         </div>
//     </div>

//     {/* Nhóm nút bấm */}
//     <div className="mt-6 flex flex-wrap gap-3">
//         <Button variant="gradient" size="xl" onClick={addStudent} className="flex-1 sm:flex-none">
//             <Plus className="size-5 mr-2" />
//             Thêm sinh viên
//         </Button>

//         <Button
//             variant="outline"
//             size="xl"
//             onClick={() => navigate("/subjects")}
//             className="bg-white/50 border-purple-200 hover:bg-purple-50 text-purple-700 flex-1 sm:flex-none group"
//         >
//             <BookOpen className="size-5 mr-2" />
//             Quản lý môn học
//         </Button>
//     </div>
// </Card>
//   );
// };

// export default AddStudent;

import React, { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Plus, Users, BookOpen, Save, X } from "lucide-react";
import { toast } from "sonner";
import api from "@/lib/axios";
import { useNavigate } from "react-router-dom";

const AddStudent = ({ handleStudentAdded, editData, onCancelEdit }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    student_code: "", name: "", gender: "M", dob: "", email: "", phone: "", avatar_url: "",
  });

  // Tự động điền form khi bấm nút Sửa
  useEffect(() => {
    if (editData) {
      setForm({
        student_code: editData.student_code || "",
        name: editData.name || "",
        gender: editData.gender || "M",
        dob: editData.dob ? editData.dob.split('T')[0] : "",
        email: editData.email || "",
        phone: editData.phone || "",
        avatar_url: editData.avatar_url || "",
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!form.student_code || !form.name) {
      toast.error("Mã sinh viên và tên là bắt buộc");
      return;
    }

    try {
      if (editData) {
        await api.put(`/students/${editData.student_code}`, form);
        toast.success("Cập nhật thành công!");
      } else {
        await api.post("/students", form);
        toast.success("Thêm sinh viên thành công!");
      }
      handleStudentAdded?.();
      resetForm();
    } catch (error) {
      toast.error(error.response?.data?.message || "Có lỗi xảy ra");
    }
  };

  const resetForm = () => {
    setForm({ student_code: "", name: "", gender: "M", dob: "", email: "", phone: "", avatar_url: "" });
  };

  return (
    <Card className="p-6 border-0 bg-gradient-card shadow-custom-lg">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-purple-100/50">
        <div className="flex items-center gap-3">
          <div className={editData ? "p-2 bg-amber-100 rounded-lg" : "p-2 bg-purple-100 rounded-lg"}>
            <Users className={editData ? "size-6 text-amber-600" : "size-6 text-purple-600"} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{editData ? "Cập Nhật Hồ Sơ Sinh Viên" : "Sinh Viên"}</h2>
            <p className="text-sm text-gray-500">{editData ? `Đang chỉnh sửa mã sinh viên: ${editData.student_code}` : "Quản lý và thêm mới hồ sơ sinh viên"}</p>
          </div>
        </div>
        {editData && (
          <Button variant="ghost" onClick={onCancelEdit} className="text-gray-400 hover:text-red-500">
            <X className="size-5 mr-1" /> Hủy sửa
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-600 ml-1">Mã sinh viên</label>
          <Input name="student_code" value={form.student_code} onChange={handleChange} disabled={!!editData} className={editData ? "bg-gray-100" : "bg-white/50"} />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-600 ml-1">Họ và tên</label>
          <Input name="name" value={form.name} onChange={handleChange} className="bg-white/50" />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-600 ml-1">Giới tính</label>
          <select name="gender" value={form.gender} onChange={handleChange} className="flex h-12 w-full rounded-md border border-input bg-white/50 px-3 py-2 text-sm focus:ring-2 focus:ring-purple-400">
            <option value="M">Nam</option><option value="F">Nữ</option><option value="O">Khác</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-600 ml-1">Ngày sinh</label>
          <Input type="date" name="dob" value={form.dob} onChange={handleChange} className="bg-white/50" />
        </div>
        <div className="space-y-1"><label className="text-sm font-medium text-gray-600 ml-1">Email</label><Input name="email" value={form.email} onChange={handleChange} className="bg-white/50" /></div>
        <div className="space-y-1"><label className="text-sm font-medium text-gray-600 ml-1">SĐT</label><Input name="phone" value={form.phone} onChange={handleChange} className="bg-white/50" /></div>
        <div className="space-y-1 sm:col-span-2"><label className="text-sm font-medium text-gray-600 ml-1">Ảnh đại diện (URL)</label><Input name="avatar_url" value={form.avatar_url} onChange={handleChange} className="bg-white/50" /></div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button variant={editData ? "default" : "gradient"} size="xl" onClick={handleSubmit} className={editData ? "bg-amber-600 hover:bg-amber-700 flex-1 sm:flex-none" : "flex-1 sm:flex-none"}>
          {editData ? <Save className="size-5 mr-2" /> : <Plus className="size-5 mr-2" />}
          {editData ? "Lưu thay đổi" : "Thêm sinh viên"}
        </Button>
        {!editData && (
          <Button variant="outline" size="xl" onClick={() => navigate("/subjects")} className="bg-white/50 border-purple-200 text-purple-700 flex-1 sm:flex-none"><BookOpen className="size-5 mr-2" />Quản lý môn học</Button>
        )}
      </div>
    </Card>
  );
};

export default AddStudent;