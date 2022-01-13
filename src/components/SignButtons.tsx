import React, { useState } from 'react';
import styles from '../styles/SignButtons.module.scss';
import { useContextState } from '../context/Context';
import { initialState } from '../context/Reducer';
import useLocalStorage from '../hooks/useLocalStorage';
import { API } from '../common/Enums';
import { IUserData } from '../common/Interfaces';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Modal from './Modal';
import Swal from 'sweetalert2';

export default function SignButtons() {
	const { state, dispatch } = useContextState();
	const [, setUserInStorage] = useLocalStorage<IUserData>(
		'user',
		initialState.user
	);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleOpenModal = () => {
		setIsModalOpen(true);
	};

	const handleSignOut = () => {
		const fetchUrl = `${API.base}${API.auth}`;

		fetch(fetchUrl, {
			method: 'DELETE',
			credentials: 'include',
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.status === 'Success') {
					setUserInStorage(initialState.user);
					dispatch({
						type: 'SET_USER',
						payload: {
							user: initialState.user,
						},
					});
					Swal.fire({
						text: data.message,
						icon: 'success',
						confirmButtonColor: 'darkblue',
					});
				} else {
					Swal.fire({
						text: data.message,
						icon: 'error',
						confirmButtonColor: 'darkblue',
					});
				}
			});
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
					Sign Out
					<FontAwesomeIcon className={styles.anchorIcon} icon={faSignOutAlt} />
				</button>
			)}

			{isModalOpen && <Modal closeModal={() => setIsModalOpen(false)} />}
		</>
	);
}
