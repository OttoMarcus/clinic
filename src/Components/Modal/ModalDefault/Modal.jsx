import React from 'react'
import PropTypes from 'prop-types'
import Backdrop from './Backdrop.jsx'
import ModalWindow from './ModalWindow.jsx'
import ModalHeader from './ModalHeader.jsx'
import ModalClose from './ModalClose.jsx'
import ModalBody from './ModalBody.jsx'
import ModalFooter from './ModalFooter.jsx'
import cn from 'classnames'

import styles from './Modal.module.scss'
import backdrop from "./Backdrop.jsx";


const Modal = (props) => {
const {
    isModalClose= true,
    backdropStyles,
    title = '',
    isModalActive = false,
    setIsModalActive,
    children,
    textFirst,
    textSecondary,
    clickFirst,
    clickSecondary,
    classnameFirst,
    classnameSecondary,
    disabledFirst,
    disabledSecondary
} = props;


    return (
      <Backdrop classname={cn(backdropStyles,{[styles.activeModal]: isModalActive})}>
        <ModalWindow>
            <ModalHeader title={title} >
                {isModalClose && <ModalClose setIsModalActive={setIsModalActive}/>}
            </ModalHeader>
            <ModalBody>
                {children}
            </ModalBody>
            <ModalFooter
                textFirst={textFirst}
                textSecondary={textSecondary}
                clickFirst={clickFirst}
                clickSecondary={clickSecondary}
                classnameFirst={classnameFirst}
                classnameSecondary={classnameSecondary}
                disabledFirst={disabledFirst}
                disabledSecondary={disabledSecondary}
            />
        </ModalWindow>
      </Backdrop>
    )
}

Modal.propTypes = {
    isModalClose: PropTypes.bool,
    isModalActive: PropTypes.bool,
    setIsModalActive: PropTypes.func,
    backdropStyles: PropTypes.string,
    title: PropTypes.string,
    children: PropTypes.node,
    textFirst: PropTypes.string,
    textSecondary: PropTypes.string,
    clickFirst: PropTypes.func,
    clickSecondary: PropTypes.func,
    classnameFirst: PropTypes.string,
    classnameSecondary: PropTypes.string,
    disabledFirst: PropTypes.bool,
    disabledSecondary: PropTypes.bool
}


export default Modal