import React, { memo } from 'react'
import { useField } from 'formik'
import PropTypes from 'prop-types'
import { PatternFormat } from 'react-number-format' // Імпортуємо PatternFormat

import cn from 'classnames'
import styles from './CustomField.module.scss'




const CustomField = ({ type, patternProps, ...props }) => {
    const [field, meta] = useField(props.name);
    const { touched, error } = meta;

    const
        inputElement = patternProps ? (
        <PatternFormat
            {...field}
            {...props}
            {...patternProps} // Передаємо всі параметри PatternFormat через пропси
            className={cn(styles.customInput, { [styles.errorField]: error })}
            onValueChange={(values) => {
                field.onChange({
                    target: {
                        name: field.name,
                        value: values.formattedValue,
                    },
                });
            }}
        />
    ) : (
        <input
            type={type}
            {...props}
            {...field}
            className={cn(styles.customInput, { [styles.errorField]: error })}
            placeholder={props.placeholder}
        />
    );

    return (
        <div className={styles.customField}>
            <label htmlFor={props.id} className={styles.customLabel}>
                {props.label || field.name}
                <span className={error ? styles.asterisk : ''}>*</span>
            </label>
            {inputElement}
            {touched && error && <p className={styles.error}>{meta.error}</p>}
        </div>
    )
}

export default memo(CustomField);

CustomField.propTypes = {
    type: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string.isRequired, // Обов'язковий пропс
    placeholder: PropTypes.string,
    patternProps: PropTypes.object, // Додаємо patternProps як необов'язковий пропс
};


//Кастомний інпут, що дозволяє гнучко контролювати поле вводу.
//Якщо передаються пропси в PatternFormat із бібліотеки react-number-format,
//то використовуються властивості бібліотеки, інакше налаштований input