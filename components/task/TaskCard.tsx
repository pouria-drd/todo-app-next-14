"use client";

import { useState } from "react";
import BinIcon from "../icons/BinIcon";
import TaskDocument from "@/types/Task";
import EditIcon from "../icons/EditIcon";
import formatDate from "@/utils/formatDate";
import TaskFormModal from "./TaskFormModal";
import { deleteTaskById, updateTaskById } from "@/utils/taskCRUD";

interface TaskCardProps {
    topicId: string;
    task: TaskDocument;
    onUpdate: () => void;
}

const TaskCard = (props: TaskCardProps) => {
    const [openModal, setOpenModal] = useState(false);
    const [isComplete, setIsComplete] = useState(props.task.isCompleted);

    const handleDelete = async () => {
        const confirm = window.confirm(
            "Are you sure you want to delete this task?"
        );
        if (!confirm) return;
        const result = await deleteTaskById(
            props.topicId,
            props.task._id as string
        );
        props.onUpdate?.();
        if (result.error) {
            alert("Error deleting task");
        }
    };

    const handleCheckboxChange = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const checked = event.target.checked;
        setIsComplete(checked);

        const result = await updateTaskById(
            props.topicId,
            props.task._id as string,
            { isCompleted: checked }
        );
        if (result.error) {
            alert("Error updating task status");
        }
    };

    return (
        <>
            <div
                className="bg-zinc-50
                flex flex-col justify-between gap-4
                ring-1 ring-gray-200 rounded-lg px-4 py-3">
                <div className="flex items-center justify-between">
                    <h2
                        className={`text-lg font-semibold text-drd-text-primary truncate max-w-xs ${
                            isComplete ? "line-through" : ""
                        }`}>
                        {props.task.content}
                    </h2>
                    <div className="flex items-center gap-3.5">
                        <button
                            onClick={() => setOpenModal(true)}
                            className="text-drd-primary/90 hover:text-drd-primary transition-all duration-200">
                            <EditIcon />
                        </button>

                        <button
                            onClick={handleDelete}
                            className="text-red-500/95 hover:text-red-600 transition-all duration-200">
                            <BinIcon />
                        </button>
                    </div>
                </div>

                <div className="flex items-end justify-between gap-1">
                    <div className="flex flex-col justify-between gap-1">
                        <p className="text-xs text-drd-text-secondary">
                            added at {formatDate(props.task.createdAt)}
                        </p>
                        <p className="text-xs text-drd-text-secondary">
                            edited at {formatDate(props.task.updatedAt)}
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            id="complete"
                            name="complete"
                            type="checkbox"
                            checked={isComplete}
                            onChange={handleCheckboxChange}
                            className="size-4 cursor-pointer"
                        />
                        <label
                            htmlFor="complete"
                            className="text-drd-text-primary text-sm cursor-pointer">
                            Done
                        </label>
                    </div>
                </div>
            </div>

            {openModal && (
                <TaskFormModal
                    topicId={props.topicId}
                    task={props.task}
                    openModal={openModal}
                    onCloseModal={() => setOpenModal(false)}
                    onSubmit={() => {
                        setOpenModal(false);
                        props.onUpdate?.();
                    }}
                />
            )}
        </>
    );
};

export default TaskCard;
