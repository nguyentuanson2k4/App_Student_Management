import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "sonner";
import { authService } from "@/services/authService";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      accessToken: null,
      user: null,
      loading: false,

      setAccessToken: (accessToken) => set({ accessToken }),

      clearState: () =>
        set({ accessToken: null, user: null, loading: false }),

      signUp: async (name, email, phone, password) => {
        try {
          set({ loading: true });
          await authService.signUp(name, email, phone, password);
          toast.success("Đăng ký thành công! Hãy đăng nhập.");
        } catch (e) {
          toast.error("Đăng ký không thành công");
        } finally {
          set({ loading: false });
        }
      },

      signIn: async (email, password) => {
        try {
          set({ loading: true });

          const accessToken = await authService.signIn(email, password);
          set({ accessToken });

          await get().fetchMe();
          toast.success("Đăng nhập thành công 🎉");
        } catch (e) {
          toast.error("Đăng nhập không thành công");
        } finally {
          set({ loading: false });
        }
      },

      signOut: async () => {
        try {
          await authService.signOut();
          get().clearState();
          toast.success("Đăng xuất thành công!");
        } catch {
          toast.error("Logout thất bại");
        }
      },

      fetchMe: async () => {
        try {
          const user = await authService.fetchMe();
          set({ user });
        } catch {
          get().clearState();
        }
      },

      refresh: async () => {
        try {
          const accessToken = await authService.refresh();
          set({ accessToken });
          await get().fetchMe();
        } catch {
          get().clearState();
        }
      },
    }),
    {
      name: "auth-storage", // ⭐ localStorage key
      partialize: (state) => ({
        accessToken: state.accessToken,
        user: state.user,
      }),
    }
  )
);
