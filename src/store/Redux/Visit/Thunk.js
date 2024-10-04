import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../../api/index.js";

// Fetch visits
export const fetchVisits = createAsyncThunk('visits/fetchVisits', async (_, { rejectWithValue }) => {
    try {
        const response = await instance.get('/visits');
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
});

// Add new visit
export const newVisit = createAsyncThunk('visits/addVisit', async (data, { rejectWithValue }) => {
    try {
        const response = await instance.post('/visits', data);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
});

// Delete visit
export const deleteVisit = createAsyncThunk('visits/deleteVisit', async (id, { rejectWithValue }) => {
    try {
        const response = await instance.delete(`/visits/${id}`);
        return response.data;

    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
});

// Update visit
export const updateVisit = createAsyncThunk('visits/updateVisit', async (data, { rejectWithValue }) => {
    try {
        if (!data.id) {
            throw new Error('Visit has no ID');
        }
        const response = await instance.put(`/visits/${data.id}`, data);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
});
