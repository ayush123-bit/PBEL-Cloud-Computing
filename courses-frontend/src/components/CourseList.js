import React, { useEffect, useState } from 'react';
import styles from './CourseList.module.css';
import { fetchCourses as fetchCoursesAPI, deleteCourse } from '../api/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [usedAsPrerequisite, setUsedAsPrerequisite] = useState(new Set());

  const loadCourses = async () => {
    try {
      const data = await fetchCoursesAPI();
      setCourses(data);

      const used = new Set();
      data.forEach(course => {
        course.prerequisites?.forEach(pr => used.add(pr));
      });
      setUsedAsPrerequisite(used);
    } catch (err) {
      toast.error('Failed to fetch courses.');
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteCourse(id);
      toast.success('Course deleted successfully!');
      loadCourses();
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        'Failed to delete course.';
      toast.error(msg);
    }
  };

  return (
    <div className={styles.container}>
      <ToastContainer position="top-right" autoClose={3000} />
      <h2>All Courses</h2>

      <ul className={styles.courseList}>
        {courses.map((course) => {
          const isLocked = usedAsPrerequisite.has(course.courseId);
          return (
            <li key={course.courseId} className={styles.card}>
              <h3>{course.title} ({course.courseId})</h3>
              <p>{course.description}</p>
              <p>
                <strong>Prerequisites:</strong>{' '}
                {course.prerequisites?.join(', ') || 'None'}
              </p>

              <button
                onClick={() => handleDelete(course.courseId)}
                disabled={isLocked}
                title={
                  isLocked
                    ? 'Cannot delete. This course is a prerequisite for others.'
                    : 'Delete this course'
                }
              >
                {isLocked ? 'Locked' : 'Delete'}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CourseList;
