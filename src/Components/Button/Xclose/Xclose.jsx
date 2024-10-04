import React, {memo} from 'react'
import { useBurger } from '../../../store/Context/BurgerContext/ActiveBurger/ActiveBurger.jsx'

import cn from 'classnames'
import styles from './Xclose.module.scss'


const Xclose = () => {
    const { isBurgerActive } = useBurger();

    return (
        <div className={cn(styles.Xcontainer, {[styles.activeBurger]: isBurgerActive})}>
            <span/>
        </div>
    )
} 

export default memo(Xclose)