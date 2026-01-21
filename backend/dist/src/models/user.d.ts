import type { UserDto } from "../dto/users.dto.js";
export declare const createUser: (userData: UserDto) => Promise<{
    id: string;
    email: string;
    name: string;
    password: string;
}>;
export declare const getUserByIdOrEmail: (params: string) => Promise<UserDto | null>;
export declare const getUsers: () => Promise<{
    id: string;
    email: string;
    name: string;
    password: string;
}[]>;
export declare const updateUser: (id: string, userData: UserDto) => Promise<{
    id: string;
    email: string;
    name: string;
    password: string;
}>;
export declare const deleteUser: (id: string) => Promise<{
    id: string;
    email: string;
    name: string;
    password: string;
}>;
//# sourceMappingURL=user.d.ts.map