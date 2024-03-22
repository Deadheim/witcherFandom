import {FC, useEffect, useState} from "react";
import '../../App.css'
import Header from "../../components/Header.tsx";
import Footer from "../../components/Footer.tsx";
import cl from "../characters/Characters.module.css";
import InfoBlock from "../../components/UI/InfoBlock/InfoBlock.tsx";
import {Environment} from "../../admin/types/Types.ts";
import {getEnvironments} from "../../admin/requests/RequestsEnvironment.ts";

const Bestiary: FC = () => {
    const [environments, setEnvironments] = useState<Environment[]>([])
    useEffect( ()  => {
        getEnvironments(setEnvironments)
            .catch(error => {
                console.log(error)
            })
    }, [])
    return (
        <div className="page">
            <Header navBar={['characters', 'bestiary', 'locations', 'equipments', 'builds']}/>
            <div className={cl.mainBlock}>
                <div className="container">
                    <div className={cl.mainBlockInner}>
                        <h1 className={cl.title}>Bestiary</h1>
                        <div className={cl.elements}>
                            {environments ? environments.map((env) => {
                                if (env.category === 'Bestiary') {
                                    return (
                                        <InfoBlock id={env.id} key={env.id} src={env.imageSource} name={env.name} text={env.text} alt='jpg' />
                                    )
                                }
                            }) : null}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Bestiary;