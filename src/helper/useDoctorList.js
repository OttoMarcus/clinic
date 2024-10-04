import { useSelector } from "react-redux"

const useDoctorList = () => {
    return useSelector(state => state.doctors.doctors);
}

export default useDoctorList