import {FC} from 'react';
import cl from './MainButton.module.css'


interface IMainButton  {
    children: string;
}
const MainButton: FC<IMainButton> = ({children}) => {
    return (
        <a href='https://www.youtube.com/watch?v=dQw4w9WgXcQ' className={cl.mainButton}>
            {children}
        </a>
    );
};

export default MainButton;