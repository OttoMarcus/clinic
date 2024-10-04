import {useRef, useContext} from "react";
import Modal from "../../Modal/ModalDefault/Modal.jsx"
import AddVisitForm from "../../forms/AddVisitForm/AddVisitForm.jsx"

import LanguagesContext from '../../../store/Context/LanguageContext/LanguagesContext.jsx'
import { translation } from '../../../store/Context/LanguageContext/translation/translation.js'

import {useDispatch} from "react-redux";
import {updateVisit} from "../../../store/Redux/Visit/Thunk.js";

import delayPopTimer from "../../PopUp/delayPopTimer.js";

import styles from "./VisitEdit.module.scss"




const VisitEdit = (props) => {

    const {
        setIsVisitEditActive,
        isVisitEditActive,
        setIsVisitEditPopUp,
        setIsErrorVisitEditPopUp,
        visit
    } = props;


    const { lang } = useContext(LanguagesContext);
    const { visit_edit, btn_save, btn_cancel } = translation[lang];
    const dispatch = useDispatch();
    const visitEditRef = useRef();



    const onSubmit = () => {        //
        if(visitEditRef.current) {
            visitEditRef.current.submitForm();
            // delayPopTimer(setIsEditedPopUp);
        }
    }

    const handleEdit = async (values) => {
        try {
            // const updatedVisit = {
            //     id: visit._id,
            //     ...values
            // }

           const response = await dispatch(updateVisit(values));  // передаємо значення з форми

           if(response.meta.requestStatus === "fulfilled") {
               delayPopTimer(setIsVisitEditPopUp);
               setIsVisitEditActive(false);
               // setIsModalActive(false);
           } else if (response.meta.requestStatus === "rejected") {
               setIsErrorVisitEditPopUp(true);
           }
        } catch (error) {
            console.log('Patient data must include an id', error);
            setIsErrorVisitEditPopUp(true);
        }
    }


    return (
        <div className={styles.editVisitForm}>
            <Modal
                title={visit_edit}
                textFirst={btn_save}
                clickFirst={onSubmit}
                textSecondary={btn_cancel}
                clickSecondary={() => setIsVisitEditActive(false)}
                classnameFirst={styles.btnGreyWide}
                classnameSecondary={styles.btnBlackWide}
                isModalActive={isVisitEditActive}
                setIsModalActive={setIsVisitEditActive}
                isModalClose={true}
            >
                <AddVisitForm
                    visitFormRef={visitEditRef}
                    patientFind={visit}
                    onSubmit={handleEdit}
                />

            </Modal>

        </div>
    )
}

export default VisitEdit