import TaskTable from "@/components/task/TaskTable";

const TopicDetailPage = ({ params }: { params: { id: string } }) => {
    return (
        <div className="flex flex-col gap-4">
            <TaskTable topicId={params.id} />
        </div>
    );
};

export default TopicDetailPage;
