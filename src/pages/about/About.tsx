import cl from './About.module.css'
import '../../App.css'
import Header from "../../components/Header.tsx";
import Footer from "../../components/Footer.tsx";


import {FC, useEffect, useState} from "react";
import {Environment} from "../../admin/types/Types.ts";
import axios from "axios";
import {apiKeys} from "../../admin/env/Env.ts";
import {useLocation} from "react-router-dom";



const About: FC = () => {

    const [environment, setEnvironment] = useState<Environment>({
        id: '',
        name: '',
        text: '',
        alias: '',
        race: '',
        profession: '',
        nationality: '',
        categoryId: '',
        category: '',
        imageSource: '',
        imageFile: undefined,
    })
    const location = useLocation()
    console.log(environment)
    const image: string = '/src/assets/aboutPage/' + environment.category.toLowerCase() + '/' + environment.name.toLowerCase().split(' ')[0] + '.png'


    useEffect(() => {
        axios.get(apiKeys.ENV_API + location.state)
            .then(response => {
                setEnvironment(response.data)
            })
    }, [location.state]);
    return (
        <div className="page">
            <Header navBar={['characters', 'bestiary', 'locations', 'equipments', 'builds']}/>
            <div className={cl.about}>
                <div className="container">
                    <div className={cl.aboutInner}>
                        <img src={image} alt="" height={600}/>
                        <div className={cl.aboutInfo}>
                            <h1 className={cl.aboutName}>{environment.name}</h1>
                            <blockquote className={cl.aboutQuote}>
                                &laquo;Evil is evil&raquo;
                            </blockquote>
                            <div className={cl.description}>
                                <div className={cl.stats}>
                                    <div className={cl.stat}>
                                        <div className={cl.statTitle}>
                                            Alias
                                        </div>
                                        <div>
                                            {environment.alias}
                                        </div>
                                    </div>
                                    <div className={cl.stat}>
                                        <div className={cl.statTitle}>
                                            Race
                                        </div>
                                        <div>
                                            {environment.race}
                                        </div>
                                    </div>
                                    <div className={cl.stat}>
                                        <div className={cl.statTitle}>
                                            Profession
                                        </div>
                                        <div>
                                            {environment.profession}
                                        </div>
                                    </div>
                                    <div className={cl.stat}>
                                        <div className={cl.statTitle}>
                                            Nationality
                                        </div>
                                        <div>
                                            {environment.nationality}
                                        </div>
                                    </div>
                                </div>
                                <div className={cl.history}>
                                    {environment.text}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
            <Footer/>
        </div>
    );
};

export default About;