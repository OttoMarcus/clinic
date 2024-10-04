import React, { useState, useContext } from 'react'

import Button from '../../Components/Button/Button.jsx'
import ArrowRight from '../../Components/icons/ArrowRight/ArrowRight.jsx'
import Sort from '../../Components/icons/Sort/Sort.jsx'
import Xclose from '../../Components/Button/Xclose/Xclose.jsx'
import { useBurger } from '../../store/Context/BurgerContext/ActiveBurger/ActiveBurger.jsx'
import useScroll from "../../helper/useScroll.js"

import DesktopButtonsGroup from '../../Components/DesktopButtonsGroup/DesktopButtonsGroup.jsx'

import LanguagesContext from '../../store/Context/LanguageContext/LanguagesContext.jsx'
import { translation } from '../../store/Context/LanguageContext/translation/translation.js'

import cn from 'classnames'
import styles from './Header.module.scss'




const Header = () => {
    const { lang, changeLang } = useContext(LanguagesContext);
    const { isBurgerActive, toggleBurger, isMobile } = useBurger();
    const scroll = useScroll(200)
    const { visit } = translation[lang]
    const backdrop = cn(styles.backDrop, {[styles.activeBurger]: isBurgerActive && isMobile});

    const logOut = () => {
        sessionStorage.removeItem('isAuthenticated');
        window.location.reload();
    }

    return (
        <header className={cn({[styles.headerWrapper] : scroll > 200})}>
            <div className={cn(styles.headerBody, styles.container)}>
                <div className={backdrop}></div>
                <Button classname={cn(styles.btnX)} children={<Xclose/>} click={toggleBurger}/>
                <Button classname={cn(styles.btnBlackWide, styles.hidden)} children={visit} />
                    {!isMobile &&  <DesktopButtonsGroup />}
                <Button classname={styles.btnGrey} children={<ArrowRight/>} click={logOut}/>
            </div>
        </header>
    )
}

export default Header