// Jest tests for courseService
import axios from 'axios';
import * as courseService from '../services/courseService';

// Mock axios so we don't make real API calls
jest.mock('axios');

// Set fake token before each test
beforeEach(() => {
    localStorage.clear();
    localStorage.setItem('token', 'fake-token-123');
});

// =============================================
// TEST 1 — getAllCourses returns course list
// =============================================
test('getAllCourses returns course data on success', async () => {
    const fakeCourses = [
        { courseId: 1, title: 'Math 101', description: 'Basic math', duration: '8 Weeks', instructor: 'Mr. Smith' },
        { courseId: 2, title: 'Science 101', description: 'Basic science', duration: '6 Weeks', instructor: 'Ms. Jones' }
    ];

    axios.get.mockResolvedValue({ data: fakeCourses });

    const response = await courseService.getAllCourses();

    expect(response.data).toHaveLength(2);
    expect(response.data[0].title).toBe('Math 101');
});

// =============================================
// TEST 2 — getAllCourses throws error on failure
// =============================================
test('getAllCourses throws error when API fails', async () => {
    axios.get.mockRejectedValue(new Error('Network Error'));

    await expect(courseService.getAllCourses()).rejects.toThrow('Network Error');
});

// =============================================
// TEST 3 — createCourse sends correct data
// =============================================
test('createCourse sends course data and returns success', async () => {
    const newCourse = {
        title: 'New Course',
        description: 'New description',
        duration: '4 Weeks',
        instructor: 'Mr. Brown'
    };

    axios.post.mockResolvedValue({ data: 'Course created successfully.' });

    const response = await courseService.createCourse(newCourse);

    expect(response.data).toBe('Course created successfully.');
    expect(axios.post).toHaveBeenCalled();
});

// =============================================
// TEST 4 — updateCourse sends updated data
// =============================================
test('updateCourse sends updated course data', async () => {
    const updatedCourse = {
        title: 'Updated Title',
        description: 'Updated desc',
        duration: '8 Weeks',
        instructor: 'Mr. Smith'
    };

    axios.put.mockResolvedValue({ data: 'Course updated successfully.' });

    const response = await courseService.updateCourse(1, updatedCourse);

    expect(response.data).toBe('Course updated successfully.');
    expect(axios.put).toHaveBeenCalled();
});

// =============================================
// TEST 5 — deleteCourse calls correct endpoint
// =============================================
test('deleteCourse calls API with correct course id', async () => {
    axios.delete.mockResolvedValue({ data: 'Course deleted successfully.' });

    const response = await courseService.deleteCourse(1);

    expect(response.data).toBe('Course deleted successfully.');
    expect(axios.delete).toHaveBeenCalled();
});

// =============================================
// TEST 6 — getCourseById returns correct course
// =============================================
test('getCourseById returns the correct course', async () => {
    const fakeCourse = {
        courseId: 1,
        title: 'Math 101',
        description: 'Basic math',
        duration: '8 Weeks',
        instructor: 'Mr. Smith'
    };

    axios.get.mockResolvedValue({ data: fakeCourse });

    const response = await courseService.getCourseById(1);

    expect(response.data.courseId).toBe(1);
    expect(response.data.title).toBe('Math 101');
});

// =============================================
// TEST 7 — createCourse fails on network error
// =============================================
test('createCourse throws error when API fails', async () => {
    axios.post.mockRejectedValue(new Error('Server Error'));

    await expect(courseService.createCourse({ title: 'Test' }))
        .rejects.toThrow('Server Error');
});

// =============================================
// TEST 8 — updateCourse fails on network error
// =============================================
test('updateCourse throws error when API fails', async () => {
    axios.put.mockRejectedValue(new Error('Server Error'));

    await expect(courseService.updateCourse(1, { title: 'Test' }))
        .rejects.toThrow('Server Error');
});

// =============================================
// TEST 9 — deleteCourse fails on network error
// =============================================
test('deleteCourse throws error when API fails', async () => {
    axios.delete.mockRejectedValue(new Error('Server Error'));

    await expect(courseService.deleteCourse(1))
        .rejects.toThrow('Server Error');
});

// =============================================
// TEST 10 — getAllCourses returns empty list
// =============================================
test('getAllCourses returns empty list when no courses', async () => {
    axios.get.mockResolvedValue({ data: [] });

    const response = await courseService.getAllCourses();

    expect(response.data).toHaveLength(0);
});