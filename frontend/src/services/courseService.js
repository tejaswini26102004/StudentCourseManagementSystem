import axios from 'axios';
import { API_URL, getHeaders } from './authService';

// GET all courses
export const getAllCourses = () =>
    axios.get(`${API_URL}/courses`, getHeaders());

// GET single course by id
export const getCourseById = (id) =>
    axios.get(`${API_URL}/courses/${id}`, getHeaders());

// CREATE course (Teacher only)
export const createCourse = (data) =>
    axios.post(`${API_URL}/courses`, data, getHeaders());

// UPDATE course (Teacher only)
export const updateCourse = (id, data) =>
    axios.put(`${API_URL}/courses/${id}`, data, getHeaders());

// DELETE course (Teacher only)
export const deleteCourse = (id) =>
    axios.delete(`${API_URL}/courses/${id}`, getHeaders());