import React, {useContext} from 'react'
import { translation } from '../../store/Context/LanguageContext/translation/translation.js'
import LanguagesContext from '../../store/Context/LanguageContext/LanguagesContext.jsx'

import styles from './Footer.module.scss'
const Footer = () => {
    const currentYear = new Date().getFullYear();
    const { lang } = useContext(LanguagesContext);
    const { support, rights } = translation[lang];

    return (
        <footer className={styles.footerWrapper}>
          <div className={styles.container}>
            <ul className={styles.contentWrapper}>
               <li><a>{support}</a></li>
               <li><a>{rights}</a></li>
            </ul>
            <div className={styles.produced}>
                Produced by
                <a href={'https://benedict-studio.com'}>&nbsp;Benedict-studio&nbsp;</a>
                &copy; {currentYear}
            </div>
          </div>
        </footer>
    )
}

export default Footer