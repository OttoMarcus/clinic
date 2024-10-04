import { configureStore } from "@reduxjs/toolkit";
import doctorSlice from "./Doctor/doctorSlice.js";
import patientSlice from "./Patient/patientSlice.js";
import specDoctorSlice from "./Specialization/specDoctorSlice.js";
import visitSlice from "./Visit/visitSlice.js";

const store = configureStore({
    reducer: {
        doctors: doctorSlice,
        patients: patientSlice,
        specialization: specDoctorSlice,
        visits: visitSlice
    }
});

export default store