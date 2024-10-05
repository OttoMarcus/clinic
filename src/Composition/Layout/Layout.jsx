import {useState} from 'react'
import { Outlet } from 'react-router-dom'
import Authorization from '../../Components/Authorization/Authorization.jsx'


const Layout = () => {
    const [isAuth, setIsAuth] = useState(sessionStorage.getItem('isAuthenticated') === 'true');


    return (
        <>
            {!isAuth && <Authorization setIsAuth={setIsAuth}/>}
            <Outlet /> 
        </>
    )
}

export default Layout;
