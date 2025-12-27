import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import api from "@/lib/axios";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { 
  GraduationCap, 
  Plus, 
  Trash2, 
  PencilLine, 
  ArrowLeft, 
  Save, 
  X, 
  BookOpen,
  Calendar,
  Layers
} from "lucide-react";
import { cn } from "@/lib/utils";

const StudentScores = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  
  // States
  const [student, setStudent] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [editingId, setEditingId] = useState(null); // Để xác định đang sửa dòng nào
  const [form, setForm] = useState({
    subjectCode: "",
    midterm: "",
    finalExam: "",
    total: "",
    term: "",
    year: new Date().getFullYear(),
  });

  useEffect(() => {
    fetchData();
  }, [code]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [sRes, subRes, scoreRes] = await Promise.all([
        api.get(`/students/${code}`),
        api.get(`/subjects`),
        api.get(`/scores/student/${code}`),
      ]);
      setStudent(sRes.data);
      setSubjects(subRes.data || []);
      setScores(scoreRes.data || []);
      
      if (subRes.data?.length > 0) {
        setForm(prev => ({ ...prev, subjectCode: subRes.data[0].subject_code || subRes.data[0].code }));
      }
    } catch (err) {
      toast.error("Không thể tải dữ liệu");
    } finally {
      setLoading(false);
    }
  };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setForm(prev => ({ ...prev, [name]: value }));
  // };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setForm((prev) => {
      const updatedForm = { ...prev, [name]: value };

      // Tự động tính điểm tổng kết nếu thay đổi midterm hoặc finalExam
      if (name === "midterm" || name === "finalExam") {
        const mid = name === "midterm" ? value : prev.midterm;
        const fin = name === "finalExam" ? value : prev.finalExam;

        if (mid !== "" && fin !== "") {
          const total = (Number(mid) * 0.4 + Number(fin) * 0.6).toFixed(1);
          updatedForm.total = total;
        } else {
          updatedForm.total = ""; // Xóa tổng nếu một trong hai ô trống
        }
      }

      return updatedForm;
    });
  };

  const submitScore = async () => {
    if (!form.subjectCode) return toast.error("Vui lòng chọn môn học");

    const mid = form.midterm === "" ? null : Number(form.midterm);
    const fin = form.finalExam === "" ? null : Number(form.finalExam);
    const tot = form.total === "" ? (mid != null && fin != null ? (mid * 0.4 + fin * 0.6) : null) : Number(form.total);

    const payload = {
      student_code: code,
      subject_code: form.subjectCode,
      midterm: mid,
      final: fin,
      total: tot,
      term: form.term,
      year: Number(form.year),
    };

    try {
      if (editingId) {
        // Cập nhật điểm
        await api.put(`/scores/${editingId}`, payload);
        toast.success("Cập nhật điểm thành công");
      } else {
        // Thêm mới
        await api.post(`/scores`, payload);
        toast.success("Đã lưu điểm mới");
      }
      
      setEditingId(null);
      resetForm();
      const scoreRes = await api.get(`/scores/student/${code}`);
      setScores(scoreRes.data || []);
    } catch (err) {
      toast.error("Lỗi khi xử lý dữ liệu");
    }
  };

  const deleteScore = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa điểm này?")) return;
    try {
      await api.delete(`/scores/${id}`);
      toast.success("Đã xóa điểm");
      setScores(scores.filter(s => s.id !== id && s._id !== id));
    } catch (err) {
      toast.error("Không thể xóa điểm");
    }
  };

  const startEdit = (sc) => {
    setEditingId(sc.id || sc._id);
    setForm({
      subjectCode: sc.subject_code,
      midterm: sc.midterm ?? "",
      finalExam: sc.final ?? "",
      total: sc.total ?? "",
      term: sc.term ?? "",
      year: sc.year ?? new Date().getFullYear(),
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({
      subjectCode: subjects[0]?.subject_code || "",
      midterm: "",
      finalExam: "",
      total: "",
      term: "",
      year: new Date().getFullYear(),
    });
  };

  return (

    <div className="max-w-4xl mx-auto p-6 space-y-8 animate-fade-in">
  {/* Header Sinh viên */}
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-4">
      <div className="p-3 bg-purple-100 rounded-2xl text-purple-600">
        <GraduationCap className="size-8" />
      </div>
      <div>
        <h1 className="text-2xl font-bold text-slate-800">{student?.name || "Đang tải..."}</h1>
        <p className="text-slate-500 font-medium">MSV: {code}</p>
      </div>
    </div>
    <Button variant="outline" onClick={() => navigate(-1)} className="gap-2">
      <ArrowLeft className="size-4" /> Quay lại
    </Button>
  </div>

  {/* Form Nhập điểm - ĐÃ SỬA MÀU SẮC KHI EDIT */}
  <Card className="p-6 border-0 bg-gradient-card shadow-custom-lg">
    <div className={cn(
      "flex items-center gap-2 mb-6 font-semibold transition-colors",
      editingId ? "text-amber-700" : "text-purple-700"
    )}>
      {editingId ? <PencilLine className="size-5" /> : <Plus className="size-5" />}
      <h3 className="text-sm text-gray-700">{editingId ? `Đang cập nhật điểm: ${form.subjectCode}` : "Nhập điểm môn học mới"}</h3>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="md:col-span-2 space-y-1">
        <label className="text-xs font-bold text-slate-500 uppercase ml-1">Môn học</label>
        <select
          name="subjectCode"
          value={form.subjectCode}
          onChange={handleInputChange}
          disabled={editingId}
          className={cn(
            "w-full h-11 rounded-xl border-slate-200 px-3 transition-all outline-none border",
            editingId ? "bg-gray-100 cursor-not-allowed" : "bg-white/50"
          )}
        >
          {subjects.map((sub) => (
            <option key={sub.subject_code} value={sub.subject_code}>{sub.name}</option>
          ))}
        </select>
      </div>
      <div className="space-y-1">
        <label className="text-xs font-bold text-slate-500 uppercase ml-1">Học kỳ</label>
        <Input 
          name="term" 
          placeholder="VD: HK1" 
          value={form.term} 
          onChange={handleInputChange} 
          className={cn("h-11 rounded-xl", editingId ? "bg-white" : "")} 
        />
      </div>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="space-y-1">
        <label className="text-xs font-bold text-slate-500 uppercase ml-1">Giữa kỳ(40%)</label>
        <Input name="midterm" type="number" value={form.midterm} onChange={handleInputChange} className="h-11 rounded-xl" />
      </div>
      <div className="space-y-1">
        <label className="text-xs font-bold text-slate-500 uppercase ml-1">Cuối kỳ(60%)</label>
        <Input name="finalExam" type="number" value={form.finalExam} onChange={handleInputChange} className="h-11 rounded-xl" />
      </div>
      <div className="space-y-1">
        <label className="text-xs font-bold text-slate-500 uppercase ml-1">Năm</label>
        <Input name="year" type="number" value={form.year} onChange={handleInputChange} className="h-11 rounded-xl" />
      </div>
      <div className="space-y-1">
        <label className="text-xs font-bold text-slate-500 uppercase ml-1">Tổng điểm</label>
        <Input 
          name="total" 
          type="number"  
          placeholder="Tự tính" 
          value={form.total} 
          onChange={handleInputChange}
          readOnly
          className=
            "h-11 rounded-xl font-bold"
        />
      </div>
    </div>

    <div className="flex gap-3">
      <Button 
        onClick={submitScore} 
        className={cn(
          "flex-1 h-12 rounded-xl gap-2 text-base transition-all",
          editingId 
            ? "bg-amber-600 hover:bg-amber-700 text-white" 
            : "bg-purple-600 hover:bg-purple-700 text-white"
        )}
      >
        {editingId ? <Save className="size-5" /> : <Plus className="size-5" />}
        {editingId ? "Lưu thay đổi" : "Lưu điểm môn học"}
      </Button>
      
      {editingId && (
        <Button 
          variant="outline" 
          onClick={resetForm} 
          className="h-12 rounded-xl px-6 text-gray-400 hover:text-red-500"
        >
          <X className="size-5 mr-2" /> Hủy sửa
        </Button>
      )}
    </div>
  </Card>

       {/* Danh sách điểm hiện có */}
       <div className="space-y-4">
         <h3 className="text-lg font-bold text-slate-700 flex items-center gap-2">
           <BookOpen className="size-5 text-purple-600" />
           Bảng điểm hiện tại
         </h3>
        
         {scores.length === 0 ? (
          <div className="text-center p-12 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
            <p className="text-slate-400">Chưa có dữ liệu điểm cho sinh viên này</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {scores.map((sc) => (
              <Card key={sc.id || sc._id} className="p-5 border-0 shadow-sm hover:shadow-md transition-all group overflow-hidden relative">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="size-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-purple-100 group-hover:text-purple-600 transition-colors">
                      <Layers className="size-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800">{sc.subject?.name || sc.subject_code}</h4>
                      <div className="flex gap-3 text-xs text-slate-500 mt-1">
                        <span className="flex items-center gap-1"><Calendar className="size-3" /> {sc.term} - {sc.year}</span>
                        <span className="font-medium text-purple-600 uppercase">Mã: {sc.subject_code}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-8">
                    <div className="flex gap-4 text-center">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Giữa kỳ</p>
                        <p className="font-semibold text-slate-700">{sc.midterm ?? "-"}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Cuối kỳ</p>
                        <p className="font-semibold text-slate-700">{sc.final ?? "-"}</p>
                      </div>
                      <div className="px-3 py-1 bg-purple-50 rounded-lg border border-purple-100">
                        <p className="text-[10px] font-bold text-purple-400 uppercase">Tổng</p>
                        <p className="font-bold text-purple-700 text-lg">{sc.total ?? "-"}</p>
                      </div>
                    </div>

                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => startEdit(sc)} className="size-9 rounded-full text-blue-500 hover:bg-blue-50">
                        <PencilLine className="size-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => deleteScore(sc.id || sc._id)} className="size-9 rounded-full text-red-500 hover:bg-red-50">
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentScores;