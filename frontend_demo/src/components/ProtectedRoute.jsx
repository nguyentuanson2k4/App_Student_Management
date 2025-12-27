import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/stores/useAuthStore";

const ProtectedRoute = () => {
  const { accessToken, user, loading, refresh, fetchMe } = useAuthStore();
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        if (!accessToken) {
          await refresh();
        }

        if (accessToken && !user) {
          await fetchMe();
        }
      } finally {
        setInitializing(false);
      }
    };

    initAuth();
  }, []);
  if (initializing || loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Đang xác thực...
      </div>
    );
  }
  if (!accessToken) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
