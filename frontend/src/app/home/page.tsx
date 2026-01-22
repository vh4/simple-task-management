"use client"

import { useEffect } from "react";
import { DataTable } from "./components/Table";
import { columns } from "./columns";
import { useTaskStore } from "@/store/taskStore";
import { TaskDialog } from "./components/TaskDialog";
import { Button } from "@/components/ui/button";

export default function Home() {
    const { tasks, fetchTasks, loading } = useTaskStore();

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    return (
        <div className="container mx-auto py-10">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Tasks</h1>
                <TaskDialog
                    trigger={<Button>Create Task</Button>}
                />
            </div>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <DataTable columns={columns} data={tasks} />
            )}
        </div>
    )
}