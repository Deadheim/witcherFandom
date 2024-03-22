import {FC} from "react";
import cl from './TextInput.module.css';
import {textInput} from "../../types/Types.ts";

const TextInput: FC<textInput> = (props: textInput) => {
    return (
        <input
            className={cl.textInput}
            type={props.type || 'text'}
            value={props.value}
            onChange={props.onChange}
            placeholder={props.placeholder}
        />
    );
};

export default TextInput;