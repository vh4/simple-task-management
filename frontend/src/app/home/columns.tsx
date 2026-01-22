"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
// import { Checkbox } from "@/components/ui/checkbox"
import { useTaskStore } from "@/store/taskStore"
import { TaskDialog } from "./components/TaskDialog"

export type Task = {
    id: string
    title: string
    description: string
    status: "PENDING" | "IN_PROGRESS" | "COMPLETED"
    deadline: Date | null
    createdAt: Date
    updatedAt: Date
}

export const columns: ColumnDef<Task>[] = [
    // {
    //     id: "select",
    //     header: ({ table }) => (
    //         <Checkbox
    //             checked={
    //                 table.getIsAllPageRowsSelected() ||
    //                 (table.getIsSomePageRowsSelected() && "indeterminate")
    //             }
    //             onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //             aria-label="Select all"
    //         />
    //     ),
    //     cell: ({ row }) => (
    //         <Checkbox
    //             checked={row.getIsSelected()}
    //             onCheckedChange={(value) => row.toggleSelected(!!value)}
    //             aria-label="Select row"
    //         />
    //     ),
    //     enableSorting: false,
    //     enableHiding: false,
    // },
    {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("title")}</div>
        ),
    },
    {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => (
            <div className="truncate max-w-[200px]" title={row.getValue("description")}>
                {row.getValue("description")}
            </div>
        ),
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("status")}</div>
        ),
    },
    {
        accessorKey: "deadline",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Deadline
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const deadline = row.getValue<string | Date | null>("deadline")
            if (!deadline) return "-"
            return <div className="lowercase">{new Date(deadline).toLocaleDateString()}</div>
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const task = row.original
            const { deleteTask } = useTaskStore()

            return (
                <div className="flex items-center gap-2">
                    <TaskDialog
                        task={task}
                        trigger={
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Edit task</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        }
                    />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                                onClick={() => navigator.clipboard.writeText(task.id)}
                            >
                                Copy task ID
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => {
                                    if (confirm("Are you sure you want to delete this task?")) {
                                        deleteTask(task.id)
                                    }
                                }}
                                className="text-red-600 focus:text-red-600 focus:bg-red-50"
                            >
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
        },
    },
]
