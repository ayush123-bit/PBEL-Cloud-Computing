import React, { useEffect, useState } from 'react';
import styles from './CourseInstanceForm.module.css';
import { fetchCourses as getCourses, createInstance } from '../api/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CourseInstanceForm = ({ onInstanceCreated }) => {
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');
  const [courseId, setCourseId] = useState('');
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await getCourses();
        setCourses(data);
      } catch (err) {
        toast.error('Failed to fetch courses.');
      }
    };
    loadCourses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!year || !semester || !courseId) {
      toast.warn('All fields are required.');
      return;
    }

    const instance = {
      year: parseInt(year),
      semester: parseInt(semester),
      courseId
    };

    try {
      await createInstance(instance);
      setYear('');
      setSemester('');
      setCourseId('');
      toast.success('Course instance created successfully!');
      if (onInstanceCreated) onInstanceCreated();
    } catch (err) {
      toast.error(err.message || 'Failed to create instance.');
    }
  };

  return (
    <div className={styles.formContainer}>
      <ToastContainer position="top-right" autoClose={3000} />
      
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Year (e.g., 2025)"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          min="2000"
          max="2100"
        />
        <input
          type="number"
          placeholder="Semester (1 or 2)"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          min="1"
          max="8"
        />
        <select value={courseId} onChange={(e) => setCourseId(e.target.value)}>
          <option value="">Select Course</option>
          {courses.map((course) => (
            <option key={course.id} value={course.courseId}>
              {course.title} ({course.courseId})
            </option>
          ))}
        </select>
        <button type="submit">Create Instance</button>
      </form>
    </div>
  );
};

export default CourseInstanceForm;
