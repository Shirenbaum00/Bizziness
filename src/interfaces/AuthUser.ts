export default interface AuthUser {
    _id: string;
    isAdmin: boolean;
    isBusiness: boolean;
}
export const isLoggedIn = (): boolean => {
    return Boolean(localStorage.getItem("token"));
};



