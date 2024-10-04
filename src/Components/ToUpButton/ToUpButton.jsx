import React , {useState, memo} from 'react'
import {ArrowBadge} from "../icons/ArrowUp/ArrowBadge.jsx"

import styles from './ToUpButton.module.scss'
import cn from "classnames";




const ToUpButton = () => {
    const [isActive, setIsActive] = useState(false)

    const scrollToTop = () => {
        setIsActive(prevState => !prevState);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    return (
        <button
            className={cn(styles.arrowNorm, {[styles.arrowActive]: isActive})}
            onClick={scrollToTop}
        >
            <ArrowBadge />
        </button>
    )
}

export default memo(ToUpButton)