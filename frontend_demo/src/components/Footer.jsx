// import React from "react";

// const Footer = ({ completedStudentsCount = 0, activeStudentsCount = 0 }) => {
//   const total = completedStudentsCount + activeStudentsCount;
//   return (
//     <>
//       {total > 0 && (
//         <div className="text-center">
//           <p className="text-sm text-muted-foreground">
//             Có tổng cộng {total} sinh viên trong hệ thống.
//           </p>
//         </div>
//       )}
//     </>
//   );
// };

// export default Footer;

import React from "react";

const Footer = ({ 
  completedStudentsCount = 0, 
  activeStudentsCount = 0, 
  label = "sinh viên" // Mặc định là sinh viên nếu không truyền gì
}) => {
  const total = completedStudentsCount + activeStudentsCount;
  
  return (
    <>
      {total > 0 && (
        <div className="text-center py-4">
          <p className="text-sm text-muted-foreground animate-pulse">
            Có tổng cộng {total} {label} trong hệ thống.
          </p>
        </div>
      )}
    </>
  );
};

export default Footer;
