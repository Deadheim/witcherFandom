import {FC} from "react";
import cl from './InfoBlock.module.css'
import {Link} from "react-router-dom";
interface IInfo {
    id?: string,
    src: string | undefined,
    alt?: string,
    children?: string,
    name: string,
    text: string,
}
const InfoBlock: FC<IInfo> = ({src, alt, children, name, text, id}) => {

    return (
        <div className={cl.information}>
            <div className={cl.block}>
                <img className={cl.infoPhoto} src={src} alt={alt}>
                    {children}
                </img>
                <div className={cl.infoName}>
                    {name}
                </div>
                <div className={cl.hoverInfo}>
                    {text}
                </div>
                <Link to='/about' state={id} className={cl.extraLink}>
                    Find out more &#8594;
                </Link>
            </div>
        </div>
    );
};

export default InfoBlock;
