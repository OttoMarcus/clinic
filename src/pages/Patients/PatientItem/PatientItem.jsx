import { useState, memo } from "react";
import PropTypes from "prop-types";

import styles from "./PatientItem.module.scss";
import PatientBlockModals from "../PatientBlockModals/PatientBlockModals.jsx";




const PatientItem = ({ patient, setIsPopUpActive, setIsEditedPopUp}) => {
    const { name, surname, phone, email } = patient;

    const [isModalActive, setIsModalActive] = useState(false);

    // Open/Close modals
    const handleModalActive = () => {
        setTimeout(() => setIsModalActive(prev => !prev), 150);
    };


    return (
        <>
            <ul className={styles.patientItem} onClick={handleModalActive}>
                <li>{name}</li>
                <li>{surname}</li>
                <li>{phone}</li>
                <li>{email}</li>
            </ul>

            { isModalActive && (
                <PatientBlockModals
                    patient={patient}
                    setIsPopUpActive={setIsPopUpActive}
                    setIsEditedPopUp={setIsEditedPopUp}
                    setIsModalActive={setIsModalActive}
                    isModalActive={isModalActive}
                />)
            }
        </>
    );
};

PatientItem.propTypes = {
    patient: PropTypes.shape({
        name: PropTypes.string.isRequired,
        surname: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        email: PropTypes.string,
    }).isRequired,

    setIsPopUpActive: PropTypes.func,
    setIsEditedPopUp: PropTypes.func
}

export default memo(PatientItem);


// Модалка, котра в залежності від isEdit відображає в children елементи редагування чи видалення