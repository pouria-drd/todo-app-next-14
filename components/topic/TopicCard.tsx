"use client";

import Link from "next/link";
import { useState } from "react";
import BinIcon from "../icons/BinIcon";
import EditIcon from "../icons/EditIcon";
import TopicDocument from "@/types/Topic";
import formatDate from "@/utils/formatDate";
import TopicFormModal from "./TopicFormModal";
import { deleteTopicById } from "@/utils/TopicCRUD";

interface TopicCardProps {
    topic: TopicDocument;
    onUpdate: () => void;
}

const TopicCard = (props: TopicCardProps) => {
    const [openModal, setOpenModal] = useState(false);

    const handleDelete = async () => {
        const confirm = window.confirm(
            "Are you sure you want to delete this topic?"
        );
        if (!confirm) return;
        const result = await deleteTopicById(props.topic._id as string);
        props.onUpdate?.();
        if (result.error) {
            alert("Error deleting topic");
        }
    };

    return (
        <>
            <div
                className="bg-zinc-50
                flex flex-col justify-between gap-4
                ring-1 ring-gray-200 rounded-lg px-4 py-3">
                <div className="flex items-center justify-between">
                    <h2 className="text-drd-text-primary text-xl sm:text-2xl font-semibold truncate max-w-48">
                        {props.topic.title}
                    </h2>

                    <div className="flex items-center gap-2">
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
                <div className="flex items-center justify-between gap-1">
                    <p className="text-xs text-drd-text-secondary">
                        Created at {formatDate(props.topic.createdAt)}
                    </p>

                    <Link
                        href={`/topics/${props.topic._id}`}
                        className="text-blue-500/95 hover:text-blue-600 text-sm transition-all duration-200
                        underline underline-offset-2">
                        {props.topic.tasks?.length}{" "}
                        {props.topic.tasks?.length! > 1 ? "Tasks" : "Task"}
                    </Link>
                </div>
            </div>

            {openModal && (
                <TopicFormModal
                    topic={props.topic}
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

export default TopicCard;
