import React, {useContext, useEffect} from 'react';
import BgWallpaper from '../../Components/BgWallpaper/BgWallpaper.jsx';
import DocTable from './DocTable/DocTable.jsx';

import { useSelector, useDispatch } from 'react-redux';
import { fetchDoctors } from '../../store/Redux/Doctor/Thunk.js';

import styles from './Doctors.module.scss';


const Doctors = () => {
    const dispatch = useDispatch();
    const doctors = useSelector(state => state.doctors.doctors);
    const status = useSelector(state => state.doctors.status);
    const error = useSelector(state => state.doctors.error);

    const anounce = " We are committed to providing you with the best possible care. There are specialists in wide range of diseases.\n" +
        "                    So we are growing and list of professionals is constantly increasing.\n" +
        "                    In this page you can moderate list of doctors. Adding new ones or correcting personal information.\n" +
        "                    And to see actual announcements that touch doctors.\n";

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchDoctors());
        }
    }, [status, dispatch]);

    return (
        <div className={styles.container}>
            <BgWallpaper anouncement={anounce} />
            {status === 'loading' && <h2>Loading...</h2>}
            {status === 'failed' && <h2>Error: {error}</h2>}
            {status === 'succeeded' && <DocTable doctors={doctors} />}
        </div>
    );
}

export default Doctors;
