import { useEffect } from "react"
import { useField, useFormikContext } from "formik"
import PropTypes from "prop-types"
import cn from "classnames"
import styles from "./CustomSelectableSubInput.module.scss"




const CustomSelectableSubInput = (props) => {
    const {
        name,
        id,
        label,
        options,
        additionalOption,  //масив doctors
        onFieldDocs, //відфільтрований масив doctors, що певертається назад
        optionLabelKey,
        optionValueKey,
        onFieldAdd,
    } = props;


    const [field, meta] = useField(props);
    const { touched, error } = meta;
    const { setFieldValue, setFieldTouched } = useFormikContext();

    useEffect(() => {
        //Обираю опцію із списку спеціалізації
        const selectedOption = options.find(option => option[optionLabelKey] === field.value);

        //Якщо вибрана опція має questions, то викликаємо onFieldAdd та передаємо questions
        if (selectedOption && selectedOption.questions) {
            onFieldAdd(selectedOption.questions);

            // Використовуємо map та умову, щоб уникнути повторних викликів, не обовязкове поле
            selectedOption.questions.forEach(question => {
                if (field.value !== question.ask) {
                    setFieldValue(question.ask, "");
                    setFieldTouched(question.ask, false);
                }
            });
        }

        if (additionalOption) {
            onFieldDocs(additionalOption.filter(doc => doc.specialization === field.value));
        }

    }, [field.value]); // Залежність тільки від field.value

    return (
        <div className={styles.customSelectField}>
            <label htmlFor={id || name} className={styles.labelSelectableInput}>
                {label || name}
                <span className={error ? styles.asteriskSelectable : ""}>*</span>
            </label>
            <select {...field}  className={cn(styles.selectField, { [styles.errorSelectField]: error })}>
                <option value="" disabled></option>
                {options.map((opt, index) => (
                    <option key={opt[optionValueKey] ? opt[optionValueKey] : index} value={opt[optionLabelKey]}>
                        {opt[optionLabelKey]}
                    </option>
                ))}
            </select>
            {touched && error && <div className={styles.errorSelectableInput}>{error}</div>}
        </div>
    );
};

export default CustomSelectableSubInput;

CustomSelectableSubInput.propTypes = {
    name: PropTypes.string,
    id: PropTypes.string,
    label: PropTypes.string,
    options: PropTypes.array,
    additionalOption: PropTypes.array,
    onFieldDocs: PropTypes.func,
    onFieldAdd: PropTypes.func,
    optionLabelKey: PropTypes.string,
    optionValueKey: PropTypes.string
}

//Це універсальний компонент для вибору опції у компоненті Форміка. В данному випадку  використав його для вибору спеціалізації лікаря
//1. options: Проп options приймає масив об'єктів для відображення у випадаючому списку.
//2.optionLabelKey і optionValueKey: Ці пропси визначають ключі в об'єктах options, які будуть використовуватися для відображення значення (value) і мітки (label) в елементах <option>.
//Гнучкість: Компонент тепер може працювати з будь-яким типом об'єктів, надаючи ключі для відображення мітки та значення.