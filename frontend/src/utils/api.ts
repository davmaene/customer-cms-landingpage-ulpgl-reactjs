import axios from "axios";

const API_BASE = process.env.REACT_APP_BACKEND_URL || "";

export const api = axios.create({
  baseURL: `${API_BASE}/api`,
  headers: { "Content-Type": "application/json" },
  timeout: 20000,
});

api.interceptors.request.use((config: any) => {
  const token = localStorage.getItem("ulpgl_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res: any) => {
    const body = res.data;
    if (body && typeof body === "object" && "status" in body && "data" in body) {
      res._envelope = { status: body.status, messageText: body.messageText };
      res.data = body.data;
    }
    console.log(res._envelope, res.data)
    return res;
  },
  (err: any) => {
    if (err?.response?.data && typeof err.response.data === "object" && "status" in err.response.data) {
      const env = err.response.data;
      err._envelope = { status: env.status, messageText: env.messageText };
      err.response.data = env.data || {};
      err.messageText = env.messageText;
    }
    if (err?.response?.status === 401) {
      localStorage.removeItem("ulpgl_token");
      localStorage.removeItem("ulpgl_user");
    }
    return Promise.reject(err);
  }
);

export const apiGet = (url: string, params?: any): Promise<any> => api.get(url, { params }).then((r: any) => r.data);
export const apiPost = (url: string, body: any): Promise<any> => api.post(url, body).then((r: any) => r.data);
export const apiPut = (url: string, body: any): Promise<any> => api.put(url, body).then((r: any) => r.data);
export const apiDel = (url: string): Promise<any> => api.delete(url).then((r: any) => r.data);
