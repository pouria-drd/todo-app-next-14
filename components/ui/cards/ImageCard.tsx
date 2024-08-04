interface ImageCardProps {
    seed: string;
}

const ImageCard = (props: ImageCardProps) => {
    return (
        <div
            className="bg-gray-100 overflow-hidden 
            rounded-full border-4 border-gray-300 size-32">
            <img
                src={`https://api.dicebear.com/6.x/initials/svg?seed=${props.seed}`}
                alt="Profile Picture"
                className="size-full object-cover"
            />
        </div>
    );
};

export default ImageCard;
