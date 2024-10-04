import React from 'react'
import PropTypes from 'prop-types'

import styles from './Modal.module.scss'


const ModalClose = ({setIsModalActive}) => {
    return (
        <div className={styles.closeContainer} onClick={()=>setIsModalActive(false)}>
            <div className={styles.barra}></div>
        </div>
    )
}

ModalClose.propTypes = {
    setIsModalActive: PropTypes.func.isRequired
}

export default ModalClose
