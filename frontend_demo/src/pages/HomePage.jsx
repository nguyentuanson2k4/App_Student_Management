import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import api from "@/lib/axios";
import { visibleTaskLimit } from "@/lib/data";

import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import AddStudent from "@/components/AddStudent"; 
import StudentList from "@/components/StudentList"; 
import StudentListPagination from "@/components/StudentListPagination"; 
import DateTimeFilter from "@/components/DateTimeFilter";
import StatsAndFilters from "@/components/StatsAndFilters";

const HomePage = () => {
  const [students, setStudents] = useState([]);
  const [activeStudentCount, setActiveStudentCount] = useState(0);
  const [filter, setFilter] = useState("all");
  const [dateQuery, setDateQuery] = useState("today");
  const [page, setPage] = useState(1);
  
  // State quản lý sinh viên đang được chỉnh sửa
  const [editingStudent, setEditingStudent] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, [dateQuery]);

  useEffect(() => {
    setPage(1);
  }, [filter, dateQuery]);

  const fetchStudents = async () => {
    try {
      const res = await api.get(`/students`);
      const data = res.data || [];
      setStudents(data);
      setActiveStudentCount(data.length);
    } catch (error) {
      console.error("Lỗi:", error);
      toast.error("Không thể tải danh sách sinh viên.");
    }
  };

  const handleStudentChanged = () => {
    fetchStudents();
    setEditingStudent(null); // Reset trạng thái sửa sau khi xong
  };

  const totalPages = Math.ceil(students.length / visibleTaskLimit);
  const visibleStudents = students.slice(
    (page - 1) * visibleTaskLimit,
    page * visibleTaskLimit
  );

  return (
    <div className="min-h-screen w-full bg-[#fefcff] relative">
      <div className="absolute inset-0 z-0" style={{
        backgroundImage: `radial-gradient(circle at 30% 70%, rgba(173, 216, 230, 0.35), transparent 60%),
                          radial-gradient(circle at 70% 30%, rgba(255, 182, 193, 0.4), transparent 60%)`,
      }} />

      <div className="container relative z-10 pt-8 mx-auto">
        <div className="w-full max-w-2xl p-6 mx-auto space-y-6">
          <Header />

          {/* Form nhận dữ liệu sửa */}
          <AddStudent 
            handleStudentAdded={handleStudentChanged} 
            editData={editingStudent}
            onCancelEdit={() => setEditingStudent(null)}
          />

          {/* List nhận hàm xử lý nút Sửa */}
          <StudentList
            filteredStudents={visibleStudents}
            filter={filter}
            handleStudentChanged={handleStudentChanged}
            onEditStudent={(std) => setEditingStudent(std)}
          />

          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <StudentListPagination
              handleNext={() => page < totalPages && setPage(p => p + 1)}
              handlePrev={() => page > 1 && setPage(p => p - 1)}
              handlePageChange={(p) => setPage(p)}
              page={page}
              totalPages={totalPages}
            />
          </div>

          <Footer activeStudentsCount={activeStudentCount} completedStudentsCount={0} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;