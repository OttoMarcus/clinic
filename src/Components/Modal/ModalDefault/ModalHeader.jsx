import PropTypes from 'prop-types'
import styles from './Modal.module.scss'



const ModalHeader = ({children = null, title = ''}) => {

    return (
        <div className={styles.modalHeader}>
            <div className={styles.modalHeaderTitle}>{title}</div>
            {children}
        </div>
    )
}

ModalHeader.propTypes = {
    title: PropTypes.string,
    children: PropTypes.any
}

export default ModalHeader