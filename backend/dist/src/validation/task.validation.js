import z from "zod";
export const taskValidation = z.object({
    name: z.string().min(3).max(255),
    description: z.string().min(3).max(255),
});
//# sourceMappingURL=task.validation.js.map