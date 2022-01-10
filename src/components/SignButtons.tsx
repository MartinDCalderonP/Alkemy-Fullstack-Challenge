import React, { useState } from 'react';
import styles from '../styles/SignButtons.module.scss';
import { useContextState } from '../context/Context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Modal from './Modal';

export default function SignButtons() {
	const { state, dispatch } = useContextState();
	const [isModalOpen, setIsModalOpen] = useState(false);

	console.log(state, dispatch);

	const handleOpenModal = () => {
		setIsModalOpen(true);
	};

	const handleSignOut = () => {
		console.log('Sign out');
	};

	return (
		<>
			{state?.user?.user_id === 0 && (
				<button className={styles.signButton} onClick={handleOpenModal}>
					Sign In
					<FontAwesomeIcon className={styles.anchorIcon} icon={faSignInAlt} />
				</button>
			)}

			{state?.user?.user_id > 0 && (
				<button className={styles.signButton} onClick={handleSignOut}>
					<FontAwesomeIcon className={styles.anchorIcon} icon={faSignOutAlt} />
				</button>
			)}

			{isModalOpen && <Modal closeModal={() => setIsModalOpen(false)} />}
		</>
	);
}
