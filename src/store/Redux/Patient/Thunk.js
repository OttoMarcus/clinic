import { createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../../api/index.js';

// Fetch patients
export const fetchPatients = createAsyncThunk('patients/fetchPatients', async (_, { rejectWithValue }) => {
    try {
        const response = await instance.get('/patients');
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
});

// Add new patient
export const newPatient = createAsyncThunk('patients/addPatient', async (data, { rejectWithValue }) => {
    try {
        const response = await instance.post('/patients', data);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
});

// Delete patient
export const deletePatient = createAsyncThunk('patients/deletePatient', async (_id, { rejectWithValue }) => {
    try {
        await instance.delete(`/patients/${_id}`);
        return _id;  // Повертаємо ID видаленого пацієнта
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
});

// Update patient
export const updatePatient = createAsyncThunk('patients/updatePatient', async (data, { rejectWithValue }) => {
    try {
        if (!data._id) {
            throw new Error('Patient has no ID'); // Кидаємо помилку, якщо ID відсутній
        }
        const response = await instance.put(`/patients/${data._id}`, data);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
});
