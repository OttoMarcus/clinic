import React, {useState} from 'react'
import { Outlet } from 'react-router-dom'
import Authorization from '../../Components/Authorization/Authorization.jsx'
import ModalLogin from '../../Components/Modal/ModalLogin/ModalLogin.jsx'

const Layout = () => {
    const [isAuth, setIsAuth] = useState(sessionStorage.getItem('isAuthenticated') === 'true');


    return (
        <>
            {/*{!isAuth && <ModalLogin/>}*/}
            {!isAuth && <Authorization setIsAuth={setIsAuth}/>}
            <Outlet /> 
        </>
    )
}

export default Layout;
