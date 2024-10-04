import React, {useContext} from 'react'

import { Formik, Form } from 'formik'
import CustomField from '../CustomInputFields/CustomField/CustomField.jsx'
import validationSchema from './validationSchema.js'
import CustomSelectableSubInput from '../CustomInputFields/CustomSelectableSubInput/CustomSelectableSubInput.jsx'
import useSpecializations from "../../../helper/useSpecializations.js";

import LanguagesContext from '../../../store/Context/LanguageContext/LanguagesContext.jsx'
import { translation } from '../../../store/Context/LanguageContext/translation/translation.js'

import styles from './AddDoctorForm.module.scss'



const AddDoctorForm = ({formikRef, onSubmit }) => {

    const specializations = useSpecializations();  //Витягую масив спеціалізацій із редакса

    const { lang } = useContext(LanguagesContext);
    const { doctorForm } = translation[lang];

    const initialValues = {
        name: '',
        surname: '',
        specialization: '',
        phone: '',
        email: ''
    }

    const onFieldAdd = (questions) => {
        questions.forEach((question) => {
            // Можна додати логіку для обробки нових полів тут для адмінки, тощо
            // console.log("Додано нове поле:", question);
        });
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            innerRef={formikRef}
        >
            {(form) => {
                return (
                    <Form className={styles.docForm}>
                        <CustomField name="name" id="name" label={doctorForm[0]}/>
                        <CustomField  name="surname" id="surname" label={doctorForm[1]}/>
                        <CustomSelectableSubInput
                            type={"select"}
                            name="specialization"
                            id="specialization"
                            label={doctorForm[2]}
                            options={specializations}
                            optionLabelKey="name"
                            optionValueKey="id"
                            onFieldAdd={onFieldAdd}
                        />
                        <CustomField name="phone" id="phone" label={doctorForm[3]} patternProps={{
                            format: "+38 (0##) ###-##-##",
                            mask: "_",
                            allowEmptyFormatting: true,
                        }}/>
                        <CustomField name="email" id="email" label={doctorForm[4]}/>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default AddDoctorForm
