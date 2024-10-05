import {useContext, useRef, useState} from "react";

import onSubmitRef from "../../helper/onSubmitRef.js"
import Modal from "../Modal/ModalDefault/Modal.jsx"
import LanguagesContext from "../../store/Context/LanguageContext/LanguagesContext.jsx"
import {translation} from "../../store/Context/LanguageContext/translation/translation.js";
import AddVisitForm from "../forms/AddVisitForm/AddVisitForm.jsx";
import {newVisit} from "../../store/Redux/Visit/Thunk.js";
import delayPopTimer from "../PopUp/delayPopTimer.js";
import useSubmitHandler from "../../helper/useSubmitHandler.js";
import {newPatient} from "../../store/Redux/Patient/Thunk.js";
import {useSelector} from "react-redux";
import SearchPatientForm from "../forms/SearchPatientForm/SearchPatientForm.jsx";
import AddPatientForm from "../forms/AddPatientForm/AddPatientForm.jsx";

import styles from "./Visit.module.scss";
import PropTypes from "prop-types";


const Visit = (props) => {
    const {
        isVisitActive,
        setVisitActive,
        setIsErrorByAdding,
        setVisitPopUp,
        setPatientPopUp
    } = props;
 // стан модалки нового візиту
    const { lang } = useContext(LanguagesContext);
    const { find_patient, btn_find, title_visit, btn_submit, btn_cancel, addPatientNew , addPatient} = translation[lang]

    // let searchPhone = "";
    const visitFormRef = useRef();
    const searchFormRef = useRef();
    const patientFormikRef = useRef();
    const handleSubmit = useSubmitHandler();
    // стан модалки нового візиту
    const [isNewVisit, setIsNewVisit] = useState(false);
    // результат пошуку пацієнта по номеру тел.
    const [isPatientFound, setIsPatientFound] = useState(true);
    // disabled submit button when PatientFind field is untouched
    // const [isDisabled, setIsDisabled] = useState(false);
    const [patientFind, setPatientFind] = useState({});
    const [isNewPatient, setIsNewPatient] = useState(false);


    const patients = useSelector(state => state.patients.patients);
    const patientStatus = useSelector(state => state.patients.status);
    const patientError = useSelector(state => state.patients.error);

    const handleNewPatient = () => {
        setIsNewPatient(prev => !prev)
    }

    //закриваю модалку з пошуком пацієнтів  та відкриваю
    const handleNewVisit = () => {
        setIsNewVisit(prev => !prev)
    }

    const handleVisitModal = () => {
        setVisitActive( prev => !prev );
    }

    const handleModal = () => {
        handleNewPatient();
        handleVisitModal();
    }

    const handleVisitSubmit = async (values) => {
        // Привожу до єдиного вигляду у базі поля
        const transformValues = {
            ...values,
            patient_id: patientFind._id,
            name: values.name.charAt(0).toUpperCase() + values.name.slice(1),
            surname: values.surname.charAt(0).toUpperCase() + values.surname.slice(1),
            visitReason: values.visitReason.toUpperCase(),
        }
        // відправка на сервер
        await handleSubmit(transformValues, newVisit, handleVisitModal, setIsErrorByAdding);
        delayPopTimer(setVisitPopUp);
    };


    const handlePatientSubmit = async (values) => {
        try {
            await handleSubmit(values, newPatient, handleNewPatient, setIsErrorByAdding);
            delayPopTimer(setPatientPopUp);
        } catch (err) {
            console.log("Error by submitting new patient:", err);
        }

    };

    const handleSearchPatientSubmit = (values, { resetForm }) => {
        const patient = patients.findIndex(patient => patient.phone === values["phone"]);
        if (patient !== -1) {  //якщо пацієнт знайдено
            setIsPatientFound(true); // зміна стану помилки пошуку пацієнта
            handleNewVisit();  // відкриваю форму візиту
            setPatientFind(patients[patient]);

        } else {  //якщо пацієнта не знайдено
            resetForm();    //очистка форми при невірному вводі

            if (searchFormRef.current.dirty === true) { // якщо поле було задіяне
                setIsPatientFound(false);  // то виведеться помилка пошуку пацієнта
                console.log("Patient not found");
            }
        }
    };


    return (
            <Modal
                setIsModalActive={ setVisitActive }
                isModalActive={ isVisitActive }
                title={isNewVisit ? title_visit : (isNewPatient ? addPatient : find_patient)}
                textFirst={isNewVisit || isNewPatient ? btn_cancel : null}
                textSecondary={isNewVisit || isNewPatient ? btn_submit : btn_find}
                classnameSecondary={isNewVisit || isNewPatient ? "" : styles.btnSearch}
                clickFirst={isNewVisit || isNewPatient ? handleModal : null}
                clickSecondary={isNewVisit ? () => onSubmitRef(visitFormRef) : ( isNewPatient ? () => onSubmitRef(patientFormikRef) : () => onSubmitRef(searchFormRef))} //має відбуватися пошук пацієнта і в разі відповіді відкривати анкету інакше стилі нового візиту
                // disabledSecondary={isDisabled}
            >
            {
                isNewVisit
                ?    <AddVisitForm  visitFormRef={visitFormRef} onSubmit={handleVisitSubmit} patientFind={patientFind}/>
                :    <div className={styles.searchPatientWrapper}>
                        {
                            isNewPatient
                            ? <AddPatientForm formikRef={patientFormikRef} onSubmit={handlePatientSubmit} />
                            : <>
                                    <SearchPatientForm searchFormRef={searchFormRef} onSubmit={handleSearchPatientSubmit}/>
                                    {
                                        patientStatus === 'failed'
                                            ? <p>{patientError}</p> // якщо пацієнти не дістали із редакса
                                            : !isPatientFound && <b>Patient not found</b>
                                    }

                                    <div className={styles.createNewPatient}>
                                        <a className={styles.newPatientLink} onClick={handleNewPatient}>{addPatientNew}</a>
                                    </div>
                                </>
                        }
                     </div>
            }
            </Modal>
    )
}

export default Visit


Visit.propTypes = {
    isVisitActive: PropTypes.bool.isRequired,
    setVisitActive: PropTypes.func.isRequired,
    setIsErrorByAdding: PropTypes.func,
    setVisitPopUp: PropTypes.func,
    setPatientPopUp: PropTypes.func
}