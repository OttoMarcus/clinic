import React, { createContext, useState, useEffect } from 'react';

const LanguagesContext = createContext();

export const LanguagesProvider = ({ children }) => {
    const [lang, setLang] = useState('EN');
    useEffect(() => {
        const lang = localStorage.getItem('lang');
        if (lang) {
            setLang(lang);
        }
    }, []);

    const changeLang = (lang) => {
        if (lang === 'UA') {
            setLang('EN');
            localStorage.setItem('lang', 'EN');
            return;
        }
        if (lang=== 'EN') {
            setLang('UA');
            localStorage.setItem('lang', 'UA');
            return;
        }

    }

    return (
        <LanguagesContext.Provider value={{ lang, changeLang }}>
            {children}
        </LanguagesContext.Provider>
    );
};

export default LanguagesContext;
