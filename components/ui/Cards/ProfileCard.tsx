import formatDate from "@/utils/formatDate";
import { Badge, Button } from "@/components/ui";

interface User {
    username: string;
    role: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

interface ProfileCardProps {
    user: User;
    onSignOut: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user, onSignOut }) => {
    const formattedCreatedAt = formatDate(user.createdAt);
    const formattedUpdatedAt = formatDate(user.updatedAt);

    return (
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full mx-auto border border-gray-200">
            <div className="flex flex-col items-center mb-6">
                {/* Profile Picture */}
                <div className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden border-4 border-gray-300 mb-4">
                    <img
                        src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.username}`}
                        alt="Profile Picture"
                        className="w-full h-full object-cover"
                    />
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                    {user.username}
                </h1>
                <p className="text-gray-600 text-lg">{user.role}</p>
                <Badge status={user.isActive ? "active" : "inactive"} />
            </div>
            <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-700">
                    <span className="font-semibold">Account Created:</span>
                    <span>{formattedCreatedAt}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                    <span className="font-semibold">Last Updated:</span>
                    <span>{formattedUpdatedAt}</span>
                </div>
            </div>
            <Button
                onClick={onSignOut}
                className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 transition duration-300">
                Log Out
            </Button>
        </div>
    );
};

export default ProfileCard;
