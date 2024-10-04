import { useState, useRef } from "react";
import Modal from "../Modal/ModalDefault/Modal.jsx";
import LoginForm from "../forms/LoginForm/LoginForm.jsx";
import { title, textFirst, textSecondary } from "../../helper/constant.js";
import styles from "../Modal/ModalLogin/ModalLogin.module.scss";
import PropTypes from "prop-types";

const Authorization = ({ setIsAuth }) => {
    const [isModalActive, setIsModalActive] = useState(true);

    const logRef = useRef();

    // const [inputValues, setInputValues] = useState({
    //     username: "admin",
    //     password: ""
    // });

    const userList = [
        { username: "admin", password: "admin" },
        { username: "otto", password: "marcus" }
    ];


    const findUser = (arr, key, value) => {
        return arr.find(user => user[key] === value);
    };

    const handleSubmit = () => {
        if (logRef.current.isValid ) {
            const user = findUser(userList, "username", logRef.current.values.username);

            if (user) {
                if (user.password === logRef.current.values.password) {
                    sessionStorage.setItem('isAuthenticated', 'true');
                    setIsAuth(true);
                    setIsModalActive(false);
                } else {
                    sessionStorage.setItem('isAuthenticated', 'false');
                    setIsAuth(false);
                    if (logRef.current.values.password.length > 0) {
                        logRef.current.setFieldError('password', 'Password is incorrect');
                    } else {
                        logRef.current.setFieldError('password', 'Password can\'t be empty');
                    }
                }
            } else {
                sessionStorage.setItem('isAuthenticated', 'false');
                setIsAuth(false);
                if (logRef.current.values.username.length > 0) {
                    logRef.current.setFieldError('username', 'Username is incorrect')
                } else {
                    logRef.current.setFieldError('username', 'Username can\'t be empty')
                }
            }
        } else {
            console.log('void Login or Password fields');
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Запобігає відправці форми за замовчуванням
            handleSubmit();
        }
    };

    return (
        <Modal
            isModalClose={false}
            isModalActive={isModalActive}
            setIsModalActive={setIsModalActive}
            backdropStyles={styles.initBackdrop}
            title={title}
            textFirst={textFirst}
            textSecondary={textSecondary}
            clickSecondary={handleSubmit}

        >
            <LoginForm logRef={logRef} onSubmit={handleSubmit} onKeyDown={handleKeyDown}/>
        </Modal>
    );
};

export default Authorization;


Authorization.propTypes = {
    setIsAuth: PropTypes.bool
}