import React, { useState } from 'react';
import styles from '../styles/Navbar.module.scss';
import { NavLink } from 'react-router-dom';
import { useContextState } from '../context/Context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faHome,
	faSignInAlt,
	faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
import Modal from './Modal';
import Dropdown from './Dropdown';

export default function Navbar() {
	const { user } = useContextState();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const handleToggleModal = () => {
		setIsModalOpen(!isModalOpen);
	};

	const handleToggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	return (
		<>
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

				{user?.user_id === 0 && (
					<button className={styles.signInButton} onClick={handleToggleModal}>
						Sign In
						<FontAwesomeIcon className={styles.buttonIcon} icon={faSignInAlt} />
					</button>
				)}

				{user?.user_id > 0 && (
					<button className={styles.userButton} onClick={handleToggleDropdown}>
						{user.user_name}
						<FontAwesomeIcon
							className={styles.buttonIcon}
							icon={faUserCircle}
						/>
					</button>
				)}
			</nav>

			{isModalOpen && <Modal toggleModal={handleToggleModal} />}

			{isDropdownOpen && <Dropdown toggleDropdown={handleToggleDropdown} />}
		</>
	);
}
