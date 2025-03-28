import http from "./http.ts";

type User = {
    Id: number,
    Username: string,
    Email: string,
}

const getCurrentUser = async (token: string): Promise<User> => {
    return await http.get(http.apiBaseURLs.api, "api/users/me", token);
} 

const userService = {
    getCurrentUser,
}

export default userService;