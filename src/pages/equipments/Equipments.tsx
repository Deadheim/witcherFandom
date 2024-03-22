import {FC, useEffect, useState} from "react";
import '../../App.css'
import Header from "../../components/Header.tsx";
import Footer from "../../components/Footer.tsx";
import cl from "../characters/Characters.module.css";
import InfoBlock from "../../components/UI/InfoBlock/InfoBlock.tsx";
import {Equipment} from "../../admin/types/Types.ts";
import {getEquipments} from "../../admin/requests/RequestsEquipment.ts";

const Equipments: FC = () => {
    const [equipments, setEquipments] = useState<Equipment[]>([])
    useEffect( ()  => {
        getEquipments(setEquipments)
            .catch(error => {
                console.log(error)
            })
    }, [])
    console.log(equipments)

    return (
        <div className="page">
            <Header navBar={['characters', 'bestiary', 'locations', 'equipments', 'builds']}/>
            <div className={cl.mainBlock}>
                <div className="container">
                    <div className={cl.mainBlockInner}>
                        <h1 className={cl.title}>Equipments</h1>
                        <div className={cl.elements}>
                            {equipments ? equipments.map((eq) => {
                                return (
                                    <InfoBlock key={eq.id} src={eq.imageSource} name={eq.name} text={eq.text} alt='jpg' />
                                )
                            }): null}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Equipments;