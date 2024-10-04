import { createAsyncThunk } from '@reduxjs/toolkit';
import instance from "../../../api/index.js";


// Fetch doctors
export const fetchDoctors = createAsyncThunk('doctors/fetchDoctors', async (_, { rejectWithValue }) => {
    try {
        const response = await instance.get('/doctors');
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
});

// Add new doctor
export const newDoctor = createAsyncThunk('doctors/newDoctor', async (data, { rejectWithValue }) => {
    try {
        const response = await instance.post('/doctors', data);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
});

// Delete doctor
export const deleteDoctor = createAsyncThunk('doctors/deleteDoctor', async (id, { rejectWithValue }) => {
    try {
        await instance.delete(`/doctors/${id}`);
        return id;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
});

// Update doctor
export const updateDoctor = createAsyncThunk('doctors/updateDoctor', async (data, { rejectWithValue }) => {
    try {
        if (!data.id) {
            throw new Error('Doctor has no ID');
        }
        const response = await instance.put(`/doctors/${data.id}`, data);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
});
