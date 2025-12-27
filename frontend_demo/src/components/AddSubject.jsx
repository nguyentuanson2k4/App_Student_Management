import React, { useState, useEffect } from "react"; // Thêm useEffect
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Plus, BookOpen, ArrowLeft, Save, X } from "lucide-react"; // Thêm icon Save, X
import { toast } from "sonner";
import api from "@/lib/axios";
import { useNavigate } from "react-router-dom";

// Thêm prop editData và onCancelEdit
const AddSubject = ({ handleSubjectAdded, editData, onCancelEdit }) => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        subject_code: "",
        name: "",
        credit: "",
        teacher: "",
        description: "",
    });

    // Theo dõi khi có dữ liệu sửa truyền vào từ Component cha
    useEffect(() => {
        if (editData) {
            setForm({
                subject_code: editData.subject_code || "",
                name: editData.name || "",
                credit: editData.credits || editData.credit || "",
                teacher: editData.teacher || "",
                description: editData.description || "",
            });
            // Cuộn lên đầu trang mượt mà khi bấm sửa
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [editData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        if (!form.subject_code || !form.name || !form.credit) {
            toast.error("Mã môn, tên môn và số tín chỉ là bắt buộc");
            return;
        }

        try {
            if (editData) {
                // CHẾ ĐỘ CẬP NHẬT (PUT)
                await api.put(`/subjects/${editData.subject_code}`, {
                    ...form,
                    credits: Number(form.credit)
                });
                toast.success(`Đã cập nhật môn học: ${form.name}`);
                onCancelEdit?.(); // Thoát chế độ sửa
            } else {
                // CHẾ ĐỘ THÊM MỚI (POST)
                await api.post("/subjects", {
                    ...form,
                    credits: Number(form.credit)
                });
                toast.success(`Đã thêm môn học: ${form.name}`);
            }

            handleSubjectAdded?.();
            resetForm();
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Lỗi khi lưu môn học");
        }
    };

    const resetForm = () => {
        setForm({
            subject_code: "",
            name: "",
            credit: "",
            teacher: "",
            description: "",
        });
    };

    return (
        <Card className="p-6 border-0 bg-gradient-card shadow-custom-lg">
            {/* Phần Tiêu đề: Thay đổi linh hoạt theo trạng thái */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-purple-100/50">
                <div className="flex items-center gap-3">
                    <div className={editData ? "p-2 bg-amber-100 rounded-lg" : "p-2 bg-purple-100 rounded-lg"}>
                        <BookOpen className={editData ? "size-6 text-amber-600" : "size-6 text-purple-600"} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">
                            {editData ? "Cập nhật môn học" : "Môn Học"}
                        </h2>
                        <p className="text-sm text-gray-500">
                            {editData ? `Đang chỉnh sửa mã môn: ${editData.subject_code}` : "Quản lý và thêm mới các học phần"}
                        </p>
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
                    <label className="text-sm font-medium text-gray-600 ml-1">Mã môn học</label>
                    <Input
                        name="subject_code"
                        placeholder="VD: CS101"
                        value={form.subject_code}
                        onChange={handleChange}
                        disabled={!!editData} // Không cho phép sửa mã môn khi đang ở chế độ Update
                        className={editData ? "bg-gray-100 cursor-not-allowed" : "bg-white/50"}
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-600 ml-1">Tên môn học</label>
                    <Input
                        name="name"
                        placeholder="Nhập tên môn..."
                        value={form.name}
                        onChange={handleChange}
                        className="bg-white/50"
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-600 ml-1">Số tín chỉ</label>
                    <Input
                        type="number"
                        name="credit"
                        placeholder="VD: 3"
                        value={form.credit}
                        onChange={handleChange}
                        className="bg-white/50"
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-600 ml-1">Giảng viên</label>
                    <Input
                        name="teacher"
                        placeholder="Tên giảng viên..."
                        value={form.teacher}
                        onChange={handleChange}
                        className="bg-white/50"
                    />
                </div>

                <div className="space-y-1 sm:col-span-2">
                    <label className="text-sm font-medium text-gray-600 ml-1">Mô tả</label>
                    <Input
                        name="description"
                        placeholder="Mô tả ngắn gọn về môn học"
                        value={form.description}
                        onChange={handleChange}
                        className="bg-white/50"
                    />
                </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
                {/* Nút bấm thay đổi text và icon theo trạng thái */}
                <Button 
                    variant={editData ? "default" : "gradient"} 
                    size="xl" 
                    onClick={handleSave} 
                    className={editData ? "flex-1 sm:flex-none bg-amber-600 hover:bg-amber-700" : "flex-1 sm:flex-none"}
                >
                    {editData ? <Save className="size-5 mr-2" /> : <Plus className="size-5 mr-2" />}
                    {editData ? "Lưu thay đổi" : "Thêm môn học"}
                </Button>
                
                {!editData && (
                    <Button
                        variant="outline"
                        size="xl"
                        onClick={() => navigate("/")}
                        className="bg-white/50 border-purple-200 hover:bg-purple-50 text-purple-700 flex-1 sm:flex-none"
                    >
                        <ArrowLeft className="size-5 mr-2" />
                        Quay Lại
                    </Button>
                )}
            </div>
        </Card>
    );
};

export default AddSubject;