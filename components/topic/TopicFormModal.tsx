"use client";

import TopicDocument from "@/types/Topic";
import { Button, Input, Modal } from "../ui";
import { FormEvent, useRef, useState } from "react";
import { createTopic, updateTopicId } from "@/utils/TopicCRUD";

interface TopicFormProps {
    openModal: boolean;
    onCloseModal: () => void;
    topic?: TopicDocument;
    onSubmit?: () => void;
}

const TopicFormModal = (props: TopicFormProps) => {
    const formRef = useRef<HTMLFormElement>(null);
    const [error, setError] = useState<string | null>(null);

    const handleCreate = async (formData: FormData) => {
        const title = formData.get("title") as string;
        formRef.current?.reset();

        if (!title) {
            setError("Title is required.");
            return;
        }

        const result = await createTopic({ title });
        if (result.error) {
            setError("Error creating topic");
        }
    };

    const handleUpdate = async (formData: FormData) => {
        const title = formData.get("title") as string;
        formRef.current?.reset();

        if (!title) {
            setError("Title is required.");
            return;
        }

        const result = await updateTopicId(props.topic?._id as string, {
            title,
        });

        if (result.error) {
            setError("Error updating topic");
            return;
        }
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        setError(null);
        if (props.topic) {
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
            title={props.topic ? "Edit topic" : "Add new topic"}>
            <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 w-full">
                <div className="flex items-center justify-between gap-4 w-full">
                    <Input
                        defaultValue={props.topic?.title}
                        placeholder="title"
                        name="title"
                        type="text"
                        required
                    />
                    <Button type="submit">
                        {props.topic ? "Edit" : "Add"}
                    </Button>
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
            </form>
        </Modal>
    );
};

export default TopicFormModal;
