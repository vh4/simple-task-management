var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { prisma } from "../databases/connection.js";
export const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.user.create({
        data: userData
    });
    return user;
});
export const getUserByIdOrEmail = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.user.findFirst({
        where: {
            OR: [
                { id: params },
                { email: params },
            ],
        },
        select: {
            name: true,
            email: true,
            password: true,
        }
    });
    return user;
});
export const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield prisma.user.findMany();
    return users;
});
export const updateUser = (id, userData) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.user.update({
        where: {
            id
        },
        data: userData
    });
    return user;
});
export const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.user.delete({
        where: {
            id
        }
    });
    return user;
});
//# sourceMappingURL=user.js.map