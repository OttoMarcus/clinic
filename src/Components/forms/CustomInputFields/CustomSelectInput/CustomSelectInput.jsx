import { useField, useFormikContext } from "formik"
import PropTypes from "prop-types"
import cn from "classnames"
import styles from "./CustomSelectInput.module.scss"
import React from "react";



const CustomSelectInput = (props) => {
    const {
        optionLabelKey,
        optionValueKey,
        ...rest
    } = props;

    const [field, meta] = useField(props.name);
    const { touched, error } = meta;

    return (
        <div className={styles.customSelectField}>
            <label htmlFor={rest.id || rest.name} className={styles.labelSelectableInput}>
                {rest.label || rest.name}
                <span className={error ? styles.asteriskSelectable : ""}>*</span>
            </label>
            <select {...field} {...rest} className={cn(styles.selectField, {[styles.errorSelectField]: error})}>
                <option value="" disabled></option>
                {rest.options.length > 0 ? (
                    rest.options.map((opt) => (
                        <option key={opt[optionValueKey]} value={opt[optionValueKey]}>
                            {opt[optionLabelKey]}
                        </option>
                    ))
                ) : (
                    <option disabled>No available specialists</option>
                )}
            </select>
            {touched && error && <div className={styles.errorSelectableInput}>{error}</div>}
        </div>
    )
}

export default CustomSelectInput


CustomSelectInput.propTypes = {
    label: PropTypes.string,
    options: PropTypes.array,
    optionLabelKey: PropTypes.string,
    optionValueKey: PropTypes.string
}


// поле select у формі може отримувати тільки обмежений та суворо визначений набір пропсів.
// через що, додаткові пропси я деструктуризував а ті щ потребує select, передав далі до select через ...rest