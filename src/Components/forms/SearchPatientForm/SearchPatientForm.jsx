import {useContext} from 'react'
import {Formik, Form} from 'formik'
import CustomField from '../CustomInputFields/CustomField/CustomField.jsx'
import validationSchema from './validationSchema.js'
import styles from './SearchPatientForm.module.scss'
import LanguagesContext from "../../../store/Context/LanguageContext/LanguagesContext.jsx";
import {translation} from "../../../store/Context/LanguageContext/translation/translation.js";




const SearchPatientForm = ({searchFormRef, onSubmit}) => {

    const { lang } = useContext(LanguagesContext);
    const { addPatientForm } = translation[lang];


    const initialValues = {
        phone: ''
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            innerRef={searchFormRef}
            validationSchema={validationSchema}
        >
            {
                (form) => {
                    return (
                    <Form className={styles.searchPatientForm}>
                        <CustomField name="phone" id="phone" label={addPatientForm[2]} patternProps={{
                            format: "+38 (0##) ###-##-##",
                            mask: "_",
                            allowEmptyFormatting: true }}
                        />
                    </Form>
                    )
                }
            }
        </Formik>
    )
}


export default SearchPatientForm