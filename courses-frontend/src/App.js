import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ViewCourses from './pages/ViewCourses';
import CreateCourse from './pages/CreateCourse';
import CreateInstance from './pages/CreateInstance';
import ViewInstances from './pages/ViewInstances';
import Navbar from './components/Navbar';
import styles from './App.module.css';
import InstanceDetailViewer from './components/InstanceDetailViewer';


function App() {
  return (
    <Router>
      <div className={styles.app}>
        <Navbar />

        <div className={styles.content}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/view-courses" element={<ViewCourses />} />
            <Route path="/create-course" element={<CreateCourse />} />
            <Route path="/create-instance" element={<CreateInstance />} />
            <Route path="/view-instances" element={<ViewInstances />} />
            <Route path="/instances/:year/:semester/:courseId" element={<ViewInstances />} />
            <Route path="/view-instance" element={<InstanceDetailViewer />} />

          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
