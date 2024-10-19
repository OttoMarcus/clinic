import {useState, useContext, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Formik, Form} from 'formik'
import CustomField from '../CustomInputFields/CustomField/CustomField.jsx';
import CustomSelectableSubInput from '../CustomInputFields/CustomSelectableSubInput/CustomSelectableSubInput.jsx';
import validationSchema from './validationSchema'
import useSpecializations from '../../../helper/useSpecializations'
import LanguagesContext from '../../../store/Context/LanguageContext/LanguagesContext'
import { translation } from '../../../store/Context/LanguageContext/translation/translation'

import CustomRadioGroup from "../CustomInputFields/CustomRadioGroup/CustomRadioGroup"
import {useDispatch, useSelector} from "react-redux"
import CustomSelectInput from "../CustomInputFields/CustomSelectInput/CustomSelectInput"

import styles from '../AddVisitForm/AddVisitForm.module.scss'
import useDoctorList from "../../../helper/useDoctorList.js";

import {fetchDoctors} from "../../../store/Redux/Doctor/Thunk.js";




const EditVisitForm = ({ visitEditRef, onSubmit, visitDetails }) => {
    const {
        patient_id,
        name,
        surname,
        phone,
        specialization,
        dedicatedDoctor,
        visitReason,
        urgency,
        date,
        time
    } = visitDetails;

    const {lang} = useContext(LanguagesContext);
    const {addVisitForm, selectDoctor} = translation[lang];

    const dispatch = useDispatch();
    const specializations = useSpecializations();

    const doctors = useDoctorList();
    const status = useSelector(state => state.doctors.status);
    // const doctors_error = useSelector(state => state.doctors.error);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchDoctors());
        }
    }, [status, dispatch]);


    const [additionalFields, setAdditionalFields] = useState([]);
    const [doctorList, setDoctorList] = useState([]);

    //функція, що визначає додаткові поля для під кожну спеціалізацію
    const handleFieldAddition = (questions) => {
        setAdditionalFields(
            questions.map(q => ({ name: q.ask, placeholder: q.placeholder }))
        );
    };

    //функція, що формує  список доступних лікарів
    const handleDoctorList = (docs) => {
        setDoctorList(
            docs.map(d => ({ id: d._id, name: d.name + ' ' + d.surname }))
        );
    };

    const initialValues = {
        patient_id: patient_id || '',
        phone: phone || '',
        name: name || '',
        surname: surname || '',
        specialization: specialization ||'',
        dedicatedDoctor: dedicatedDoctor || '',
        visitReason: visitReason || 'Plain Visit',
        urgency: urgency || 'Regular',
        date: date ? new Date(date).toISOString().split('T')[0] : '',
        time: time || ''
    };


    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            innerRef={visitEditRef}
        >
            {(form) => (
                <Form className={styles.visitForm}>
                    <CustomField name="phone" id="phone" label={addVisitForm[0]} disabled={true} />
                    <CustomField name="name" id="name" disabled={true} label={addVisitForm[1]} />
                    <CustomField name="surname" id="surname" disabled={true} label={addVisitForm[2]} />
                    <CustomSelectableSubInput
                        name="specialization"
                        id="specialization"
                        label={addVisitForm[3]}
                        options={specializations}
                        additionalOption={doctors}
                        onFieldDocs={handleDoctorList}
                        optionLabelKey="name"
                        optionValueKey="id"
                        onFieldAdd={handleFieldAddition}
                    />
                    <CustomSelectInput
                        name="dedicatedDoctor"
                        id="dedicatedDoctor"
                        label={selectDoctor}
                        options={doctorList}
                        optionLabelKey="name"
                        optionValueKey="name"
                    />
                    <CustomField name="visitReason" id="visitReason" label={addVisitForm[4]} />
                    <CustomRadioGroup name="urgency" id="urgency"/>
                    <CustomField name="date" id="date" label={addVisitForm[9]} type="date"  />
                    <CustomField name="time" id="time" label={addVisitForm[10]} type="string" placeholder={"hh:mm"}/>

                    {additionalFields.map(({ name, placeholder }) => (
                        <CustomField key={name} name={name} id={name} label={name} placeholder={placeholder} />
                    ))}
                </Form>
            )}
        </Formik>
    );
};

export default EditVisitForm;

EditVisitForm.propTypes = {
    visitEditRef: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
    visitDetails: PropTypes.shape({
        patient_id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        surname: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        specialization: PropTypes.string,
        dedicatedDoctor: PropTypes.string.isRequired,
        visitReason: PropTypes.string,
        urgency: PropTypes.string,
        date: PropTypes.string.isRequired, // Adjust type if necessary
        time: PropTypes.string.isRequired, // Adjust type if necessary
    }).isRequired,
}

// Bugs: При Edit Visit не всі поля форми підтягуються, в часності не підвантажуються спеціалісти та додаткові питання
// Можна створити окрему форму