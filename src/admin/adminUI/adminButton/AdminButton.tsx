import {FC} from 'react';
import cl from './AdminButton.module.css';
import {adminButton} from "../../types/Types.ts";

const AdminButton: FC<adminButton> = (props: adminButton) => {
    return (
        <button onClick={props.onClick} className={cl.adminButton}>
            <img src={props.icon} alt="" width={21}/>
            <span>{props.children}</span>
        </button>
    );
};

export default AdminButton;