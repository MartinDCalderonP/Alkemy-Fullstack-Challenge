import React, { useState } from 'react';
import styles from '../styles/SignButtons.module.scss';
import { useContextState } from '../context/Context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import Modal from './Modal';
import Dropdown from './Dropdown';

export default function SignButtons() {
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
			<div className={styles.container}>
				{user?.user_id === 0 && (
					<button className={styles.signButton} onClick={handleToggleModal}>
						Sign In
						<FontAwesomeIcon className={styles.buttonIcon} icon={faSignInAlt} />
					</button>
				)}

				{user?.user_id > 0 && (
					<button className={styles.signButton} onClick={handleToggleDropdown}>
						{user.user_name}

						<FontAwesomeIcon
							className={styles.buttonIcon}
							icon={faUserCircle}
						/>
					</button>
				)}
			</div>

			{isModalOpen && <Modal toggleModal={handleToggleModal} />}

			{isDropdownOpen && <Dropdown toggleDropdown={handleToggleDropdown} />}
		</>
	);
}
