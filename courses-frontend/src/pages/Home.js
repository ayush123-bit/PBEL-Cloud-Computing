import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.home}>
      <div className={styles.container}>
        <h1 className={styles.title}>PBEL Cloud Computing</h1>
        <p className={styles.subtitle}>
          Seamlessly manage and explore all courses and their instances.
        </p>
        <nav className={styles.links}>
          <Link to="/create-course">Create Course</Link>
          <Link to="/view-courses">View Courses</Link>
          <Link to="/create-instance">Create Instance</Link>
          <Link to="/view-instances">View Instances</Link>
          <Link to="/view-instance">Instance Details</Link>
        </nav>
      </div>
    </div>
  );
};

export default Home;
