import React, {useContext, useEffect, useState} from 'react'
import PropTypes from 'prop-types'

import Phone from '../../../Components/icons/Phone/Phone.jsx'
import Email from '../../../Components/icons/Email/Email.jsx'
import Notes from '../../../Components/icons/Notes/Notes.jsx'
import History from '../../../Components/icons/History/History.jsx'
import Next from '../../../Components/icons/Next/Next.jsx'
import Man from '../../../Components/icons/Man/Man.jsx'

import stringToDate from "../../../helper/DataManipulation/stringToDate.js";

import LanguagesContext from "../../../store/Context/LanguageContext/LanguagesContext.jsx"
import { translation } from "../../../store/Context/LanguageContext/translation/translation.js"

import cn from 'classnames'
import styles from './PatientDetails.module.scss'



const PatientDetails = ({patient}) => {
    const { phone, email, dayOfBirth, lastVisit, nextVisit, address, notes } = patient;

    //change language
    const { lang } = useContext(LanguagesContext);
    const {
        addPatientForm,
        sendEmail,
        call,
        last_visit,
        next_visit,
        birthday,
        notations
    } = translation[lang];

    const restrictedNotes = (notes) => {
        if (notes.length > 30) {
            return notes.slice(0, 35) + '...';
        }
        return notes;
    }

    return (
        <div className={styles.itemDetailsContainer}>
            <div className={styles.patientDescriptionContainer}>
                <ul className={styles.iconsContacts}>
                    <li><Phone/></li>
                    <li>
                        <a href={`tel:${phone}`} className={styles.tooltip}>{phone}
                            <p className={styles.tooltiptext}>{call}</p>
                        </a>
                    </li>
                    <li><Email/></li>
                    <li>
                        <a href={`mailto:${email}`} className={styles.tooltip}>{email}
                            <p className={styles.tooltiptext}>{sendEmail}</p>
                        </a>
                    </li>
                    <li><Man/></li>
                    <li className={styles.tooltip}>{dayOfBirth ? stringToDate(dayOfBirth) : "birthday date"}
                        <p className={styles.tooltiptext}>{birthday}</p>
                    </li>
                    <li><History/></li>
                    <li className={styles.tooltip}>{lastVisit ? stringToDate(lastVisit) : "last visit date"}
                        <p className={styles.tooltiptext}>{last_visit}</p>
                    </li>
                    <li><Next/></li>
                    <li className={styles.tooltip}>{nextVisit ? stringToDate(nextVisit) : "next visit date"}
                        <p className={styles.tooltiptext}>{next_visit}</p>
                    </li>
                    <li><Notes/></li>
                    <li className={styles.tooltip}>{restrictedNotes(notes)}
                        <p className={cn(styles.tooltiptext, {[styles.notes]: notes.length > 100})}>{notations}</p>
                    </li>
                </ul>
                <div className={styles.addressWrapper}>
                    <h4>{addPatientForm[6]}</h4>
                    <ul className={styles.addressGrid}>
                        <li>{addPatientForm[7]}:</li>
                        <li className={styles.values}>{address.region}</li>
                        <li>{addPatientForm[8]}:</li>
                        <li className={styles.values}>{address.city}</li>
                        <li>{addPatientForm[9]}:</li>
                        <li className={styles.values}>{address.street}</li>
                        <li>{addPatientForm[13]}:</li>
                        <li className={styles.values}>{address.house}/{address.apt}</li>
                        <li>{addPatientForm[12]}:</li>
                        <li className={styles.values}>{address.zip}</li>
                    </ul>
                </div>
            </div>
        </div>

)
}

PatientDetails.propTypes = {
    address: PropTypes.shape({
        region: PropTypes.string,
        city: PropTypes.string,
        street: PropTypes.string,
        house: PropTypes.string,
        apt: PropTypes.string,
        zip: PropTypes.string
    }),
    phone: PropTypes.string,
    email: PropTypes.string,
    notes: PropTypes.string,
    dayOfBirth: PropTypes.string
}


export default PatientDetails

// Сторінка з детальною інформації про пацієнта.