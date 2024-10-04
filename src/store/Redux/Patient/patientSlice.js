import { createSlice } from "@reduxjs/toolkit";
import { fetchPatients, newPatient, deletePatient, updatePatient } from "./Thunk.js";

const initState = {
    patients: [],
    status: 'idle',
    error: null
}

const patientSlice = createSlice({
    name: 'patients',
    initialState: initState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPatients.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPatients.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.patients = action.payload;
            })
            .addCase(fetchPatients.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })


            .addCase(newPatient.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(newPatient.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.patients = [action.payload, ...state.patients];
                state.error = null;  // Скидаємо помилки після успішного додавання
            })
            .addCase(newPatient.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })


            .addCase(deletePatient.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deletePatient.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.patients = state.patients.filter(patient => patient._id !== action.payload);
            })
            .addCase(deletePatient.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })


            .addCase(updatePatient.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updatePatient.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const index = state.patients.findIndex(patient => patient._id === action.payload._id);
                if (index !== -1) {
                    state.patients[index] = action.payload;
                }
            })
            .addCase(updatePatient.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
})

export default patientSlice.reducer;
