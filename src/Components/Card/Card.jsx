import {useState, memo, useContext} from "react"
import PropTypes from "prop-types"

import LanguagesContext from "../../store/Context/LanguageContext/LanguagesContext.jsx"
import {translation} from "../../store/Context/LanguageContext/translation/translation.js"

import CardLabel from "./CardLabel/CardLabel.jsx"
import X from "../icons/X/X.jsx"

import Button from "../Button/Button.jsx"
import Clock from "../icons/Clock/Clock.jsx"

import calcDayDifference from "../../helper/DataManipulation/calcDayDifference.js"
import stringToDate from "../../helper/DataManipulation/stringToDate.js"

import cn from "classnames"
import styles from "./Card.module.scss"




const Card = (props) => {
    const {
        visitDetails: {
            _id,
            patient_id,
            urgency,
            specialization,
            date,
            time,
            name,
            surname,
            ...visitRest
        },
        specialist,
        specializationsError,
        deleteCard,
        patientDetails,
        patientError,
        visitEdit
    } = props;

    const { lang } = useContext(LanguagesContext);
    const { patient, btn_change, btn_delete, btn_cancel, ask_visit_delete } = translation[lang];

    const [openCard, setOpenCard] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    // const dispatch = useDispatch();

    const imgSpecLink = specialist[0]?.img;
    const visitDate = stringToDate(date);



    // Перевіряємо значення urgent і повертаємо відповідний стиль
    const color = () => {
        switch (urgency) {
            case "Urgent":
                return isDeleting ? styles.isDeleting : styles.urgent;
            case "Priority":
                return isDeleting ? styles.isDeleting : styles.priority;
            case "Regular":
                return isDeleting ? styles.isDeleting : styles.regular;
            default:
                return isDeleting ? styles.isDeleting : styles.regular; // Стиль за замовчуванням
        }
    };

    const deleteInit = (event) => {
        event.preventDefault();
        event.stopPropagation(); // Зупиняє спливання події
        setIsDeleting(prev => !prev ); // Змінюємо режим видалення
    }



    // видаляю перші 4 ел.щоб отримати  додаткові запитання
    const entries = Object.entries(visitRest).slice(4);

// вираховую наближення дати візиту, щоб забарвити годинник
    const dateNow = Date.now();
    const leftDays = calcDayDifference(dateNow, date);
    let fill = "none";

    if (leftDays < 2) {
        fill = "day";
    } else if (leftDays < 7) {
        fill = "week";
    } else {
        fill = "month";
    }

    const handleOpenCard = () => {
        setIsDeleting(false);
        setOpenCard(prev =>!prev);
    }

    const openPatientDetails = (event) => {
        event.stopPropagation();
        patientDetails(patient_id);
    }

    const openVisitEdit = (event) => {
        event.stopPropagation();
        visitEdit(_id);
    }

    return (
        <div className={cn(styles.cardContainer, color())} onClick={handleOpenCard}>
            <div className={styles.contentWrapper}>

{/*режим видалення картки*/}

                { isDeleting &&
                    <div className={cn(styles.deleteWrapper, color())}>
                        <div className={styles.deleteFrame}>
                            <div className={styles.btnGroup}>
                                <p className={styles.deleteAsk}>{ask_visit_delete}</p>
                                <div className={styles.deleteGroup}>
                                    <Button
                                       classname={cn(styles.userEdit, styles.userDelete)}
                                       onClick={() => deleteCard(_id)} >
                                        {btn_delete}
                                    </Button>
                                    <Button classname={cn(styles.userEdit, styles.userCancel)} click={deleteInit} >
                                        {btn_cancel}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                }

{/*відкрита картка*/}

                <div className={styles.cardFrame}>
                    <div className={styles.X} onClick={deleteInit}>
                        <X />
                    </div>

                    <p className={styles.bookName}>{name} {surname}</p>

                    <div className={styles.addAskWrapper}>
                        {visitRest.visitReason &&
                            <b>{visitRest.visitReason}</b>
                        }
                        {entries.length > 0 && (
                            <>
                                {entries.map((e, index) => (
                                    <p key={index}>{e[0]}: <b>{e[1]}</b></p>
                                ))}
                            </>
                        )}
                    </div>

                    <div className={styles.bookWrapper}>
                        <div className={styles.deleteGroup}>
                            <div className={styles.timeWrapper}>
                                <div className={styles.timeRow}>
                                    <p>{time}</p>
                                    <Clock fill={fill}/>
                                </div>
                                <p>{visitDate}</p>
                            </div>
                            <Button classname={cn(styles.userEdit, styles.userDelete)}
                                    click={openPatientDetails}
                                    disabled={!!patientError}
                            >
                                    {patient}
                            </Button>
                            <Button classname={cn(styles.userEdit, styles.userCancel)}
                                    click={openVisitEdit}
                            >
                                {btn_change}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

{/* Зачинена обгортка картки*/}

            <div className={cn(styles.cardWrapper, color(), {[styles.activeCard]: openCard})}>
                <CardLabel classname={cn(color(), styles.urgencyLabel)} text={urgency + " visit"}/>
                <CardLabel classname={cn(color(), styles.specializationLabel)} text={specialization}/>
                <CardLabel classname={cn(color(), styles.nameLabel)} text={"doc." + visitRest.dedicatedDoctor}/>
                <div className={styles.imageWrapper}>
                    {
                        specializationsError
                            ? <p>{specializationsError}</p>
                            : <img src={imgSpecLink} alt="card title image" className={styles.imgSpecLink} />
                    }
                </div>
                <div className={styles.visitDate}>{visitDate}</div>
            </div>
        </div>
    );
};

export default memo(Card);

Card.propTypes = {
    visitDetails: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        patient_id: PropTypes.string.isRequired,
        time: PropTypes.string,
        urgency: PropTypes.string.isRequired,
        specialization: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        surname: PropTypes.string.isRequired,
    }).isRequired,
    specialist: PropTypes.arrayOf(PropTypes.shape({
        img: PropTypes.string.isRequired,
    })).isRequired,
    specializationsError: PropTypes.string,
    deleteCard: PropTypes.func.isRequired,
    patientDetails: PropTypes.func,
    patientError: PropTypes.bool,
    visitEdit: PropTypes.func
};


// У цему компоненті я пропсом отримую значення urgent, яке передається в компонент Card для відфарбування
// картки відповідним кольором.