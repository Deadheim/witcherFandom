import {ChangeEvent, FC} from "react";
import cl from './AuthInput.module.css'

type AuthInputType = {
    value: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    placeholder: string
}
const AuthInput: FC<AuthInputType> = ({value, onChange, placeholder}) => {
    return (
        <input className={cl.authInput} type='text' value={value} onChange={onChange} placeholder={placeholder}/>
    );
};

export default AuthInput;