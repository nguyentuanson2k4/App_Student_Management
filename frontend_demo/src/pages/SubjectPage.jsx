import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import api from "@/lib/axios";
import { visibleTaskLimit } from "@/lib/data";

import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import AddSubject from "@/components/AddSubject"; 
import SubjectList from "@/components/SubjectList"; 
import StudentListPagination from "@/components/StudentListPagination"; 
import DateTimeFilter from "@/components/DateTimeFilter";


const SubjectPage = () => {
  const [subjects, setSubjects] = useState([]);
  const [totalSubjects, setTotalSubjects] = useState(0);
  const [dateQuery, setDateQuery] = useState("today");
  const [page, setPage] = useState(1);
  
  // --- STATE MỚI ĐỂ QUẢN LÝ VIỆC CHỈNH SỬA ---
  const [editingSubject, setEditingSubject] = useState(null);

  useEffect(() => {
    fetchSubjects();
  }, [dateQuery]);

  const fetchSubjects = async () => {
    try {
      const res = await api.get(`/subjects`);
      const data = res.data || [];
      setSubjects(data);
      setTotalSubjects(data.length);
    } catch (error) {
      console.error("Lỗi khi tải môn học:", error);
      toast.error("Không thể kết nối đến máy chủ.");
    }
  };

  const handleSubjectChanged = () => {
    fetchSubjects();
    // Sau khi thêm hoặc sửa thành công, nên xóa trạng thái sửa
    setEditingSubject(null); 
  };

  // Logic Phân trang
  const totalPages = Math.ceil(subjects.length / visibleTaskLimit);
  const visibleSubjects = subjects.slice(
    (page - 1) * visibleTaskLimit,
    page * visibleTaskLimit
  );

  const handleNext = () => page < totalPages && setPage(prev => prev + 1);
  const handlePrev = () => page > 1 && setPage(prev => prev - 1);
  const handlePageChange = (newPage) => setPage(newPage);

  return (
    <div className="min-h-screen w-full bg-[#fefcff] relative">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 30% 70%, rgba(173, 216, 230, 0.35), transparent 60%),
            radial-gradient(circle at 70% 30%, rgba(255, 182, 193, 0.4), transparent 60%)`,
        }}
      />

      <div className="container relative z-10 pt-8 mx-auto">
        <div className="w-full max-w-2xl p-6 mx-auto space-y-6">
          <Header />
          
          {/* 1. FORM THÊM/SỬA: 
              - Truyền editData để Form tự điền thông tin khi bấm nút sửa.
              - Truyền onCancelEdit để xóa trạng thái sửa nếu người dùng đổi ý.
          */}
          <AddSubject 
            handleSubjectAdded={handleSubjectChanged} 
            editData={editingSubject}
            onCancelEdit={() => setEditingSubject(null)}
          />

          {/* 2. DANH SÁCH MÔN HỌC:
              - Truyền onEditSubject để khi bấm icon SquarePen ở Card, 
                dữ liệu sẽ được truyền ngược lên page này.
          */}
          <SubjectList
            subjects={visibleSubjects}
            handleSubjectChanged={handleSubjectChanged}
            onEditSubject={(subject) => setEditingSubject(subject)}
          />

          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <StudentListPagination
              handleNext={handleNext}
              handlePrev={handlePrev}
              handlePageChange={handlePageChange}
              page={page}
              totalPages={totalPages}
            />
            <DateTimeFilter
              dateQuery={dateQuery}
              setDateQuery={setDateQuery}
            />
          </div>

          <Footer
            activeStudentsCount={totalSubjects}
            label="Tổng số môn học"
          />
        </div>
      </div>
    </div>
  );
};

export default SubjectPage;