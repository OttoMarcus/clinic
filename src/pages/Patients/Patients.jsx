import {useEffect, useContext, useState, useCallback} from "react";
import { useDispatch, useSelector } from "react-redux";
import PopUp from "../../Components/PopUp/PopUp.jsx";
import { fetchPatients } from '../../store/Redux/Patient/Thunk.js';

import LanguagesContext from '../../store/Context/LanguageContext/LanguagesContext.jsx';
import { translation } from '../../store/Context/LanguageContext/translation/translation.js';

import PatientItem from './PatientItem/PatientItem.jsx'

import cn from 'classnames';
import styles from './Patients.module.scss';



const Patients = () => {
    const dispatch = useDispatch();
    const patients = useSelector(state => state.patients.patients);
    const status = useSelector(state => state.patients.status);
    const error = useSelector(state => state.patients.error);

    const [isPopUpActive, setIsPopUpActive] = useState(false);
    const [isEditedPopUp, setIsEditedPopUp] = useState(false);

    // Мемоізація функцій
    const memoizedSetIsPopUpActive = useCallback(setIsPopUpActive, [setIsPopUpActive]);
    const memoizedSetIsEditedPopUp = useCallback(setIsEditedPopUp, [setIsEditedPopUp]);

    const { lang } = useContext(LanguagesContext);
    const { addPatientForm, removedPatient, editedPatient } = translation[lang];

// Fetch patients
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (status === 'idle') {
                  await dispatch(fetchPatients()).unwrap(); // unwrap для обробки помилок
                }
            } catch (error) {
                console.error('Failed to fetch patients:', error);
            }
        };

        fetchData();
    }, [status, dispatch, patients]);

    return (
        <div className={cn(styles.pageContainer, styles.container)}>
            <div className={styles.itemWrapper}>
                <div className={styles.titleContainer}>
                    <ul className={styles.title}>
                        <li>{addPatientForm[0]}</li>
                        <li>{addPatientForm[1]}</li>
                        <li>{addPatientForm[2]}</li>
                        <li>{addPatientForm[3]}</li>
                    </ul>
                </div>
                {status === 'loading' && <div className={styles.customLoader}></div>}
                {status === 'failed' && <h2>Error: {error}</h2>}
                {status === 'succeeded' && Array.isArray(patients) && patients.length > 0
                    ? patients.map(patient =>
                    <PatientItem
                        key={patient._id}
                        patient={patient}
                        setIsPopUpActive={memoizedSetIsPopUpActive}
                        setIsEditedPopUp={memoizedSetIsEditedPopUp}
                    />)
                    : <h3>No patients</h3>
                }
            </div>

            <PopUp activePopUp={isPopUpActive}>{removedPatient}</PopUp>
            <PopUp activePopUp={isEditedPopUp}>{editedPatient} </PopUp>
        </div>
    )
}

export default Patients;
