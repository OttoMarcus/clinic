import React from 'react';
import { useField } from 'formik';
import styles from './CustomRadioGroup.module.scss';
import PropTypes from "prop-types";

const RadioButton = ({ label, ...props }) => {
    const [field, meta] = useField(props.name);
    const { touched, error } = meta;
    return (
            <label className={styles.radioLabel}>
                <input
                    type="radio"
                    {...field}
                    {...props}
                    className={styles.radioInput}
                />
                {label}
                <span className={error ? styles.asterisk : ''}>*</span>
            </label>
    );
};

export default RadioButton;

RadioButton.propTypes = {
    label: PropTypes.string.isRequired
}