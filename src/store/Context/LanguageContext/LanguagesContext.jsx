import { createContext, useState, useEffect } from 'react';
import PropTypes from "prop-types";

const LanguagesContext = createContext();


export const LanguagesProvider = ({ children }) => {
    const [lang, setLang] = useState('EN');

    useEffect(() => {
        const storedLang = localStorage.getItem('lang');
        if (storedLang) {
            setLang(storedLang);
        }
    }, []);

    const changeLang = () => {
        const newLang = lang === 'UA' ? 'EN' : 'UA';
        setLang(newLang);
        localStorage.setItem('lang', newLang);
    };

    return (
        <LanguagesContext.Provider value={{ lang, changeLang }}>
            {children}
        </LanguagesContext.Provider>
    )
}

export default LanguagesContext;

LanguagesProvider.propTypes = {
    children: PropTypes.node
}

