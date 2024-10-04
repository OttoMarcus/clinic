import React, {useContext, useRef} from 'react'

import { Formik, Form } from 'formik'
import validationSchema from './validationSchema.js'
import CustomField from '../CustomInputFields/CustomField/CustomField.jsx'

import LanguagesContext from '../../../store/Context/LanguageContext/LanguagesContext.jsx'
import { translation } from '../../../store/Context/LanguageContext/translation/translation.js'

import styles from './AddPatientForm.module.scss'



const AddPatientForm = ({ formikRef, onSubmit }) => {

    const { lang } = useContext(LanguagesContext);
    const { addPatientForm, notations } = translation[lang];


    const initialValues = {
        name: '',
        surname: '',
        dayOfBirth: '',
        phone: '',
        email: '',
        lastVisit: '',
        nextVisit: '',
        address: {
            region: '',
            city: '',
            street: '',
            house: '',
            apt: '',
            zip: ''
        },
        notes: ''
    }


    return (
       <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} innerRef={formikRef} >
           {(form) => {
               return (
                   <Form className={styles.patForm}>
                       <CustomField name="name" id="name" label={addPatientForm[0]} />
                       <CustomField name="surname" id="surname" label={addPatientForm[1]} />
                       <CustomField name="dayOfBirth" id="dayOfBirth" label={addPatientForm[14]} type="date" />
                       <CustomField name="phone" id="phone" label={addPatientForm[2]} patternProps={{
                           format: "+38 (0##) ###-##-##",
                           mask: "_",
                           allowEmptyFormatting: true,
                       }}/>
                       <CustomField name="email" id="email" label={addPatientForm[3]} />
                       <CustomField name="lastVisit" id="lastVisit" label={addPatientForm[4]} type="date"/>
                       <CustomField name="nextVisit" id="nextVisit" label={addPatientForm[5]} type="date"/>
                       <h3>{addPatientForm[6]}</h3>
                       <CustomField name="address.region" id="region" label={addPatientForm[7]} />
                       <CustomField name="address.city" id="city" label={addPatientForm[8]} />
                       <CustomField name="address.street" id="street" label={addPatientForm[9]} />
                       <div className={styles.houseContainer}>
                           <CustomField name="address.house" id="house" label={addPatientForm[10]} />
                           <CustomField name="address.apt" id="apt" label={addPatientForm[11]} />
                       </div>
                       <CustomField name="address.zip" id="zip" label={addPatientForm[12]} />
                       <CustomField name="notes" id="notes" type="textarea" label={notations} />
                   </Form>
               )
           }}
       </Formik>
    )
}

export default AddPatientForm
