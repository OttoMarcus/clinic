import React from "react"
import PropTypes from "prop-types"

import cn from "classnames"
import styles from "./CardLabel.module.scss"



const CardLabel = ({classname, text}) => {
    return (
        <div className={cn(styles.cardLabel, classname)}>
            {text}
        </div>
    )
}

export default CardLabel

CardLabel.propTypes = {
    classname: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
}
