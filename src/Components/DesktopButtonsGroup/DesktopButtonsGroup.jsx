import React, { useContext, useState, useEffect, useRef, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import onSubmitRef   from "../../helper/onSubmitRef.js";

import { newPatient } from '../../store/Redux/Patient/Thunk.js'
import { newDoctor } from '../../store/Redux/Doctor/Thunk.js'
import { fetchSpec } from '../../store/Redux/Specialization/Thunk.js'

import Button from '../Button/Button.jsx';
import Sort from '../icons/Sort/Sort.jsx';
import Home from '../icons/Home/Home.jsx';
import AddDoctorForm from '../forms/AddDoctorForm/AddDoctorForm.jsx';
import AddPatientForm from '../forms/AddPatientForm/AddPatientForm.jsx';
import Navigation from '../icons/Navigation/Navigation.jsx';
import delayPopTimer from "../PopUp/delayPopTimer.js";

import { translation } from '../../store/Context/LanguageContext/translation/translation.js'
import LanguagesContext from '../../store/Context/LanguageContext/LanguagesContext.jsx'

import Menu from './Menu/Menu.jsx'
import { Link, useLocation } from 'react-router-dom'
import Modal from '../Modal/ModalDefault/Modal.jsx'
import Visit from "../Visit/Visit.jsx"
import PopUp from "../PopUp/PopUp.jsx"
import useSubmitHandler from '../../helper/useSubmitHandler.js'

import cn from 'classnames'
import styles from './DesktopButtonsGroup.module.scss'




const DesktopButtonsGroup = () => {
///////////////////////////////////   LANGUAGE   /////////////////////////////////

    const { lang, changeLang } = useContext(LanguagesContext);
    const { visit,
        addDoctor,
        addPatient,
        title_doctor,
        title_patient,
        btn_cancel,
        btn_submit,
        confirmAddPatient,
        confirmAddDoctor,
        confirmAddVisit,
        errorAddPatient,
        errorAddDoctor,
        errorAddVisit
    } = translation[lang];

//////////////////////////////////   REDUX   /////////////////////////////////////

    const status = useSelector(state => state.specialization.status);
    const error = useSelector(state => state.specialization.error);
    const dispatch = useDispatch();

//////////////////////////////////   REFERENCE   /////////////////////////////////////

    const patientFormikRef = useRef();
    const doctorFormikRef = useRef();

//////////////////////////////////   HOOKS   /////////////////////////////////////

    const handleSubmit = useSubmitHandler();
    const location = useLocation().pathname;

//////////////////////////////////   EFFECTS   /////////////////////////////////////

    useEffect(() => {
        setLocationPath(location);
    }, [location]);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchSpec());
        } else if (status === 'failed') {
            console.log(error);
        }
    }, [status, dispatch]);
    
 /////////////////////////////////   STATE HOOKS   /////////////////////////////////

    const [isAddPatientModalActive, setIsAddPatientModalActive] = useState(false);
    const [isAddDoctorModalActive, setIsAddDoctorModalActive] = useState(false);
    const [isVisitActive, setVisitActive] = useState(false);
    const [isErrorByAdding, setIsErrorByAdding] = useState(false);
    const [isOpenNav, setIsOpenNav] = useState(false);
    const [locationPath, setLocationPath] = useState(location);
    const [patientPopUp, setPatientPopUp] = useState(false);  //STATE FOR PATIENT POPUP
    const [doctorPopUp, setDoctorPopUp] = useState(false);  //STATE FOR DOCTOR POPUP
    const [visitPopUp, setVisitPopUp] = useState(false);  //STATE FOR VISIT POPUP

/////////////////////////////////   OPEN-CLOSE MODALS   /////////////////////////////

    const handleVisitModal = () => {
        setVisitActive((prev) => !prev);
    }

    const handleDoctorModal = () => {
        setIsAddDoctorModalActive((prev) => !prev);
    }

    const handlePatientModal = () => {
        setIsAddPatientModalActive((prev) => !prev);
    }

/////////////////////////////////   FORM SUBMISSIONS   /////////////////////////////

    const handleDoctorSubmit = async (values) => {
        await handleSubmit(values, newDoctor, handleDoctorModal, setIsErrorByAdding);
        delayPopTimer(setDoctorPopUp);
    };

    const handlePatientSubmit = async (values) => {
        await handleSubmit(values, newPatient, handlePatientModal, setIsErrorByAdding);
        delayPopTimer(setPatientPopUp);
    };


    return (
        <div className={styles.btnGroup}>
            <Link to="/"><Button classname={cn(styles.btnGrey, styles.home)} children={<Home/>}/></Link>
            <Button classname={styles.btnBlack} children={<Sort/>}/>
            <Button classname={styles.btnGrey} children={lang} click={() => changeLang(lang)}/>
            { (locationPath === '/' || locationPath === "/calendar") && <Button classname={styles.btnBlackWide} children={visit} click={handleVisitModal}/>}
            { locationPath === "/doctors" && <Button classname={styles.btnBlackWide} children={addDoctor} click={handleDoctorModal} />}
            { locationPath === "/patients" && <Button classname={styles.btnBlackWide} children={addPatient} click={handlePatientModal}/> }
            <div className={styles.menuAncor}>
                <Button classname={styles.navStyleBtn} children={<Navigation/>} click={() => setIsOpenNav(!isOpenNav)}/>
                <Menu classname={isOpenNav} setIsActive={setIsOpenNav}/>
            </div>
            {/*///////////////////////////////////   ADD VISIT   ////////////////////////////////////*/}
            {
                (locationPath === '/' || locationPath === "/calendar") && isVisitActive &&
                <Visit
                    setVisitActive={ setVisitActive }
                    isVisitActive={ isVisitActive }
                    setIsErrorByAdding={ setIsErrorByAdding }
                    setVisitPopUp={ setVisitPopUp }
                    setPatientPopUp={ setPatientPopUp }
                />
            }
            {/* /////////////////////////////////   ADD DOCTOR   /////////////////////////////////////*/}
            {
                locationPath === "/doctors" && isAddDoctorModalActive &&
                <Modal
                    setIsModalActive={ setIsAddDoctorModalActive }
                    isModalActive={ isAddDoctorModalActive }
                    title={title_doctor}
                    children={<AddDoctorForm formikRef={doctorFormikRef} onSubmit={handleDoctorSubmit}/>}
                    textFirst={btn_cancel}
                    clickFirst={handleDoctorModal}
                    textSecondary={btn_submit}
                    clickSecondary={() => onSubmitRef(doctorFormikRef)}
                    type={"submit"}
                />
            }
            {/*/////////////////////////////////////   ADD PATIENT   //////////////////////////////////////*/}
            {
                locationPath === "/patients" && isAddPatientModalActive &&
                <Modal
                    setIsModalActive={ setIsAddPatientModalActive}
                    isModalActive={ isAddPatientModalActive}
                    title={title_patient}
                    children={<AddPatientForm formikRef={patientFormikRef} onSubmit={handlePatientSubmit}/>}
                    textFirst={btn_cancel}
                    clickFirst={handlePatientModal}
                    textSecondary={btn_submit}
                    clickSecondary={() => onSubmitRef(patientFormikRef)}
                    type={"submit"}
                />
            }

            <PopUp activePopUp={patientPopUp} children={ isErrorByAdding ? errorAddPatient : confirmAddPatient } />
            <PopUp activePopUp={doctorPopUp} children={ isErrorByAdding ? errorAddDoctor : confirmAddDoctor } />
            <PopUp activePopUp={visitPopUp} children={ isErrorByAdding ? errorAddVisit : confirmAddVisit } />
        </div>
    )
}

export default memo(DesktopButtonsGroup);
