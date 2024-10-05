import {useContext, useEffect, useState} from 'react'

import Card from "../../Components/Card/Card.jsx"
import ToUpButton from "../../Components/ToUpButton/ToUpButton.jsx"
import {useDispatch, useSelector} from "react-redux"
import {deleteVisit, fetchVisits} from "../../store/Redux/Visit/Thunk.js"

import useScroll from "../../helper/useScroll.js"
import useDeleteHandler from "../../helper/useDeleteHandler.js";

import PopUp from "../../Components/PopUp/PopUp.jsx";
import {translation} from "../../store/Context/LanguageContext/translation/translation.js";
import LanguagesContext from "../../store/Context/LanguageContext/LanguagesContext.jsx";
import PatientBlockModals from "../Patients/PatientBlockModals/PatientBlockModals.jsx";
import {fetchPatients} from "../../store/Redux/Patient/Thunk.js";
import {assistant} from "../../helper/constant.js";
import VisitEdit from "../../Components/Visit/VisitEdit/VisitEdit.jsx";

import cn from 'classnames'
import styles from './HomePage.module.scss'
import PropTypes from "prop-types";



const HomePage = () => {

    const scroll = useScroll(300);
    const dispatch = useDispatch();
    const deleteHandler = useDeleteHandler();

    const visits = useSelector(state => state.visits.visits);
    const visitStatus = useSelector(state => state.visits.status);
    const error = useSelector(state => state.visits.error);

    const specializations = useSelector(state => state.specialization.specialization);
    const specializationsError = useSelector(state => state.specialization.error);

    const patients = useSelector(state => state.patients.patients);
    const patientStatus = useSelector(state => state.patients.status);
    const patientError = useSelector(state => state.patients.error);

    const [removeCardPopUp, setRemoveCardPopUp] = useState(false);
    const [errorDeletePopUp, setErrorDeletePopUp] = useState(false);
    const [isEditedPatientPopUp, setIsEditedPatientPopUp] = useState(false);
    const [isErrorEditPatientPopUp, setIsErrorEditPatientPopUp] = useState(false);
    const [isVisitEditPopUp, setIsVisitEditPopUp] = useState(false);
    const [isErrorVisitEditPopUp, setIsErrorVisitEditPopUp] = useState(false);

    const [cardList, setCardList] = useState(visits);
    const [isModalActive, setIsModalActive] = useState(false);
    const [patientArr, setPatientArr] = useState({});
    const [isVisitEditActive, setIsVisitEditActive] = useState(false); // Open visit Edit modal
    const [visit, setVisit] = useState({});  // Повний обєкт карточки візиту з patient_id включно


    const { lang } = useContext(LanguagesContext);
    const {
        cardDeleteError,
        cardDeleteSuccess,
        editedPatient,
        error_editPatient,
        confirmEditVisit,
        error_editVisit,
    } = translation[lang];

    useEffect(() => {
        if (visitStatus === 'idle') {
            dispatch(fetchVisits())
        }

        if (patientStatus === 'idle') {
            dispatch(fetchPatients());
        }
    },[])

    useEffect(() => {
        setCardList(visits);
    }, [visits]);

    const patientDetails = (newPatientID) => {
        try {
            const foundPatient = patients.find(patient => patient._id === newPatientID);

            if(foundPatient) {
                setPatientArr(foundPatient);
                setIsModalActive(true); // Відкриваємо модальне вікно
            } else {
                console.log("No patient found with ID:", newPatientID,  "Probably patient was eliminated ");
            }

        } catch (error) {
            console.log("Error:", error);
        }
    };


    const deleteCard = async (id) => {
        await deleteHandler(id, deleteVisit, setRemoveCardPopUp, setErrorDeletePopUp, cardList, setCardList);
    };

    // З карточки візиту приходить інформація про візит
    const visitEdit = (visitEditId) => {
        const foundVisit = visits.find(el => el._id === visitEditId);
        setVisit(foundVisit);  // приходить visit_id and patient_id
        setIsVisitEditActive(true);
    };

    return (
        <div className={styles.homePageContainer}>
            {/*<div className={styles.mainBackground}></div>*/}
            <article className={styles.wellcome}></article>
            {patientStatus === 'failed' && <h2 className={styles.errorFrame}>...Ups, Patients loading problem.Error: {patientError} <p>{assistant}</p></h2>}

                <div className={cn(styles.contentGridman, styles.container)}>
                    {visitStatus === 'loading' && <div className={styles.customLoader}></div>}
                    {visitStatus === 'failed' && <h2>Error: {error}</h2>}
                    {visitStatus === 'succeeded' && cardList && cardList.length > 0 && (
                        Array.isArray(cardList) && cardList.map(element =>
                            <Card
                                key={element._id}
                                visitDetails={element}
                                specialist={specializations.filter((spec) => spec.name === element.specialization)}
                                specializationsError={specializationsError}
                                deleteCard={deleteCard}
                                setIsModalActive={setIsModalActive}
                                patientDetails={patientDetails}
                                patientError={patientError}
                                visitEdit={visitEdit}
                                setIsVisitEditActive={setIsVisitEditActive}
                            />
                        )
                    )}

                </div>

            {visitStatus === 'succeeded' && cardList.length === 0 && <div className={styles.noVisits}><h3>No visits</h3></div>}
            {
                isModalActive &&
                    <PatientBlockModals
                        patient={patientArr || null}
                        // setIsPopUpActive={setIsPopUpActive}
                        setIsEditedPatientPopUp={setIsEditedPatientPopUp}
                        setIsErrorEditPatientPopUp={setIsErrorEditPatientPopUp}
                        isModalActive={isModalActive}
                        setIsModalActive={setIsModalActive}

                    />
            }

            {
                isVisitEditActive &&
                    <VisitEdit
                        visit={visit}
                        isVisitEditActive={isVisitEditActive}
                        setIsVisitEditActive={setIsVisitEditActive}
                        setIsVisitEditPopUp={setIsVisitEditPopUp}
                        setIsErrorVisitEditPopUp={setIsErrorVisitEditPopUp}
                    />
            }

            <PopUp activePopUp={isVisitEditPopUp}> {isErrorVisitEditPopUp ? error_editVisit : confirmEditVisit} </PopUp>
            <PopUp activePopUp={isEditedPatientPopUp}> {isErrorEditPatientPopUp? error_editPatient : editedPatient} </PopUp>
            <PopUp activePopUp={removeCardPopUp}>{errorDeletePopUp ? cardDeleteError : cardDeleteSuccess} </PopUp>
            {scroll > 300 && <ToUpButton/>}
        </div>
    )
}

export default HomePage

HomePage.propTypes = {
    visits: PropTypes.array,
    patients: PropTypes.array,
    specializations: PropTypes.array
}

// Головна сторінка, де відображаються картки з інформацією про візити.
// Для поп-ап вікна потрібно в компонент PopUp передати змінну активності, а також наявність помилки, якщо відбулося

