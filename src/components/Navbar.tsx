import React from 'react';
import styles from '../styles/Navbar.module.scss';
import SignButtons from './SignButtons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
	return (
		<nav className={styles.navbar}>
			<a href="#" className={styles.homeAnchor}>
				<FontAwesomeIcon className={styles.homeIcon} icon={faHome} />
				Home
			</a>

			<p>Alkemy Fullstack Challenge</p>

			<SignButtons />
		</nav>
	);
}
