"use client";

import { Button } from "../ui";
import TopicDocument from "@/types/Topic";
import { useEffect, useState } from "react";
import { getTopics } from "@/utils/TopicCRUD";
import TopicList from "@/components/topic/TopicList";
import TopicFormModal from "./TopicFormModal";

const TopicTable = () => {
    const [openModal, setOpenModal] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [topics, setTopics] = useState<TopicDocument[]>([]);

    const loadTopics = async () => {
        const result = await getTopics();

        if (result.error) {
            setError("Error loading topics");
        } else {
            setTopics(result);
        }
    };

    useEffect(() => {
        loadTopics();
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
                        My Topics
                    </h1>

                    <Button onClick={() => setOpenModal(true)}>Add</Button>
                </div>

                <div className="w-full p-4">
                    {error ? (
                        <p className="text-red-500">{error}</p>
                    ) : (
                        <TopicList topics={topics} onUpdate={loadTopics} />
                    )}
                </div>
            </div>

            {openModal && (
                <TopicFormModal
                    openModal={openModal}
                    onCloseModal={() => setOpenModal(false)}
                    onSubmit={() => {
                        setOpenModal(false);
                        loadTopics();
                    }}
                />
            )}
        </>
    );
};

export default TopicTable;
