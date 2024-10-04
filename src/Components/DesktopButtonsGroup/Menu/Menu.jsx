import React, {useRef, useEffect, useContext} from 'react'
import { Link, NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import { translation } from '../../../store/Context/LanguageContext/translation/translation.js'
import LanguagesContext from '../../../store/Context/LanguageContext/LanguagesContext.jsx'
import cn from 'classnames'
import styles from './Menu.module.scss'


const Menu = ({ classname, setIsActive }) => {
    const { lang } = useContext(LanguagesContext);
    const{ doctors, patients, calendar } = translation[lang];
    const menuRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsActive(false);
            }
        };


        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [setIsActive]);

    return (
        <nav className={cn(styles.menu, { [styles.active]: classname })} ref={menuRef}>
            <ul className={styles.menuList}>
                <li className={styles.menuItem} onClick={()=>setIsActive(false)}>
                    <NavLink to="/doctors" className={({isActive}) => isActive ? styles.activeLink : styles.linkItem}>{doctors}</NavLink>
                </li>
                <li className={styles.menuItem} onClick={()=>setIsActive(false)}>
                    <NavLink to={"/patients"} className={({isActive}) => isActive ? styles.activeLink : styles.linkItem}>{patients}</NavLink>
                </li>
                <li className={styles.menuItem} onClick={()=>setIsActive(false)}>
                    <NavLink to={"/calendar"} className={({isActive}) => isActive ? styles.activeLink : styles.linkItem}>{calendar}</NavLink>
                </li>
            </ul>
        </nav>
    );
};

Menu.propTypes = {
    classname: PropTypes.bool.isRequired,
    setIsActive: PropTypes.func.isRequired,
};

export default Menu;
