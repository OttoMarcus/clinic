import { createSlice } from "@reduxjs/toolkit";
import { fetchDoctors, newDoctor, deleteDoctor, updateDoctor } from "./Thunk.js";

const doctorInitState = {
    doctors: [],
    status: 'idle',
    error: null
}

const doctorSlice = createSlice({
    name: 'doctors',
    initialState: doctorInitState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDoctors.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchDoctors.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.doctors = action.payload;
            })
            .addCase(fetchDoctors.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })


            .addCase(newDoctor.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(newDoctor.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.doctors = [action.payload, ...state.doctors];
            })
            .addCase(newDoctor.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })


            .addCase(deleteDoctor.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteDoctor.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.doctors = state.doctors.filter(doctor => doctor.id !== action.payload);
            })
            .addCase(deleteDoctor.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            
            .addCase(updateDoctor.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateDoctor.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const index = state.doctors.findIndex(doctor => doctor.id === action.payload.id);
                if (index !== -1) {
                    state.doctors[index] = action.payload;
                }
            })
            .addCase(updateDoctor.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})

export default doctorSlice.reducer
