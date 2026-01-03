import apiClient from "./apiClient";
import Login from "../interfaces/Login";
import Register from "../interfaces/Register";

export const loginUser = (credentials: any) => {
    return apiClient.post("/users/login", credentials);

}
export const registerUser = (data: any) => {
    return apiClient.post("/users/register", data);
};



export const isLoggedIn = (): boolean => {
    return Boolean(localStorage.getItem("token"));
};
export const logoutUser = () => {
    localStorage.removeItem("token");
}

export const getAuthUser = () => {
    return apiClient.get("/users/me");
};

export const saveAuthToken = (token: string) => {
    localStorage.setItem("token", token);
};



