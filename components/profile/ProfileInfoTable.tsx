interface ProfileInfoTableProps {
    title: string;
    content?: string;
    children?: React.ReactNode;
}

const ProfileInfoTable = (props: ProfileInfoTableProps) => {
    return (
        <div className="flex justify-between">
            <span className="text-drd-text-primary text-sm sm:text-base font-semibold">
                {props.title}
            </span>
            <span className="text-drd-text-secondary text-sm sm:text-base">
                {props.content}
            </span>
            {props.children}
        </div>
    );
};

export default ProfileInfoTable;
