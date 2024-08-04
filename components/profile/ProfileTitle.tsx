import User from "@/types/User";
import { ImageCard } from "../ui";

interface ProfileTitleProps {
    user: User;
}

const ProfileTitle = (props: ProfileTitleProps) => {
    return (
        <div className="flex flex-col items-center justify-start gap-4">
            {/* Profile Picture */}
            <ImageCard seed={props.user.username} />
            <h1 className="text-3xl sm:text-4xl font-bold text-drd-text-primary">
                {props.user.username}
            </h1>
            {/* <p className="text-gray-600 text-lg">{user.role}</p> */}
        </div>
    );
};

export default ProfileTitle;
