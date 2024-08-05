import Backdrop from "./Backdrop";
import CloseIcon from "@/components/icons/CloseIcon";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children?: React.ReactNode;
}

const Modal = (props: ModalProps) => {
    if (!props.isOpen) return null;

    return (
        <Backdrop onClose={props.onClose}>
            <div
                className="bg-drd-bg-primary 
				flex flex-col items-center gap-4
				rounded-lg w-full sm:w-fit p-4"
                onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between gap-2 w-full">
                    <h1 className="text-drd-text-primary text-xl sm:text-2xl font-bold max-w-full truncate">
                        {props.title}
                    </h1>

                    <button
                        className="text-drd-text-primary"
                        onClick={props.onClose}>
                        <CloseIcon />
                    </button>
                </div>

                {props.children}
            </div>
        </Backdrop>
    );
};

export default Modal;
