import TopicFormModal from "@/components/topic/TopicFormModal";

const TopicDetailPage = ({ params }: { params: { id: string } }) => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Edit Topic</h1>
            <TopicFormModal topicID={params.id} />
        </div>
    );
};

export default TopicDetailPage;
