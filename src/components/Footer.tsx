import cl from '../styles/Footer.module.css'
import '../App.css'
import React, {FC} from "react";
import witcherLogo from "../assets/mainPage/witcherLogo.png";
import {Link} from "react-router-dom";

const Footer: FC = () => {
    const navBar: string[] = ['characters', 'bestiary', 'locations', 'equipments', 'builds']
    const support: string[] = ['Legal policy', 'Status policy', 'Privacy policy', 'Terms of service']

    return (
        <footer className={cl.footer}>
            <div className="container">
                <div className={cl.footerInner}>
                    <div className={cl.footerInfo}>
                        <div className={cl.footerLogo}>
                            <img className={cl.logoPng} src={witcherLogo} alt=""/>
                            <h2 className={cl.logoText}>The Witcher</h2>
                        </div>
                        <div className={cl.copyright}>
                            Copyright © 2024 The witcher
                            All rights reserved
                        </div>
                        <div className={cl.media}>
                            VK, YT
                        </div>
                    </div>
                    <div className={cl.footerNav}>
                        <h2 className={cl.navTitle}>Menu</h2>
                        {navBar.map((item, index): React.ReactNode  => {
                            return <Link className={cl.footerNavLink} to={'/' + item} key={index}>{item}</Link>;
                        })}
                    </div>
                    <div className={cl.footerNav}>
                        <h2 className={cl.navTitle}>Support</h2>
                        {support.map((item, index): React.ReactNode  => {
                            return <Link className={cl.footerNavLink} to={'/' + item} key={index}>{item}</Link>;
                        })}
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default Footer;