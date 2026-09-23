import axios from "axios";

// Dev goes through the Vite proxy (see vite.config.js), prod is served by
// Express — both are same-origin, so "/api" works unconditionally.
const api = axios.create({
    baseURL: "/api",
    withCredentials: true,
});

// One place to react to an expired/missing session. Dispatching a window
// event (instead of importing AuthContext here) avoids a circular import
// between this module-scope axios instance and a React context.
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 && !window.location.pathname.startsWith("/login")) {
            window.dispatchEvent(new Event("auth:unauthorized"));
        }
        return Promise.reject(error);
    }
);

export default api;
