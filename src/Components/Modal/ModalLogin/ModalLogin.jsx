import React, {useState} from 'react'
import PropTypes from 'prop-types'
import Backdrop from '../ModalDefault/Backdrop.jsx'
import ModalWindow from '../ModalDefault/ModalWindow.jsx'
import ModalHeader from '../ModalDefault/ModalHeader.jsx'
import ModalClose from '../ModalDefault/ModalClose.jsx'
import ModalBody from '../ModalDefault/ModalBody.jsx'
import ModalFooter from '../ModalDefault/ModalFooter.jsx'
import EyeOpen from '../../icons/Eye/EyeOpen.jsx'
import EyeClose from '../../icons/Eye/EyeClose.jsx'
import Easer from '../../icons/Easer/Easer.jsx'
import cn from 'classnames'

import styles from './ModalLogin.module.scss'


const ModalLogin = () => {
    const[isModalActive, setIsModalActive] = useState(true);
    const[isHidden, setIsHidden] = useState(true);
    const[inputValues, setInputValues] = useState({
        username: "admin",
        password: ""
    })

    const userList = [
        {username: "admin", password: "admin"},
        {username: "otto", password: "marcus"}
    ]

    // const toggleShowPassword = () => {
    //     setIsHidden(!isHidden)
    // }
    //
    // const easer = () => {
    //     setInputValues({
    //         username: "",
    //         password: ""
    //     });
    // };

    const handleChange = (event) => {
        const {name, value} = event.target;
        setInputValues({...inputValues, [name]: value});
    }

    const handleSubmit = (event) => {
        // event.preventDefault();

        const userFound = userList?.find(user =>
            user.username === inputValues.username && user.password === inputValues.password
        );

        if (userFound) {
            sessionStorage.setItem('isAuthenticated', 'true');
            setIsModalActive(false);
        } else {
            sessionStorage.setItem('isAuthenticated', 'false');
        }
    }


    return (
        <Backdrop classname={cn(styles.initBackdrop, {[styles.activeModal]: isModalActive})}>
            <ModalWindow>
                <ModalHeader title={"wellcome to clinic happy"} />
                <ModalBody>
                    <form action="" method="get" >
                        <fieldset className={styles.login}>
                            <legend className={styles.legend}>authorization</legend>
                            <div className={styles.easer} onClick={easer}>
                                <Easer/>
                            </div>
                            <div className={styles.inputContainer}>
                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    id="usernameId"
                                    placeholder="user"
                                    value={inputValues.username}
                                    required
                                />
                            </div>
                            <div className={styles.inputContainer}>
                                <label htmlFor="password">Password</label>
                                <input
                                    type={isHidden ? "password" : "text"}
                                    name="password" id="passwordId"
                                    placeholder="password"
                                    onChange={handleChange}
                                    value={inputValues.password}
                                    required
                                />
                                <div className={styles.eyeContainer} onClick={toggleShowPassword}>
                                    {isHidden ? <EyeOpen/> : <EyeClose/>}
                                </div>
                            </div>
                        </fieldset>
                    </form>
                </ModalBody>
                <ModalFooter textFirst={"Fogot password"} textSecondary={"Submit"} clickSecondary={ handleSubmit }/>
            </ModalWindow>
        </Backdrop>
    )
}

export default ModalLogin