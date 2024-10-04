import React, { createContext, useState, useEffect } from 'react';

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
    );
};

export default LanguagesContext;
