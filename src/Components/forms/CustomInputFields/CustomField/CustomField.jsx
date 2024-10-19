import {memo, useCallback} from 'react'
import { useField } from 'formik'
import PropTypes from 'prop-types'
import { PatternFormat } from 'react-number-format' // Імпортуємо PatternFormat

import cn from 'classnames'
import styles from './CustomField.module.scss'




const CustomField = ({ type = 'text', patternProps, disabled = false, ...props }) => {
    const [field, meta] = useField(props.name);
    const { touched, error } = meta;

    // Функція для генерації класів
    const generateClassName = () =>
        cn(styles.customInput, { [styles.errorField]: error });

    // Функція для рендерингу інпуту з PatternFormat
    const renderPatternFormatInput = useCallback(() => (
        <PatternFormat
            {...field}
            {...props}
            {...patternProps}
            disabled={disabled}
            className={generateClassName()}
            onValueChange={(values) => {
                field.onChange({
                    target: {
                        name: field.name,
                        value: values.formattedValue,
                    },
                });
            }}
        />
    ), [field, props, patternProps, disabled]);

    // Функція для рендерингу стандартного інпуту
    const renderStandardInput = useCallback(() => (
        <input
            type={type}
            {...props}
            {...field}
            disabled={disabled} // Додаємо пропс disabled
            className={generateClassName()}
            placeholder={props.placeholder}
        />
    ), [field, props, disabled]);

    // Вибір між PatternFormat або стандартним інпутом
    const inputElement = patternProps ? renderPatternFormatInput() : renderStandardInput();

    return (
        <div className={styles.customField}>
            <label htmlFor={props.id} className={styles.customLabel}>
                {props.label || field.name}
                <span className={error ? styles.asterisk : ''}>*</span>
            </label>
            {inputElement}
            {touched && error && <p className={styles.error}>{meta.error}</p>}
        </div>
    );
};

export default memo(CustomField);

CustomField.propTypes = {
    type: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    patternProps: PropTypes.object,
    disabled: PropTypes.bool, // Додаємо пропс disabled
};



//Кастомний інпут, що дозволяє гнучко контролювати поле вводу.
//Якщо передаються пропси в PatternFormat із бібліотеки react-number-format,
//то використовуються властивості бібліотеки, інакше налаштований input