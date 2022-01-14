import React, { useState, useEffect, ChangeEvent, MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import styles from '../styles/Modal.module.scss';
import { Link } from 'react-router-dom';
import { useContextState } from '../context/Context';
import { API, Paths } from '../common/Enums';
import { IModalProps } from '../common/Interfaces';
import Input from './Input';
import MyButton from './MyButton';
import CloseIcon from './CloseIcon';
import Swal from 'sweetalert2';

export default function Modal({ closeModal }: IModalProps) {
	const { user, dispatch } = useContextState();

	useEffect(() => {
		if (user.user_id > 0) {
			closeModal(true);
		}
	}, [user.user_id]);

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

		if (userToSignIn.email === '' || userToSignIn.password === '') {
			setMessage('Please fill in all fields.');
			return;
		}

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
				if (data.status === 'Success') {
					dispatch({
						type: 'SET_USER',
						payload: {
							...data.user,
						},
					});
					Swal.fire({
						text: data.message,
						icon: 'success',
						confirmButtonColor: 'darkblue',
					});
				} else {
					setMessage(data.message);
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

					<Input
						className={styles.input}
						label="User Email"
						name="email"
						value={userToSignIn.email}
						onChange={handleChange}
					/>

					<Input
						className={styles.input}
						label="User Password"
						name="password"
						value={userToSignIn.password}
						onChange={handleChange}
						type="password"
					/>

					<div className={styles.message}>{message}</div>

					<MyButton
						className={styles.signInButton}
						variant="contained"
						type="submit"
						onClick={handleSignIn}
					>
						Sign In
					</MyButton>

					<Link className={styles.signUpLink} to={Paths.signUp}>
						{"Don't have an account? Sign Up"}
					</Link>
				</form>
			</div>
		</div>,
		document.getElementById('portal') as Element
	);
}
