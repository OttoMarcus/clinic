import React, { useState, useContext, useRef, memo } from "react";
import PropTypes from "prop-types";

import { useDispatch } from "react-redux";
import { updatePatient, deletePatient } from "../../../store/Redux/Patient/Thunk.js";

import PatientDetails from "../PatientDetails/PatientDetails.jsx";
import Modal from '../../../Components/Modal/ModalDefault/Modal.jsx';
import EditPatient from '../EditPatient/EditPatient.jsx'
import delayPopTimer from "../../../Components/PopUp/delayPopTimer.js";
import LanguagesContext from "../../../store/Context/LanguageContext/LanguagesContext.jsx";
import { translation } from "../../../store/Context/LanguageContext/translation/translation.js";

import styles from "../PatientItem/PatientItem.module.scss";




const PatientBlockModals = (props) => {
    const {
        patient,
        setIsPopUpActive,
        setIsEditedPopUp,
        setIsModalActive,
        isModalActive
    } = props;


    const [isCorrect, setIsCorrect] = useState(false);          //   коректне введення перевірочного слова
    const [isEdit, setIsEdit] = useState(false);
    const [isDelete, setIsDelete] = useState(false);

    const editRef = useRef();
    const deleteRef = useRef();
    const dispatch = useDispatch();

    const { lang } = useContext(LanguagesContext);
    const{ btn_goBack, btn_delete, btn_change, btn_cancel, btn_confirm } = translation[lang];


    //Close modal PatientDetails
    const handleBack = () => {
        setIsModalActive(false);
    };


    //Update patient
    const handleEdit = async (values) => {
        try{
            const response = await dispatch(updatePatient(values));  // передаємо значення з форми
            if(response.meta.requestStatus === "fulfilled") {
                delayPopTimer(setIsEditedPopUp);
            }
            toggleEdit()
            setIsModalActive(false);
        } catch (error) {
            console.log('Patient data must include an ID. Additional info:', error);
            setIsPopUpActive(true);
        }
    };

    //Delete patient
    const handleDelete = async (values) => {
        if (patient.surname.toLowerCase() === values.secondName.toLowerCase()) {
            setIsCorrect(true);
            try {
                // Викликаємо dispatch та чекаємо на відповідь із сервера
                const response = await dispatch(deletePatient(patient._id));
                if(response.meta.requestStatus === "fulfilled") {
                    delayPopTimer(setIsPopUpActive);
                    console.log("Patient removed from server")
                }
            } catch (error) {
                console.error("Error deleting patient on server:", error);
            }
        } else {
            setIsCorrect(false);
        }
    };


    const toggleEdit = () => {
        setIsEdit(!isEdit);
        setIsDelete(false);
    }

    // Submit Edited values in form
    const onSubmit = () => {        //
        if(editRef.current) {
            editRef.current.submitForm();
            delayPopTimer(setIsEditedPopUp);
        }
    }

    // Delete Confirm button click
    const onConfirm = () => {
        deleteRef.current.submitForm();
    }

    return (
                <Modal
                    title={`${patient.name} ${patient.surname}`}
                    isModalActive={isModalActive}
                    setIsModalActive={setIsModalActive}
                    textFirst={isEdit ? (isDelete ? btn_delete : btn_confirm ) : btn_change}
                    //якщо в режимі редагування активована кнопка "видалити" то відображається кнопка "видалити" інакше "змінити"
                    clickFirst={isEdit ? (isDelete ? onConfirm : onSubmit) : toggleEdit}
                    //якщо в режимі редагування активована кнопка "видалити" то предається ф-ція onConfirm інакше onSubmit
                    classnameFirst={isDelete && isCorrect ? styles.redBtn : ""}
                    //якщо в режимі редагування є, ...props помилка вводу то кнопка видалення відображається червонним кольором
                    textSecondary={isEdit ? btn_cancel : btn_goBack}
                    clickSecondary={isEdit ? toggleEdit : handleBack}
                    disabled={false}
                >
                    {isEdit ? (
                        <EditPatient
                            patient={patient}
                            editRef={editRef}
                            deleteRef={deleteRef}
                            onSubmit={handleEdit}
                            isDelete={isDelete}
                            setIsDelete={setIsDelete}
                            onDelete={handleDelete}  //функція для відправки форми Delete
                            isCorrect={isCorrect}
                            setIsCorrect={setIsCorrect}
                        />
                    ) : (
                        <PatientDetails patient={patient} />
                    )}
                </Modal>
    );
};

PatientBlockModals.propTypes = {
    patient: PropTypes.shape({
        name: PropTypes.string.isRequired,
        surname: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        email: PropTypes.string,
    })
}

export default memo(PatientBlockModals);


// Модалка, котра в залежності від isEdit відображає в children елементи редагування чи видалення