import z from "zod"

export const taskValidation = z.object({
    title: z.string().min(3).max(255),
    description: z.string().optional(),
    status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED"]).default("PENDING"),
    deadline: z.string().datetime().optional(),
    user_id: z.string().optional(),
})