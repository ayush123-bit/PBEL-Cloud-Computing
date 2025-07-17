import React, { useState } from 'react';
import styles from './InstanceDetailViewer.module.css';
import { getInstanceDetail, deleteInstance } from '../api/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const InstanceDetailViewer = () => {
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');
  const [courseId, setCourseId] = useState('');
  const [instance, setInstance] = useState(null);

  const handleFetch = async () => {
    if (!year || !semester || !courseId) {
      toast.warn('All fields are required.');
      return;
    }

    try {
      const data = await getInstanceDetail(year, semester, courseId);
      setInstance(data);
      toast.success('Instance loaded successfully!');
    } catch (err) {
      toast.error(err.message || 'Failed to fetch instance.');
      setInstance(null);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteInstance(year, semester, courseId);
      setInstance(null);
      toast.success('Instance deleted successfully.');
    } catch (err) {
      toast.error(err.message || 'Failed to delete instance.');
    }
  };

  return (
    <div className={styles.container}>
      <ToastContainer position="top-right" autoClose={3000} />
      <h2>View Course Instance Details</h2>

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
        <input
          type="text"
          placeholder="Course ID (e.g., CS101)"
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
        />
        <button onClick={handleFetch}>Get Instance</button>
      </div>

      {instance && (
        <div className={styles.detailsCard}>
          <h3>Instance Details</h3>
          <p><strong>Course ID:</strong> {instance.courseId}</p>
          <p><strong>Year:</strong> {instance.year}</p>
          <p><strong>Semester:</strong> {instance.semester}</p>
          <button className={styles.deleteButton} onClick={handleDelete}>
            Delete Instance
          </button>
        </div>
      )}
    </div>
  );
};

export default InstanceDetailViewer;
