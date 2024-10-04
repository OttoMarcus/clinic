import React from "react";
import {useNavigate} from "react-router-dom";
import cn from "classnames";
import styles from "./PageNotFound.module.scss";

const PageNotFound = () => {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    return (
        <>
            <div className={cn(styles.page404, styles.container)}>
                <div className={styles.imgBg}>
                    <div className={styles.four0four}>
                        <h3>Look like you&apos;re lost</h3>
                        <div>
                            <h1>404</h1>
                            <p>the page you are looking for not available!</p>
                            <div onClick={goBack} className={styles.link404}>Go back</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PageNotFound