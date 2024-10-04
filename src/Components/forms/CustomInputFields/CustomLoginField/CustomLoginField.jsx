import React, {memo} from 'react'
import { useField } from 'formik'
import PropTypes from 'prop-types'

import cn from 'classnames'
import styles from './CustomLoginField.module.scss'




const CustomLoginField = ({type = 'text', ...props}) => {

    const [field, meta] = useField(props.name);
    const {touched, error } = meta;

    return (
        <div className={styles.customLoginField}>
            <label htmlFor={props.id} className={styles.labelLogin}>{props.label || field.name}</label>
            <input type={type} {...field} {...props} className={cn(styles.customLoginInput,{[styles.errorFieldLogin]: error})}/>
            {touched && error && <p className={styles.errorLogin}>{meta.error}</p>}
        </div>
    )
}

export default memo(CustomLoginField)


CustomLoginField.propTypes = {
    type: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string
}