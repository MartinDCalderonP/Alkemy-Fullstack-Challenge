import React from 'react';
import styles from '../styles/Navbar.module.scss';
import { NavLink } from 'react-router-dom';
import SignButtons from './SignButtons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
	return (
		<nav className={styles.navbar}>
			<NavLink
				to="/"
				className={({ isActive }) =>
					!isActive
						? styles.navLink
						: styles.navLink + ' ' + styles.navLinkActive
				}
			>
				<FontAwesomeIcon className={styles.homeIcon} icon={faHome} />
				Home
			</NavLink>

			<p>Alkemy Fullstack Challenge</p>

			<SignButtons />
		</nav>
	);
}
