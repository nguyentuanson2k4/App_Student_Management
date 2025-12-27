import React from "react";
import StudentEmptyState from "./StudentEmptyState";
import StudentCard from "./StudentCard";

const StudentList = ({ filteredStudents, filter, handleStudentChanged, onEditStudent }) => {
  if (!filteredStudents || filteredStudents.length === 0) {
    return <StudentEmptyState filter={filter} />;
  }

  return (
    <div className="space-y-3">
      {filteredStudents.map((student, index) => (
        <StudentCard
          key={student.student_code ?? index}
          student={student}
          index={index}
          handleStudentChanged={handleStudentChanged}
          onEdit={onEditStudent} // Truyền tiếp hàm onEdit
        />
      ))}
    </div>
  );
};

export default StudentList;