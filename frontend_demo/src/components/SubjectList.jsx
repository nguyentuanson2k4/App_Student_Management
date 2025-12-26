// import React from "react";
// import StudentEmptyState from "./SubjectEmptyState"; 
// import SubjectCard from "./SubjectCard";

// const SubjectList = ({ subjects, handleSubjectChanged }) => {
//   if (!subjects || subjects.length === 0) {
//     // Truyền filter="all" để hiển thị trạng thái trống
//     return <StudentEmptyState filter="all" />;
//   }

//   return (
//     <div className="space-y-3">
//       {subjects.map((subject, index) => (
//         <SubjectCard
//           key={subject.subject_code ?? index}
//           subject={subject}
//           index={index}
//           handleSubjectChanged={handleSubjectChanged}
//         />
//       ))}
//     </div>
//   );
// };

// export default SubjectList;
import React from "react";
import StudentEmptyState from "./SubjectEmptyState"; 
import SubjectCard from "./SubjectCard";

// Thêm prop onEditSubject vào đây
const SubjectList = ({ subjects, handleSubjectChanged, onEditSubject }) => {
  if (!subjects || subjects.length === 0) {
    return <StudentEmptyState filter="all" />;
  }

  return (
    <div className="space-y-3">
      {subjects.map((subject, index) => (
        <SubjectCard
          key={subject.subject_code ?? index}
          subject={subject}
          index={index}
          handleSubjectChanged={handleSubjectChanged}
          // Truyền hàm onEdit xuống Card
          onEdit={onEditSubject} 
        />
      ))}
    </div>
  );
};

export default SubjectList;