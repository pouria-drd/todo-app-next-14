import { TextareaHTMLAttributes } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}
const TextArea = (props: TextAreaProps) => {
    return (
        <textarea
            rows={props.rows || 4}
            placeholder={props.placeholder}
            className={`border border-gray-300 transition-all duration-150
            focus:outline-none focus:ring-2 focus:ring-drd-primary 
            rounded px-3 py-2
        ${props.className}`}
            {...props}
        />
    );
};

export default TextArea;
