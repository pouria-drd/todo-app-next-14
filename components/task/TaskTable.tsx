"use client";

import { Button } from "../ui";
import TaskDocument from "@/types/Task";
import { useEffect, useState } from "react";
import TaskFormModal from "./TaskFormModal";
import TaskList from "@/components/task/TaskList";
import { getTasksByTopic } from "@/utils/taskCRUD";

interface TaskTableProps {
    topicId: string;
}

const TaskTable = (props: TaskTableProps) => {
    const [openModal, setOpenModal] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [tasks, setTasks] = useState<TaskDocument[]>([]);

    const loadTasks = async () => {
        const result = await getTasksByTopic(props.topicId);

        if (result.error) {
            setError("Error loading tasks");
        } else {
            setTasks(result);
        }
    };

    useEffect(() => {
        loadTasks();
    }, []);
    return (
        <>
            <div
                className="bg-drd-bg-primary overflow-auto max-h-96
                flex flex-col gap-1 shadow-md rounded-lg">
                <div
                    className="sticky top-0 bg-drd-bg-primary/80 glass 
                    flex items-center justify-between
                    border-b border-gray-300 w-full p-4">
                    <h1 className="text-drd-text-primary text-xl sm:text-2xl font-bold">
                        My Tasks
                    </h1>

                    <Button onClick={() => setOpenModal(true)}>Add</Button>
                </div>

                <div className="w-full p-4">
                    {error ? (
                        <p className="text-red-500">{error}</p>
                    ) : (
                        <TaskList
                            topicId={props.topicId}
                            tasks={tasks}
                            onUpdate={loadTasks}
                        />
                    )}
                </div>
            </div>

            {openModal && (
                <TaskFormModal
                    topicId={props.topicId}
                    openModal={openModal}
                    onCloseModal={() => setOpenModal(false)}
                    onSubmit={() => {
                        setOpenModal(false);
                        loadTasks();
                    }}
                />
            )}
        </>
    );
};

export default TaskTable;
