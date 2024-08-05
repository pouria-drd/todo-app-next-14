interface BackdropProps {
    onClose: () => void;
    children: React.ReactNode;
}

const Backdrop = (props: BackdropProps) => {
    return (
        <div
            className="bg-black/50 fixed inset-0 flex items-center justify-center z-10 p-4"
            onClick={props.onClose}>
            {props.children}
        </div>
    );
};

export default Backdrop;
