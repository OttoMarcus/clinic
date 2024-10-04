import React from "react"
import PropTypes from 'prop-types'

import cn from 'classnames'
import styles from './Modal.module.scss'


const ModalWindow = ({children, classname = ''}) => {

    return (
        <div className={cn(styles.modalWindow, classname)}>{children}</div>
    )
}

ModalWindow.propTypes = {
    children: PropTypes.any.isRequired,
    classname: PropTypes.string
}


export default ModalWindow