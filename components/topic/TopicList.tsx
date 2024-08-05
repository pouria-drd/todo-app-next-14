import TopicCard from "./TopicCard";
import TopicDocument from "@/types/Topic";

interface TopicListProps {
    topics: TopicDocument[];
    onUpdate: () => void;
}

const TopicList = (props: TopicListProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {props.topics.length === 0 ? (
                <div className="text-drd-text-secondary">
                    You have no topics yet.
                </div>
            ) : (
                props.topics.map((topic) => (
                    <TopicCard
                        key={topic._id as string}
                        topic={topic}
                        onUpdate={props.onUpdate}
                    />
                ))
            )}
        </div>
    );
};

export default TopicList;
