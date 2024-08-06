import TaskCard from "./TaskCard";
import TaskDocument from "@/types/Task";

interface TaskListProps {
    topicId: string;
    tasks: TaskDocument[];
    onUpdate: () => void;
}

const TaskList = (props: TaskListProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {props.tasks.length === 0 ? (
                <div className="text-drd-text-secondary">
                    You have no tasks yet.
                </div>
            ) : (
                props.tasks.map((task) => (
                    <TaskCard
                        topicId={props.topicId}
                        key={task._id as string}
                        task={task}
                        onUpdate={props.onUpdate}
                    />
                ))
            )}
        </div>
    );
};

export default TaskList;
