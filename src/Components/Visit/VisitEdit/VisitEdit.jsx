import {useRef, useContext} from "react"
import PropTypes from "prop-types"
import Modal from "../../Modal/ModalDefault/Modal"
import EditVisitForm from "../../forms/EditVisitForm/EditVisitForm"
import delayPopTimer from "../../PopUp/delayPopTimer"

import LanguagesContext from '../../../store/Context/LanguageContext/LanguagesContext'
import { translation } from '../../../store/Context/LanguageContext/translation/translation'

import {useDispatch} from "react-redux"
import {updateVisit} from "../../../store/Redux/Visit/Thunk"

import styles from "./VisitEdit.module.scss"



const VisitEdit = (props) => {

    const {
        visit,
        isVisitEditActive,
        setIsVisitEditActive,
        setIsVisitEditPopUp,
        setIsErrorVisitEditPopUp
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
        const updatedVisit = {
            id: visit._id,
            ...values
        }


        try {
           const response = await dispatch(updateVisit(updatedVisit));  // передаємо значення з форми

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
                <EditVisitForm
                    visitEditRef={visitEditRef}
                    visitDetails={visit}
                    onSubmit={handleEdit}
                />
            </Modal>
        </div>
    )
}

export default VisitEdit

VisitEdit.propTypes = {
    visit: PropTypes.object.isRequired,
    isVisitEditActive: PropTypes.bool.isRequired,
    setIsVisitEditActive: PropTypes.func.isRequired,
    setIsVisitEditPopUp: PropTypes.func.isRequired,
    setIsErrorVisitEditPopUp: PropTypes.func.isRequired
}