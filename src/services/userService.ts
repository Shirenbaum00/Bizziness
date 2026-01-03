import apiClient from "./apiClient";
import User from "../interfaces/User";


export const getUserById = (userId: string) => {
    return apiClient.get<User>(`/users/${userId}`);
};


export const getAllUsers = () => {
    return apiClient.get<User[]>("/users");
};




export const getMyUser = () => {
    return apiClient.get<User>("/users/me");
};

export const updateMyProfile = (userId: string, data: any) => {
    return apiClient.put(`/users/${userId}`, {
        firstName: data.firstName,
        middleName: data.middleName,
        lastName: data.lastName,
        phone: data.phone,
        image: data.image,
    });
};


export const updateUserRole = (
    userId: string,
    role: "user" | "business" | "admin"
) => {
    return apiClient.patch(`/users/${userId}`, {
        isAdmin: role === "admin",
        isBusiness: role === "business",
    });
};


export const deleteUser = (userId: string) => {
    return apiClient.delete(`/users/${userId}`);
};
