// Jest tests for authService
import * as authService from '../services/authService';

// Clear localStorage before each test
beforeEach(() => {
    localStorage.clear();
});

// =============================================
// TEST 1 — isLoggedIn returns false when no token
// =============================================
test('isLoggedIn returns false when no token exists', () => {
    const result = authService.isLoggedIn();
    expect(result).toBe(false);
});

// =============================================
// TEST 2 — isLoggedIn returns true when token exists
// =============================================
test('isLoggedIn returns true when token exists', () => {
    localStorage.setItem('token', 'fake-token-123');
    const result = authService.isLoggedIn();
    expect(result).toBe(true);
});

// =============================================
// TEST 3 — saveUser saves all data correctly
// =============================================
test('saveUser saves token, role, name and userId correctly', () => {
    const fakeUser = {
        token: 'fake-token-123',
        role: 'Teacher',
        name: 'John Teacher',
        userId: 1
    };

    authService.saveUser(fakeUser);

    expect(localStorage.getItem('token')).toBe('fake-token-123');
    expect(localStorage.getItem('role')).toBe('Teacher');
    expect(localStorage.getItem('name')).toBe('John Teacher');
    expect(localStorage.getItem('userId')).toBe('1');
});

// =============================================
// TEST 4 — getRole returns correct role
// =============================================
test('getRole returns the saved role', () => {
    localStorage.setItem('role', 'Student');
    expect(authService.getRole()).toBe('Student');
});

// =============================================
// TEST 5 — getName returns correct name
// =============================================
test('getName returns the saved name', () => {
    localStorage.setItem('name', 'Jane Student');
    expect(authService.getName()).toBe('Jane Student');
});

// =============================================
// TEST 6 — getUserId returns correct id
// =============================================
test('getUserId returns the saved userId', () => {
    localStorage.setItem('userId', '5');
    expect(authService.getUserId()).toBe('5');
});

// =============================================
// TEST 7 — logout clears all user data
// =============================================
test('logout clears all saved user data', () => {
    localStorage.setItem('token', 'fake-token');
    localStorage.setItem('role', 'Teacher');
    localStorage.setItem('name', 'John');
    localStorage.setItem('userId', '1');

    authService.logout();

    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('role')).toBeNull();
    expect(localStorage.getItem('name')).toBeNull();
    expect(localStorage.getItem('userId')).toBeNull();
});

// =============================================
// TEST 8 — getToken returns correct token
// =============================================
test('getToken returns the saved token', () => {
    localStorage.setItem('token', 'my-jwt-token');
    expect(authService.getToken()).toBe('my-jwt-token');
});

// =============================================
// TEST 9 — isLoggedIn returns false after logout
// =============================================
test('isLoggedIn returns false after logout', () => {
    localStorage.setItem('token', 'fake-token');
    expect(authService.isLoggedIn()).toBe(true);

    authService.logout();
    expect(authService.isLoggedIn()).toBe(false);
});

// =============================================
// TEST 10 — saveUser works correctly for Student
// =============================================
test('saveUser works correctly for Student role', () => {
    const fakeStudent = {
        token: 'student-token-456',
        role: 'Student',
        name: 'Jane Student',
        userId: 2
    };

    authService.saveUser(fakeStudent);

    expect(authService.getRole()).toBe('Student');
    expect(authService.getName()).toBe('Jane Student');
    expect(authService.isLoggedIn()).toBe(true);
});