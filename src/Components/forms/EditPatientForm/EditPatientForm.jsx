import {useContext} from 'react'
import { Formik, Form } from 'formik'

import validationSchema from '../AddPatientForm/validationSchema.js'
import CustomField from '../CustomInputFields/CustomField/CustomField.jsx'

import LanguagesContext from '../../../store/Context/LanguageContext/LanguagesContext.jsx'
import { translation } from '../../../store/Context/LanguageContext/translation/translation.js'

import styles from './EditPatientForm.module.scss'



const EditPatientForm = (props) => {
    const {
        patient,
        editRef,              //   для доступу форми Edit
        onSubmit           //   для відправки форми Edit
    } = props;

    const { lang } = useContext(LanguagesContext);
    const { addPatientForm, notations, contacts, visits } = translation[lang];

    const initialValues = {
        _id: patient._id,
        name: patient.name,
        surname: patient.surname,
        dayOfBirth: patient.dayOfBirth ? new Date(patient.dayOfBirth).toISOString().split('T')[0] : '',
        phone: patient.phone,
        email: patient.email,
        lastVisit: patient.lastVisit ? new Date(patient.lastVisit).toISOString().split('T')[0] : '',
        nextVisit: patient.nextVisit ? new Date(patient.nextVisit).toISOString().split('T')[0] : '',
        address: {
            region: patient.address.region,
            city: patient.address.city,
            street: patient.address.street,
            house: patient.address.house,
            apt: patient.address.apt,
            zip: patient.address.zip
        },
        notes: patient.notes
    };



    return (
            <Formik initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}
                    innerRef={editRef}
            >
                {(form) => {
                    return (
                        <Form className={styles.form}>
                            <CustomField name="name" id="name" label={addPatientForm[0]}/>
                            <CustomField name="surname" id="surname" label={addPatientForm[1]}/>
                            <CustomField name="dayOfBirth" id="dayOfBirth" label={addPatientForm[14]} type="date"/>

                            <div className={styles.contentWrapper}>
                                <p className={styles.content}>{contacts}</p>
                            </div>
                            <CustomField name="phone" id="phone" label={addPatientForm[2]} patternProps={{
                                format: "+38 (0##) ###-##-##",
                                mask: "_",
                                allowEmptyFormatting: true,
                            }}/>
                            <CustomField name="email" id="email" label={addPatientForm[3]}/>

                            <div className={styles.contentWrapper}>
                                <p className={styles.content}>{visits}</p>
                            </div>
                            <CustomField name="lastVisit" id="lastVisit" label={addPatientForm[4]} type="date"/>
                            <CustomField name="nextVisit" id="nextVisit" label={addPatientForm[5]} type="date"/>

                            <div className={styles.contentWrapper}>
                                <p className={styles.content}>{addPatientForm[6]}</p>
                            </div>
                            <CustomField name="address.region" id="region" label={addPatientForm[7]}/>
                            <CustomField name="address.city" id="city" label={addPatientForm[8]}/>
                            <CustomField name="address.street" id="street" label={addPatientForm[9]}/>
                            <div className={styles.houseContainer}>
                                <CustomField name="address.house" id="house" label={addPatientForm[10]}/>
                                <CustomField name="address.apt" id="apt" label={addPatientForm[11]}/>
                            </div>
                            <CustomField name="address.zip" id="zip" label={addPatientForm[12]}/>
                            <CustomField name="notes" id="notes" type="textarea" label={notations}/>
                        </Form>
                    )
                }}
            </Formik>
    )
}

export default EditPatientForm


