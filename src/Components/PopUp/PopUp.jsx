import PropTypes from "prop-types"

import cn from "classnames"
import styles from "./PopUp.module.scss"



const PopUp = ({ children='', activePopUp= false }) => {
    return (
        <div className={cn(styles.containerPopup, {[styles.active]: activePopUp})}>
            {children}
        </div>
    )
}

export default PopUp


PopUp.propTypes = {
    children: PropTypes.node,
    activePopUp: PropTypes.bool
}
