import React, {FC} from "react";
import witcherLogo from "../assets/mainPage/witcherLogo.png";
import '../App.css'
import classes from '../styles/Header.module.css'
import {Link, NavLink} from "react-router-dom";



interface iProps {
    navBar: string[];
    logoText?: string
}
const Header: FC<iProps> = ({navBar, logoText}) => {

    return (
        <header className={classes.header}>
            <div className="container">
                <div className={classes.headerInner}>
                    <div className={classes.logo}>
                        <img className={classes.logoPng} src={witcherLogo} alt="logo"/>
                        <Link to='/' className={classes.logoText}>{logoText ? logoText: 'The Witcher'}</Link>
                    </div>
                    <nav className={classes.navbar}>
                        {navBar.map((item, index): React.ReactNode  => {
                            return <NavLink className={({isActive}) => (isActive ? classes.activeNavLink : classes.navLink)} to={logoText ? '/admin/' + item: '/' + item} key={index}>{item}</NavLink>;
                        })}
                    </nav>
                </div>
            </div>


        </header>

    );
};

export default Header;