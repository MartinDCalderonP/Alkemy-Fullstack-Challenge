import React, { useState, useEffect, ChangeEvent, MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import styles from '../styles/Modal.module.scss';
import { API } from '../common/Enums';
import { IModalProps, IUserData } from '../common/Interfaces';
import { useContextState } from '../context/Context';
import { actionTypes, initialState } from '../context/Reducer';
import useLocalStorage from '../hooks/useLocalStorage';
import CloseIcon from './CloseIcon';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function Modal({ closeModal }: IModalProps) {
	const { state, dispatch } = useContextState();

	const [userInStorage, setUserInStorage] = useLocalStorage<IUserData>(
		'user',
		initialState.user
	);

	useEffect(() => {
		if (userInStorage.user_id) {
			dispatch({
				type: actionTypes.SET_USER,
				payload: { user: userInStorage },
			});
		}

		if (state.user.user_id) {
			closeModal();
		}
	}, [userInStorage.user_id]);

	const [userToSignIn, setUserToSignIn] = useState({
		email: '',
		password: '',
	});

	const [message, setMessage] = useState('');

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setUserToSignIn({
			...userToSignIn,
			[name]: value,
		});
	};

	const handleSignIn = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		const fetchUrl = `${API.base}${API.auth}${API.users}`;

		const body = {
			email: userToSignIn.email,
			password: userToSignIn.password,
		};

		fetch(fetchUrl, {
			method: 'POST',
			credentials: 'include',
			body: JSON.stringify(body),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.message) {
					setMessage(data.message);
				} else {
					setUserInStorage(data.user);
					dispatch({
						type: actionTypes.SET_USER,
						payload: { user: userInStorage },
					});
					closeModal();
				}
			});
	};

	const handleCloseIconClick = () => {
		closeModal(true);
	};

	return createPortal(
		<div className={styles.overlay}>
			<div className={`${styles.modal} ${styles.appearModal}`}>
				<CloseIcon
					className={styles.closeIcon}
					onClick={handleCloseIconClick}
				/>

				<form className={styles.form}>
					<h2>Sign In</h2>

					<TextField
						className={styles.textField}
						label="User Email"
						name="email"
						value={userToSignIn.email}
						onChange={handleChange}
					/>

					<TextField
						className={styles.textField}
						label="User Password"
						name="password"
						value={userToSignIn.password}
						onChange={handleChange}
						type="password"
					/>

					<div className={styles.message}>{message}</div>

					<Button
						className={styles.signInButton}
						variant="contained"
						type="submit"
						onClick={handleSignIn}
					>
						Login
					</Button>
				</form>
			</div>
		</div>,
		document.getElementById('portal') as Element
	);
}
