import { createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../../api/index.js';

// Fetch specializations
export const fetchSpec = createAsyncThunk('specialization/fetchSpec', async (_, { rejectWithValue }) => {
    try {
        const response = await instance.get('/specializations');
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
});

// Add new specialization
export const newSpec = createAsyncThunk('specialization/newSpec', async (data, { rejectWithValue }) => {
    try {
        const response = await instance.post('/specializations', data);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
});

// Update specialization
export const updateSpec = createAsyncThunk('specialization/updateSpec', async (data, { rejectWithValue }) => {
    try {
        if (!data.id) {
            throw new Error('Specialization has no ID');
        }
        const response = await instance.put(`/specializations/${data.id}`, data);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
});

// Delete specialization
export const deleteSpec = createAsyncThunk('specialization/deleteSpec', async (id, { rejectWithValue }) => {
    try {
        await instance.delete(`/specializations/${id}`);
        return id
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
});
