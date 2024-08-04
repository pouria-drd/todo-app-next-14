import User from "@/types/User";
import ProfileTitle from "./ProfileTitle";
import formatDate from "@/utils/formatDate";
import { Badge, Button } from "@/components/ui";
import ProfileInfoTable from "./ProfileInfoTable";

interface ProfileCardProps {
    user: User;
}

const ProfileCard = (props: ProfileCardProps) => {
    const formattedCreatedAt = formatDate(props.user.createdAt);
    const formattedUpdatedAt = formatDate(props.user.updatedAt);

    return (
        <div className="bg-drd-bg-primary shadow-lg rounded-lg p-8  space-y-4 sm:min-w-96 w-full sm:w-fit">
            <ProfileTitle user={props.user} />
            <div className="space-y-4">
                <ProfileInfoTable title="Status">
                    <Badge
                        status={props.user.isActive ? "active" : "inactive"}
                    />
                </ProfileInfoTable>
                <ProfileInfoTable
                    title="Last Updated:"
                    content={formattedUpdatedAt}
                />
                <ProfileInfoTable
                    title="Account Created:"
                    content={formattedCreatedAt}
                />
            </div>
            <Button>Edit</Button>
        </div>
    );
};

export default ProfileCard;
