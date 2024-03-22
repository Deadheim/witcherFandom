import {FC, useEffect, useState} from "react";
import '../../App.css'
import Header from "../../components/Header.tsx";
import Footer from "../../components/Footer.tsx";
import cl from "../characters/Characters.module.css";
import InfoBlock from "../../components/UI/InfoBlock/InfoBlock.tsx";
import {Build} from "../../admin/types/Types.ts";
import {getBuilds} from "../../admin/requests/RequestsBuild.ts";

const Builds: FC = () => {
    const [builds, setBuilds] = useState<Build[]>([])
    useEffect( ()  => {
        getBuilds(setBuilds)
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
                        <h1 className={cl.title}>Builds</h1>
                        <div className={cl.elements}>
                            {builds ? builds.map((build) => {
                                return (
                                    <InfoBlock key={build.id} src={build.imageSource} name={build.name} text={build.text} alt='jpg' />
                                )
                            }) : null}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Builds;