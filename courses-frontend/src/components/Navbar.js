import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={styles.navbar}>
      <div className={styles.logo}>PBEL Cloud Computing</div>
      <nav className={`${styles.navLinks} ${menuOpen ? styles.active : ''}`}>
        <Link to="/" onClick={closeMenu}>Home</Link>
        <Link to="/create-course" onClick={closeMenu}>Create Course</Link>
        <Link to="/view-courses" onClick={closeMenu}>View Courses</Link>
        <Link to="/create-instance" onClick={closeMenu}>Create Instance</Link>
        <Link to="/view-instances" onClick={closeMenu}>View Instances</Link>
        <Link to="/view-instance" onClick={closeMenu}>Instance Details</Link>
      </nav>
      <div className={styles.menuIcon} onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>
    </header>
  );
};

export default Navbar;
