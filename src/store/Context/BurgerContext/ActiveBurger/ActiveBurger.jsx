import { useState, createContext, useContext, useEffect } from "react";
import PropTypes from "prop-types";

const BurgerContext = createContext();

const BurgerProvider = ({ children }) => {
    const [isBurgerActive, setIsBurgerActive] = useState(false);
    const [isMobile, setIsMobile] = useState(() => window.innerWidth < 640);

    const handleResize = () => {
        setIsMobile(window.innerWidth < 640);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const toggleBurger = () => {
        setIsBurgerActive(!isBurgerActive);
    };

    return (
        <BurgerContext.Provider value={{ isBurgerActive, toggleBurger, isMobile }}>
            {children}
        </BurgerContext.Provider>
    );
};

const useBurger = () => {
    const context = useContext(BurgerContext);
    if (!context) {
        throw new Error("useBurger must be used within a BurgerProvider");
    }
    return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { BurgerProvider, useBurger }

BurgerProvider.propTypes = {
    children: PropTypes.node.isRequired,
}
