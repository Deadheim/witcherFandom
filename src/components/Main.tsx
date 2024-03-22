import {FC, useEffect, useState} from 'react';
import cl from '../styles/Main.module.css'
import '../App.css'
import MainButton from "./UI/MainButton/MainButton.tsx";
import InfoBlock from "./UI/InfoBlock/InfoBlock.tsx";
import {Environment} from "../admin/types/Types.ts";
import {getEnvironments} from "../admin/requests/RequestsEnvironment.ts";


const Main: FC = () => {

    const [environments, setEnvironments] = useState<Environment[]>([])
    useEffect( ()  => {
        getEnvironments(setEnvironments)
            .catch(error => {
                console.log(error)
            })
    }, [])

    return (
        <div className={cl.main}>
            <div className={cl.mainInner}>
                <div className="container">
                    <div className={cl.frontBlock}>
                        <h1 className={cl.title}>
                            Evil is evil
                        </h1>
                        <div className={cl.subTitle}>
                            Lesser, greater, middling, makes no difference. The degree is arbitrary.
                            The definitions blurred. If I'm to choose between one evil and another, I'd rather not choose at all.
                        </div>
                        <MainButton children={'Subscribe'}/>
                    </div>
                </div>
            </div>

            <div className={cl.charactersBlock}>
                <div className="container">
                    <h1 className={cl.nameBlock}>
                        Characters
                    </h1>
                    <div className={cl.infoBlock}>
                        {environments ? environments.map((env) => {
                            if (env.category === 'Characters' && (env.name === 'Geralt' || env.name === 'Yennefer' || env.name === 'Cirilla')) {
                                return (
                                        <InfoBlock id={env.id} src={env.imageSource} key={env.id} name={env.name} text={env.text} alt='jpg' />
                                )
                            }
                        }) : null}
                    </div>
                </div>

            </div>
            <div className={cl.bestiaryBlock}>
                <div className="container">
                    <h1 className={cl.nameBlock}>
                        Bestiary
                    </h1>
                    <div className={cl.infoBlock}>
                        {environments ? environments.map((env) => {
                            if (env.category === 'Bestiary') {
                                return (
                                    <InfoBlock id={env.id} src={env.imageSource} key={env.id} name={env.name} text={env.text} alt='jpg' />
                                )
                            }
                        }) : null}
                    </div>
                </div>

            </div>
            <div className={cl.locationsBlock}>
                <div className="container">
                    <h1 className={cl.nameBlock}>
                        Locations
                    </h1>
                    <div className={cl.infoBlock}>
                        {environments ? environments.map((env) => {
                            if (env.category === 'Locations') {
                                return (
                                    <InfoBlock id={env.id} src={env.imageSource} key={env.id} name={env.name} text={env.text} alt='jpg' />
                                )
                            }
                        }) : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;