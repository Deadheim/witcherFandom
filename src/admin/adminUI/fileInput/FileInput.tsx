
import cl from './FileInput.module.css'
import {FC, useId} from "react";
import {fileInput} from "../../types/Types.ts";


const FileInput: FC<fileInput> = ({onChange, img}) => {

    const id = useId()
    return (
        <label htmlFor={id} className={cl.fileInput}>
            <input type="file" className={cl.file} multiple id={id} onChange={onChange}/>
            {img ? <span>{img.name}</span>: <span>Choose file</span>}
        </label>
    );
};

export default FileInput;