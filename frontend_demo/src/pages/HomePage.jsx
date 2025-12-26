// import AddStudent from "@/components/AddStudent";
// import DateTimeFilter from "@/components/DateTimeFilter";
// import Footer from "@/components/Footer";
// import { Header } from "@/components/Header";
// import StatsAndFilters from "@/components/StatsAndFilters";
// import StudentList from "@/components/StudentList";
// import StudentListPagination from "@/components/StudentListPagination";
// import React, { useEffect, useState } from "react";
// import { toast } from "sonner";
// import api from "@/lib/axios";
// import { visibleTaskLimit } from "@/lib/data";

// const HomePage = () => {
//   const [students, setStudents] = useState([]);
//   const [activeStudentCount, setActiveStudentCount] = useState(0);
//   const [completeStudentCount, setCompleteStudentCount] = useState(0);
//   const [filter, setFilter] = useState("all");
//   const [dateQuery, setDateQuery] = useState("today");
//   const [page, setPage] = useState(1);

//   useEffect(() => {
//     fetchStudents();
//   }, [dateQuery]);

//   useEffect(() => {
//     setPage(1);
//   }, [filter, dateQuery]);

//   // logic
//   const fetchStudents = async () => {
//     try {
//       const res = await api.get(`/students`);
//       setStudents(res.data || []);
//       setActiveStudentCount((res.data || []).length);
//       setCompleteStudentCount(0);
//     } catch (error) {
//       console.error("Lỗi xảy ra khi truy xuất sinh viên:", error);
//       toast.error("Lỗi xảy ra khi truy xuất sinh viên.");
//     }
//   };

//   const handleStudentChanged = () => {
//     fetchStudents();
//   };

//   const handleNext = () => {
//     if (page < totalPages) {
//       setPage((prev) => prev + 1);
//     }
//   };

//   const handlePrev = () => {
//     if (page > 1) {
//       setPage((prev) => prev - 1);
//     }
//   };

//   const handlePageChange = (newPage) => {
//     setPage(newPage);
//   };

//   // biến
//   const filteredStudents = students.filter(() => true);

//   const visibleStudents = filteredStudents.slice(
//     (page - 1) * visibleTaskLimit,
//     page * visibleTaskLimit
//   );

//   if (visibleStudents.length === 0) {
//     handlePrev();
//   }

//   const totalPages = Math.ceil(filteredStudents.length / visibleTaskLimit);

//   return (
//     <div className="min-h-screen w-full bg-[#fefcff] relative">
//       {/* Dreamy Sky Pink Glow */}
//       <div
//         className="absolute inset-0 z-0"
//         style={{
//           backgroundImage: `
//         radial-gradient(circle at 30% 70%, rgba(173, 216, 230, 0.35), transparent 60%),
//         radial-gradient(circle at 70% 30%, rgba(255, 182, 193, 0.4), transparent 60%)`,
//         }}
//       />
//       {/* Your Content/Components */}
//       <div className="container relative z-10 pt-8 mx-auto">
//         <div className="w-full max-w-2xl p-6 mx-auto space-y-6">
//           {/* Đầu Trang */}
//           <Header />

//           {/* Tạo Sinh Viên */}
//           <AddStudent handleStudentAdded={handleStudentChanged} />

//           {/* Thống Kê và Bộ lọc */}
//           <StatsAndFilters
//             filter={filter}
//             setFilter={setFilter}
//             activeStudentsCount={activeStudentCount}
//             completedStudentsCount={completeStudentCount}
//           />

//           {/* Danh Sách Sinh Viên */}
//           <StudentList
//             filteredStudents={visibleStudents}
//             filter={filter}
//             handleStudentChanged={handleStudentChanged}
//           />

//           {/* Phân Trang và Lọc Theo Date */}
//           <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
//             <StudentListPagination
//               handleNext={handleNext}
//               handlePrev={handlePrev}
//               handlePageChange={handlePageChange}
//               page={page}
//               totalPages={totalPages}
//             />
//             <DateTimeFilter
//               dateQuery={dateQuery}
//               setDateQuery={setDateQuery}
//             />
//           </div>

//           {/* Chân Trang */}
//           <Footer
//             activeStudentsCount={activeStudentCount}
//             completedStudentsCount={completeStudentCount}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomePage;


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

          <StatsAndFilters
            filter={filter}
            setFilter={setFilter}
            activeStudentsCount={activeStudentCount}
            completedStudentsCount={0}
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
            <DateTimeFilter dateQuery={dateQuery} setDateQuery={setDateQuery} />
          </div>

          <Footer activeStudentsCount={activeStudentCount} completedStudentsCount={0} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;