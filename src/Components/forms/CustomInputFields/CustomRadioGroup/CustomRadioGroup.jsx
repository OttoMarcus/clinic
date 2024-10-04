import React, { useContext } from 'react'
import PropTypes from "prop-types"
import RadioButton from './RadioButton.jsx';
import LanguagesContext from "../../../../store/Context/LanguageContext/LanguagesContext.jsx"
import { translation } from "../../../../store/Context/LanguageContext/translation/translation.js"

import styles from './CustomRadioGroup.module.scss'



const CustomRadioGroup = ({ name }) => {
    const { lang } = useContext(LanguagesContext);
    const { addVisitForm } = translation[lang];

    return (
        <div className={styles.checkBoxWrapper}>
            <div className={styles.customRadioGroupWrapper}>
                <div id="my-radio-group" className={styles.customLabel}>{addVisitForm[5]}</div>
                <div role="group" aria-labelledby="my-radio-group" className={styles.radioBtns}>
                    <RadioButton name={name} value="Urgent" label={addVisitForm[6]}/>
                    <RadioButton name={name} value="Priority" label={addVisitForm[7]}/>
                    <RadioButton name={name} value="Regular" label={addVisitForm[8]}/>
                </div>
            </div>
        </div>
    );
};

export default CustomRadioGroup;


CustomRadioGroup.propTypes = {
    name: PropTypes.string
}