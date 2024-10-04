import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from '../Composition/Layout/Layout.jsx'
import HomePage from '../pages/HomePage/HomePage.jsx'
import Doctors from '../pages/Doctors/Doctors.jsx'
import Patients from '../pages/Patients/Patients.jsx'
import Calendar from '../pages/Calendar/Calendar.jsx'
import PageNotFound from '../pages/PageNotFound/PageNotFound.jsx'
import ModalLogin from '../Components/Modal/ModalLogin/ModalLogin.jsx'

const RootRoutes = () => {

    // const handleLogin = () => {
    //     sessionStorage.setItem('isAuthenticated', 'true');
    //     setIsAuth(true);
    // };

    // useEffect(() => {
    //     const auth = sessionStorage.getItem('isAuthenticated') === 'true';
    //     setIsAuth(auth);
    // }, []);

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="/doctors" element={<Doctors />} />
                <Route path="/patients" element={<Patients />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="*" element={<PageNotFound />} />
            </Route>
        </Routes>
    )
}

export default RootRoutes;
