import api from "@/lib/axios";

export const authService = {
  signUp: async (name, email, phone, password) => {
    const res = await api.post(
      "/auth/signup",
      { name, email, phone, password },
      { withCredentials: true }
    );

    return res.data;
  },

  signIn: async (email, password) => {
    const res = await api.post(
      "/auth/signin",
      { email, password },
      { withCredentials: true }
    );

    return res.data.accessToken;
  },

  signOut: async () => {
    return api.post("/auth/signout", {}, { withCredentials: true });
  },

  fetchMe: async () => {
    const res = await api.get("/users/me", { withCredentials: true });
    return res.data.user;
  },

  refresh: async () => {
    const res = await api.post(
      "/auth/refresh",
      {},
      { withCredentials: true }
    );
    return res.data.accessToken;
  },
};
