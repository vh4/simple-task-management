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
export const createTask = (taskData) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield prisma.task.create({
        data: taskData
    });
    return task;
});
export const updateTask = (id, taskData) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield prisma.task.update({
        where: {
            id
        },
        data: taskData
    });
    return task;
});
export const deleteTask = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield prisma.task.delete({
        where: {
            id
        }
    });
    return task;
});
export const getTaskById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield prisma.task.findUnique({
        where: {
            id
        }
    });
    return task;
});
export const getTasks = () => __awaiter(void 0, void 0, void 0, function* () {
    const tasks = yield prisma.task.findMany();
    return tasks;
});
//# sourceMappingURL=tasks.js.map