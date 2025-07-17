import React, { useState } from 'react';
import styles from './CourseInstanceList.module.css';
import { getInstancesByYearSemester, deleteInstance } from '../api/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CourseInstanceList = () => {
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');
  const [instances, setInstances] = useState([]);
  const [hasFetched, setHasFetched] = useState(false); // NEW
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchInstances = async () => {
    setError('');
    setSuccess('');
    setHasFetched(false); // reset fetch status before new fetch

    if (!year || !semester) {
      toast.warn('Please provide both year and semester.');
      return;
    }

    try {
      const data = await getInstancesByYearSemester(year, semester);
      setInstances(data);
      setHasFetched(true);
    } catch (err) {
      toast.error('Could not fetch instances. Check year/semester.');
      setInstances([]);
      setHasFetched(true);
    }
  };

  const handleDelete = async (courseId) => {
    try {
      await deleteInstance(year, semester, courseId);
      toast.success('Instance deleted successfully.');
      fetchInstances(); // Refresh list
    } catch (err) {
      try {
        const message = await err.text?.();
        const json = await err.json();
        toast.error(json.message || message || 'Failed to delete instance.');
      } catch {
        toast.error('Failed to delete instance. It may be a prerequisite for another course.');
      }
    }
  };

  return (
    <div className={styles.container}>
      <ToastContainer position="top-right" autoClose={3000} />

      <h2>Course Instances</h2>

      <div className={styles.form}>
        <input
          type="number"
          placeholder="Year (e.g., 2025)"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <input
          type="number"
          placeholder="Semester"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
        />
        <button onClick={fetchInstances}>Get Instances</button>
      </div>

      <ul className={styles.instanceList}>
        {hasFetched && instances.length === 0 && (
          <p>No instances found for the selected year and semester.</p>
        )}
        {instances.map((inst, index) => (
          <li
            key={`${inst.courseId}-${inst.year}-${inst.semester}-${index}`}
            className={styles.card}
          >
            <p>
              <strong>Course:</strong> {inst.courseId}
            </p>
            <p>
              <strong>Year:</strong> {inst.year}, <strong>Semester:</strong> {inst.semester}
            </p>
            <button onClick={() => handleDelete(inst.courseId)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseInstanceList;
