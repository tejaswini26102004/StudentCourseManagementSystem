import React, { useState, useEffect } from 'react';
import { getRole } from '../services/authService';
import { getAllCourses, createCourse, updateCourse, deleteCourse } from '../services/courseService';

const styles = {
    container: { minHeight: '100vh', background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)', padding: '30px 20px' },
    card: { background: 'white', borderRadius: '16px', padding: '30px', maxWidth: '900px', margin: '0 auto', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' },
    title: { color: '#0f3460', marginBottom: '20px', fontSize: '24px' },
    courseCard: { background: '#f0f4ff', borderLeft: '5px solid #0f3460', borderRadius: '10px', padding: '20px', marginBottom: '15px' },
    courseTitle: { color: '#0f3460', marginBottom: '8px', fontSize: '18px' },
    courseDesc: { color: '#666', fontSize: '14px', marginBottom: '5px' },
    btnGroup: { display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '12px' },
    btn: { padding: '8px 16px', border: 'none', borderRadius: '20px', cursor: 'pointer', fontSize: '13px', fontWeight: '600' },
    btnGreen: { background: 'linear-gradient(135deg, #11998e, #38ef7d)', color: 'white' },
    btnBlue: { background: 'linear-gradient(135deg, #1a1a2e, #0f3460)', color: 'white' },
    btnRed: { background: 'linear-gradient(135deg, #ff416c, #ff4b2b)', color: 'white' },
    btnYellow: { background: 'linear-gradient(135deg, #f7971e, #ffd200)', color: 'white' },
    formGroup: { marginBottom: '15px' },
    label: { display: 'block', marginBottom: '5px', color: '#555', fontWeight: '600', fontSize: '14px' },
    input: { width: '100%', padding: '10px', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' },
    textarea: { width: '100%', padding: '10px', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box', height: '80px' },
    alert: { padding: '10px', borderRadius: '8px', marginBottom: '15px', fontSize: '14px' },
    alertSuccess: { background: '#d4edda', color: '#155724' },
    alertError: { background: '#f8d7da', color: '#721c24' },
    sectionCard: { background: '#f0f4ff', borderRadius: '10px', padding: '20px', marginTop: '15px' }
};

function Courses() {
    const role = getRole();
    const [courses, setCourses] = useState([]);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedCourseId, setSelectedCourseId] = useState(null);
    const [formData, setFormData] = useState({
        title: '', description: '', duration: '', instructor: ''
    });

    // Load courses on page load
    useEffect(() => {
        loadCourses();
    }, []);

    const loadCourses = async () => {
        try {
            const response = await getAllCourses();
            setCourses(response.data);
        } catch {
            setMessage('Failed to load courses.');
            setIsError(true);
        }
    };

    // Show create form
    const handleShowCreate = () => {
        setShowForm(true);
        setEditMode(false);
        setFormData({ title: '', description: '', duration: '', instructor: '' });
        setMessage('');
    };

    // Show edit form
    const handleShowEdit = (course) => {
        setShowForm(true);
        setEditMode(true);
        setSelectedCourseId(course.courseId);
        setFormData({
            title: course.title,
            description: course.description,
            duration: course.duration,
            instructor: course.instructor
        });
        setMessage('');
    };

    // Save course (create or update)
    const handleSave = async () => {
        try {
            if (editMode) {
                await updateCourse(selectedCourseId, formData);
                setMessage('Course updated successfully!');
            } else {
                await createCourse(formData);
                setMessage('Course created successfully!');
            }
            setIsError(false);
            setShowForm(false);
            loadCourses();
        } catch {
            setMessage('Failed to save course.');
            setIsError(true);
        }
    };

    // Delete course
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this course?')) {
            try {
                await deleteCourse(id);
                setMessage('Course deleted successfully!');
                setIsError(false);
                loadCourses();
            } catch {
                setMessage('Failed to delete course.');
                setIsError(true);
            }
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>🎓 Courses</h2>

                {message && (
                    <div style={{
                        ...styles.alert,
                        ...(isError ? styles.alertError : styles.alertSuccess)
                    }}>
                        {message}
                    </div>
                )}

                {/* Teacher — Add Course button */}
                {role === 'Teacher' && !showForm && (
                    <div style={{ marginBottom: '20px' }}>
                        <button style={{ ...styles.btn, ...styles.btnGreen }}
                            onClick={handleShowCreate}>
                            + Add Course
                        </button>
                    </div>
                )}

                {/* Add / Edit Course Form */}
                {showForm && (
                    <div style={styles.sectionCard}>
                        <h3 style={{ color: '#0f3460', marginBottom: '15px' }}>
                            {editMode ? 'Edit Course' : 'New Course'}
                        </h3>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Title</label>
                            <input style={styles.input}
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="Course title" />
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Description</label>
                            <textarea style={styles.textarea}
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Course description" />
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Duration</label>
                            <input style={styles.input}
                                value={formData.duration}
                                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                placeholder="e.g. 8 Weeks" />
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Instructor</label>
                            <input style={styles.input}
                                value={formData.instructor}
                                onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                                placeholder="Instructor name" />
                        </div>
                        <div style={styles.btnGroup}>
                            <button style={{ ...styles.btn, ...styles.btnGreen }}
                                onClick={handleSave}>
                                {editMode ? 'Update' : 'Create'}
                            </button>
                            <button style={{ ...styles.btn, ...styles.btnRed }}
                                onClick={() => setShowForm(false)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

                {/* Course List */}
                {courses.length === 0 && (
                    <p style={{ color: '#888', textAlign: 'center', padding: '20px' }}>
                        No courses found.
                    </p>
                )}

                {courses.map(course => (
                    <div style={styles.courseCard} key={course.courseId}>
                        <h3 style={styles.courseTitle}>{course.title}</h3>
                        <p style={styles.courseDesc}>{course.description}</p>
                        <p style={{ fontSize: '13px', color: '#888' }}>
                            ⏱ Duration: {course.duration}
                        </p>
                        <p style={{ fontSize: '13px', color: '#888' }}>
                            👨‍🏫 Instructor: {course.instructor}
                        </p>

                        {/* Teacher actions */}
                        {role === 'Teacher' && (
                            <div style={styles.btnGroup}>
                                <button style={{ ...styles.btn, ...styles.btnYellow }}
                                    onClick={() => handleShowEdit(course)}>
                                    ✏️ Edit
                                </button>
                                <button style={{ ...styles.btn, ...styles.btnRed }}
                                    onClick={() => handleDelete(course.courseId)}>
                                    🗑️ Delete
                                </button>
                            </div>
                        )}

                        {/* Student — read only message */}
                        {role === 'Student' && (
                            <p style={{ fontSize: '12px', color: '#aaa', marginTop: '10px' }}>
                                👁️ View only
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Courses;