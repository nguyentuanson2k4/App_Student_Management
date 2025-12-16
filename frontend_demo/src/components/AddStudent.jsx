import React, { useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import api from "@/lib/axios";

const AddStudent = ({ handleStudentAdded }) => {
  const [form, setForm] = useState({
    student_code: "",
    name: "",
    gender: "M",
    dob: "",
    email: "",
    phone: "",
    avatar_url: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addStudent = async () => {
    if (!form.student_code || !form.name) {
      toast.error("Mã sinh viên và tên là bắt buộc");
      return;
    }

    try {
      await api.post("/students", form);
      toast.success(`Đã thêm sinh viên ${form.name}`);
      handleStudentAdded?.();

      // reset form
      setForm({
        student_code: "",
        name: "",
        gender: "M",
        dob: "",
        email: "",
        phone: "",
        avatar_url: "",
      });
    } catch (error) {
      console.error(error);
      toast.error("Lỗi khi thêm sinh viên");
    }
  };

  return (
    <Card className="p-6 border-0 bg-gradient-card shadow-custom-lg">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input
          name="student_code"
          placeholder="Mã sinh viên"
          value={form.student_code}
          onChange={handleChange}
        />

        <Input
          name="name"
          placeholder="Họ và tên"
          value={form.name}
          onChange={handleChange}
        />

        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          className="h-12 rounded-md border px-3"
        >
          <option value="M">Nam</option>
          <option value="F">Nữ</option>
          <option value="O">Khác</option>
        </select>

        <Input
          type="date"
          name="dob"
          value={form.dob}
          onChange={handleChange}
        />

        <Input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <Input
          name="phone"
          placeholder="Số điện thoại"
          value={form.phone}
          onChange={handleChange}
        />

        <Input
          name="avatar_url"
          placeholder="Avatar URL"
          value={form.avatar_url}
          onChange={handleChange}
          className="sm:col-span-2"
        />
      </div>

      <div className="mt-4">
        <Button variant="gradient" size="xl" onClick={addStudent}>
          <Plus className="size-5 mr-2" />
          Thêm sinh viên
        </Button>
      </div>
    </Card>
  );
};

export default AddStudent;
