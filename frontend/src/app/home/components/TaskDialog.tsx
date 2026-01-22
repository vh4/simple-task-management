"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useTaskStore } from "@/store/taskStore"
import { useState } from "react"
import { Task } from "../columns"

interface TaskDialogProps {
    task?: Task
    open?: boolean
    onOpenChange?: (open: boolean) => void
    trigger?: React.ReactNode
}

export function TaskDialog({ task, open, onOpenChange, trigger }: TaskDialogProps) {
    const { createTask, updateTask } = useTaskStore()
    const [title, setTitle] = useState(task?.title || "")
    const [description, setDescription] = useState(task?.description || "")
    const [status, setStatus] = useState<"PENDING" | "IN_PROGRESS" | "COMPLETED">(task?.status || "PENDING")
    const [deadline, setDeadline] = useState(
        task?.deadline ? new Date(task.deadline).toISOString().split("T")[0] : ""
    )
    const [isOpen, setIsOpen] = useState(false)

    const handleOpenChange = (newOpen: boolean) => {
        setIsOpen(newOpen)
        onOpenChange?.(newOpen)
        if (!newOpen && !task) {
            // Reset form on close if it's create mode
            setTitle("")
            setDescription("")
            setStatus("PENDING")
            setDeadline("")
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            if (task) {
                await updateTask(task.id, {
                    title,
                    description,
                    status,
                    deadline: deadline ? new Date(deadline) : null,
                })
            } else {
                await createTask({
                    title,
                    description,
                    status,
                    deadline: deadline ? new Date(deadline) : null,
                })
            }
            handleOpenChange(false)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Dialog open={open ?? isOpen} onOpenChange={handleOpenChange}>
            {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>{task ? "Edit Task" : "Create Task"}</DialogTitle>
                        <DialogDescription>
                            {task
                                ? "Make changes to your task here."
                                : "Add a new task to your list."}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="title" className="text-right">
                                Title
                            </Label>
                            <Input
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="col-span-3"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                                Description
                            </Label>
                            <Input
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="status" className="text-right">
                                Status
                            </Label>
                            <select
                                id="status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value as any)}
                                className="col-span-3 flex h-10 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <option value="PENDING">Pending</option>
                                <option value="IN_PROGRESS">In Progress</option>
                                <option value="COMPLETED">Completed</option>
                            </select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="deadline" className="text-right">
                                Deadline
                            </Label>
                            <Input
                                id="deadline"
                                type="date"
                                value={deadline}
                                onChange={(e) => setDeadline(e.target.value)}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
