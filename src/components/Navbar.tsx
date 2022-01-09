import React from 'react';
import styles from '../styles/Navbar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
		<nav className={styles.navbar}>
			<a href="#" className={styles.homeAnchor}>
				<FontAwesomeIcon className={styles.homeIcon} icon={faHome} />
				Home
			</a>
}
