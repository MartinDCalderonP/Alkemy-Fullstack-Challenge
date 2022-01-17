import React, { useState } from 'react';
import styles from '../styles/SignButtons.module.scss';
import { useContextState } from '../context/Context';
import { initialUser } from '../context/Reducer';
import { API } from '../common/Enums';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faSignInAlt,
	faUserCircle,
	faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import Modal from './Modal';
import Swal from 'sweetalert2';

export default function SignButtons() {
	const { user, dispatch } = useContextState();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleToggleModal = () => {
		setIsModalOpen(!isModalOpen);
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
					dispatch({
						type: 'SET_USER',
						payload: {
							...initialUser,
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
			<div className={styles.container}>
				{user?.user_id === 0 && (
					<button className={styles.signButton} onClick={handleToggleModal}>
						Sign In
						<FontAwesomeIcon className={styles.anchorIcon} icon={faSignInAlt} />
					</button>
				)}

				{user?.user_id > 0 && (
					<>
						<button className={styles.signButton}>
							{user.user_name}
							<FontAwesomeIcon
								className={styles.anchorIcon}
								icon={faUserCircle}
							/>
						</button>

						<button className={styles.signButton} onClick={handleSignOut}>
							Sign Out
							<FontAwesomeIcon
								className={styles.anchorIcon}
								icon={faSignOutAlt}
							/>
						</button>
					</>
				)}
			</div>

			{isModalOpen && <Modal toggleModal={handleToggleModal} />}
		</>
	);
}
