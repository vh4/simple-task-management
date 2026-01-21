import express from "express";
import { userMiddleware } from "../middleware/user.middleware.js";
import { requestLogMiddleware } from "../middleware/request-log.middleware.js";
import { createTaskService, getTaskService, updateTaskService, deleteTaskService, getTaskByIdService } from "../controllers/task.controller.js";
const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - title
 *         - description
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated task ID
 *         title:
 *           type: string
 *           description: Task title
 *         description:
 *           type: string
 *           description: Task description
 *         status:
 *           type: string
 *           description: Task status
 *           default: pending
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Task creation date
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Task last update date
 *       example:
 *         title: Complete project
 *         description: Finish the backend API
 */
/**
 * @swagger
 * /api/task:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       201:
 *         description: Task created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post("/", userMiddleware, requestLogMiddleware, createTaskService);
/**
 * @swagger
 * /api/task:
 *   get:
 *     summary: Get all tasks
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: List of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       401:
 *         description: Unauthorized
 */
router.get("/", userMiddleware, requestLogMiddleware, getTaskService);
/**
 * @swagger
 * /api/task/{id}:
 *   get:
 *     summary: Get task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Task data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       401:
 *         description: Unauthorized
 */
router.get("/:id", userMiddleware, requestLogMiddleware, getTaskByIdService);
/**
 * @swagger
 * /api/task/{id}:
 *   put:
 *     summary: Update task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.put("/:id", userMiddleware, requestLogMiddleware, updateTaskService);
/**
 * @swagger
 * /api/task/{id}:
 *   delete:
 *     summary: Delete task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       401:
 *         description: Unauthorized
 */
router.delete("/:id", userMiddleware, requestLogMiddleware, deleteTaskService);
export default router;
//# sourceMappingURL=task.route.js.map