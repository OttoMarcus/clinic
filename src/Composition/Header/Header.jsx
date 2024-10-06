import { useContext } from 'react'

import Button from '../../Components/Button/Button'
import ArrowRight from '../../Components/icons/ArrowRight/ArrowRight'
import Xclose from '../../Components/Button/Xclose/Xclose'
import { useBurger } from '../../store/Context/BurgerContext/ActiveBurger/ActiveBurger'
import useScroll from "../../helper/useScroll"

import DesktopButtonsGroup from '../../Components/DesktopButtonsGroup/DesktopButtonsGroup'

import LanguagesContext from '../../store/Context/LanguageContext/LanguagesContext'
import { translation } from '../../store/Context/LanguageContext/translation/translation'

import cn from 'classnames'
import styles from './Header.module.scss'




const Header = () => {
    const { lang } = useContext(LanguagesContext);
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
                <Button classname={cn(styles.btnX)} click={toggleBurger}><Xclose/></Button>
                <Button classname={cn(styles.btnBlackWide, styles.hidden)}>{visit}</Button>
                    {!isMobile &&  <DesktopButtonsGroup />}
                <Button classname={styles.btnGrey} click={logOut}><ArrowRight/></Button>
            </div>
        </header>
    )
}

export default Header