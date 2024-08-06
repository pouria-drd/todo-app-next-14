"use client";

import TaskDocument from "@/types/Task";
import { Button, Modal, TextArea } from "../ui";
import { FormEvent, useRef, useState } from "react";
import { createTask, updateTaskById } from "@/utils/taskCRUD";

interface TaskFormProps {
    topicId: string;
    openModal: boolean;
    onCloseModal: () => void;
    task?: TaskDocument;
    onSubmit?: () => void;
}
const TaskFormModal = (props: TaskFormProps) => {
    const formRef = useRef<HTMLFormElement>(null);
    const [error, setError] = useState<string | null>(null);

    const handleCreate = async (formData: FormData) => {
        const content = formData.get("content") as string;
        formRef.current?.reset();

        if (!content) {
            setError("Content is required.");
            return;
        }

        const result = await createTask(props.topicId, {
            content,
        });

        if (result.error) {
            setError("Error creating task");
        }
    };

    const handleUpdate = async (formData: FormData) => {
        const content = formData.get("content") as string;
        formRef.current?.reset();

        if (!content) {
            setError("Content is required.");
            return;
        }

        const result = await updateTaskById(
            props.topicId,
            props.task?._id as string,
            {
                content,
            }
        );

        if (result.error) {
            setError("Error updating task");
            return;
        }
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        setError(null);
        if (props.task) {
            await handleUpdate(formData);
        } else {
            await handleCreate(formData);
        }

        props.onSubmit?.();
    };

    return (
        <Modal
            isOpen={props.openModal}
            onClose={props.onCloseModal}
            title={props.task ? "Edit task" : "Add new task"}>
            <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 w-full">
                {/* <div className="flex items-center justify-between gap-4 w-full"> */}
                <TextArea
                    defaultValue={props.task?.content}
                    placeholder="content"
                    name="content"
                    required
                />
                <Button type="submit">{props.task ? "Edit" : "Add"}</Button>
                {/* </div> */}
                {error && <p className="text-red-500 text-sm">{error}</p>}
            </form>
        </Modal>
    );
};

export default TaskFormModal;
