import React, {useState} from "react"
import PropTypes from "prop-types"

import {Formik, Form} from "formik"
import CustomLoginField from "../CustomInputFields/CustomLoginField/CustomLoginField.jsx"
import validationSchema from "./validationSchema.js"

import EyeClose from "../../icons/Eye/EyeClose.jsx"
import EyeOpen from "../../icons/Eye/EyeOpen.jsx"
import Easer from "../../icons/Easer/Easer.jsx"

import styles from "./LoginForm.module.scss"




const LoginForm = ({logRef, onSubmit, onKeyDown}) => {
    const [isEyeOpen, setIsEyeOpen] = useState(false);

    const initialValues = {
        username: 'admin',
        password: ''
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            innerRef={logRef}
        >
            {(form) => {
                return (
                    <Form className={styles.formLogin}  onKeyDown={onKeyDown} >
                        <CustomLoginField name="username" id="username" label="Username" />
                            <div className={styles.clearFields} onClick={() => form.resetForm({values: {username: '', password: ''}})}>
                                <Easer />
                            </div>
                        <CustomLoginField name="password" id="password" label="Password" type={isEyeOpen ? "text" : "password"}/>
                            <div className={styles.eyeWrapper} onClick={() => setIsEyeOpen(!isEyeOpen)}>
                                {   isEyeOpen
                                    ?  <EyeOpen />
                                    :  <EyeClose />
                                }
                            </div>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default LoginForm

LoginForm.propTypes = {
    logRef: PropTypes.object,
    onSubmit: PropTypes.func,
    onKeyDown: PropTypes.func
}