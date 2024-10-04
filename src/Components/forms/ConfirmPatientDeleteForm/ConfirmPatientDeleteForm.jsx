import React, {useContext} from 'react'
import { Formik, Form, Field } from 'formik'
import PropTypes from "prop-types";

import LanguagesContext from '../../../store/Context/LanguageContext/LanguagesContext.jsx'
import { translation } from '../../../store/Context/LanguageContext/translation/translation.js'

import cn from 'classnames'
import styles from './ConfirmPatientDelete.module.scss'



const ConfirmPatientDeleteForm = ({deleteRef, onDelete, isCorrect='false'}) => {

    const {lang} = useContext(LanguagesContext);
    const {confirmation, confirmationError} = translation[lang];

    const initialValues = {
        secondName: ''
    }


    return (
        <div className={cn(styles.deleteForm, {[styles.border]: !isCorrect})}>
            <h4>{ isCorrect ? confirmation : confirmationError}</h4>
            <Formik initialValues={initialValues} onSubmit={onDelete} innerRef={deleteRef}>
                {(form) => {
                    return (
                        <Form className={styles.confDelForm}>
                            <Field name="secondName" id="secondName" type="text" />
                        </Form>
                    )
                }}

            </Formik>
        </div>
    )
}

export default ConfirmPatientDeleteForm

ConfirmPatientDeleteForm.propTypes = {
    onDelete: PropTypes.func,
    isCorrect: PropTypes.bool
}
