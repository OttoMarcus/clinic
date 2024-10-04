import { createSlice } from "@reduxjs/toolkit"
import { fetchSpec, newSpec, deleteSpec, updateSpec } from './Thunk.js'

const specInitState = {
    specialization: [],
    status: 'idle',
    error: null
}

const specDoctorSlice = createSlice ({
    name: 'specialization',
    initialState: specInitState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSpec.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchSpec.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.specialization = action.payload;
            })
            .addCase(fetchSpec.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })


            .addCase(newSpec.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(newSpec.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.specialization = action.payload;
            })
            .addCase(newSpec.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })


            .addCase(updateSpec.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateSpec.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const index = state.specialization.findIndex(spec => spec.id === action.payload.id);
                if (index !== -1) {
                    state.specialization[index] = action.payload;
                }
            })
            .addCase(updateSpec.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })


            .addCase(deleteSpec.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteSpec.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.specialization = state.specialization.filter(spec => spec.id !== action.payload);
            })
            .addCase(deleteSpec.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})

export default specDoctorSlice.reducer