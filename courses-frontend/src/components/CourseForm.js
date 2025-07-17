import React, { useEffect, useState } from 'react';
import styles from './CourseForm.module.css';
import { fetchCourses, createCourse } from '../api/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CourseForm = () => {
  const [title, setTitle] = useState('');
  const [courseId, setCourseId] = useState('');
  const [description, setDescription] = useState('');
  const [prerequisites, setPrerequisites] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([]);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const courses = await fetchCourses();
        setAvailableCourses(courses);
      } catch (err) {
        toast.error('Failed to fetch available courses.');
      }
    };
    loadCourses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !courseId || !description) {
      toast.warn('All fields are required.');
      return;
    }

    try {
      await createCourse({ title, courseId, description, prerequisites });

      setTitle('');
      setCourseId('');
      setDescription('');
      setPrerequisites([]);

      toast.success('Course created successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create course.');
    }
  };

  const togglePrerequisite = (id) => {
    setPrerequisites((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  return (
    <div className={styles.formContainer}>
      <ToastContainer position="top-right" autoClose={3000} />

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Course Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Course ID (e.g., CS101)"
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
        />
        <textarea
          placeholder="Course Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className={styles.prerequisites}>
          <label>Prerequisites:</label>
          <div className={styles.prereqList}>
            {availableCourses.map((course) => (
              <label key={course.courseId}>
                <input
                  type="checkbox"
                  value={course.courseId}
                  checked={prerequisites.includes(course.courseId)}
                  onChange={() => togglePrerequisite(course.courseId)}
                />
                {course.title} ({course.courseId})
              </label>
            ))}
          </div>
        </div>

        <button type="submit">Create Course</button>
      </form>
    </div>
  );
};

export default CourseForm;
