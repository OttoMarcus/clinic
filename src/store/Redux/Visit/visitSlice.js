import { createSlice } from "@reduxjs/toolkit"
import { fetchVisits, newVisit, deleteVisit, updateVisit } from "./Thunk.js"

const initState = {
    visits: [],
    status: 'idle',
    error: null
}

const visitSlice = createSlice({
    name: 'visits',
    initialState: initState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchVisits.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchVisits.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.visits = action.payload;
            })
            .addCase(fetchVisits.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })


            .addCase(newVisit.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(newVisit.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.visits = [action.payload, ...state.visits];
                state.error = null;
            })
            .addCase(newVisit.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })



            .addCase(deleteVisit.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteVisit.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.visits = state.visits.filter(visit => visit._id !== action.payload);
            })
            .addCase(deleteVisit.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })



            .addCase(updateVisit.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateVisit.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const index = state.visits.findIndex(visit => visit._id === action.payload.id);
                if (index !== -1) {
                    state.visits[index] = action.payload;
                }
            })
            .addCase(updateVisit.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})

export default visitSlice.reducer;