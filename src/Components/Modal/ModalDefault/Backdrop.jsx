import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import styles from './Modal.module.scss'

const Backdrop = ({children, classname= ''}) => {

    return (
        <div className={cn(styles.backdrop, classname)}>{children}</div>
    )
}

Backdrop.propTypes = {
    classname: PropTypes.string,
    children: PropTypes.any,
}


export default Backdrop