import cl from './Authorization.module.css'
import {FC, useState} from "react";
import {Link} from "react-router-dom";
import AuthInput from "../../components/UI/AuthInput/AuthInput.tsx";


const Authorization: FC = () => {
    const data = {
        login: 'admin',
        password: '123',
    }
    const [auth, setAuth] = useState({
        login: '',
        password: ''
    })
    const [err, setErr] = useState('')
    const check: boolean = data.login === auth.login && data.password === auth.password

    return (
        <div className={cl.authorization}>
            <div className={cl.authInner}>
                <h1 className={cl.authTitle}>Authorization</h1>
                <form action="" className={cl.authForm}>
                    <AuthInput placeholder={'Login'} value={Object.values(auth)[0]} onChange={(event) => setAuth({...auth, login: event.target.value})}/>
                    <AuthInput placeholder={'Password'} value={Object.values(auth)[1]} onChange={(event) => setAuth({...auth, password: event.target.value})}/>
                    <span>{err}</span>
                    <Link onClick={() => {
                        if(!check) {
                            setErr('Invalid login or password')
                        } else {
                            console.log(1)
                        }}} to={check ? '/adminPanel' : ''} className={cl.authLink}>Auth</Link>
                </form>
            </div>
        </div>
    );
};

export default Authorization;