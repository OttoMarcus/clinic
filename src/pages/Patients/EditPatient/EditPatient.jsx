import {useContext} from 'react'
import PropTypes from "prop-types";
import Button from '../../../Components/Button/Button.jsx'
import Garbage from '../../../Components/icons/Garbage/Garbage.jsx'

import ConfirmPatientDeleteForm from '../../../Components/forms/ConfirmPatientDeleteForm/ConfirmPatientDeleteForm.jsx'
import EditPatientForm from '../../../Components/forms/EditPatientForm/EditPatientForm.jsx'

import LanguagesContext from '../../../store/Context/LanguageContext/LanguagesContext.jsx'
import { translation } from '../../../store/Context/LanguageContext/translation/translation.js'

import cn from 'classnames'
import styles from './EditPatient.module.scss'



const EditPatient = (props) => {

    const {
        patient,
        editRef,              //   для доступу форми Edit
        deleteRef,              //   для доступу форми Delete
        onSubmit,           //   для відправки форми Edit
        onDelete,
        isDelete,
        isCorrect,
        setIsCorrect,
        setIsDelete
    } = props;

    const { lang } = useContext(LanguagesContext);
    const { btn_delete } = translation[lang];


    //   стилі рамки при невірному вводі
    const toggleDelete = () => {
        setIsDelete(prev => !prev);
        setIsCorrect(true);
        deleteRef.current.resetForm();
    }

    return (
        <div className={styles.editForm}>
            <EditPatientForm patient={patient} editRef={editRef} onSubmit={onSubmit}/>
            <div className={styles.contentWrapper}>
                <p className={styles.content}>{btn_delete}</p>
                <div className={cn(styles.deleteMsg, {[styles.hidden]: !isDelete})}>
                    <ConfirmPatientDeleteForm deleteRef={deleteRef} onDelete={onDelete} isCorrect={isCorrect}/>
                </div>
                <div className={styles.garbageContainer}>
                    <Button classname={styles.btnGrey} click={toggleDelete}><Garbage/></Button>
                </div>
            </div>
        </div>
    )
}

export default EditPatient

EditPatient.propTypes = {
    patient: PropTypes.object,
    editRef: PropTypes.object,
    deleteRef: PropTypes.object,
    onSubmit: PropTypes.func,
    onDelete: PropTypes.func,
    isDelete: PropTypes.bool,
    isCorrect: PropTypes.bool,
    setIsCorrect: PropTypes.func,
    setIsDelete: PropTypes.func
}
