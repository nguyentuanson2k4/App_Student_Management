import React from "react";

const Footer = ({ completedStudentsCount = 0, activeStudentsCount = 0 }) => {
  const total = completedStudentsCount + activeStudentsCount;
  return (
    <>
      {total > 0 && (
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Có tổng cộng {total} sinh viên trong hệ thống.
          </p>
        </div>
      )}
    </>
  );
};

export default Footer;
