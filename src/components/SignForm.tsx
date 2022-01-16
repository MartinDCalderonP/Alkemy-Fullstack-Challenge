import React, { useState, useEffect, ChangeEvent, MouseEvent } from 'react';
import styles from '../styles/SignForm.module.scss';
import { Link } from 'react-router-dom';
import { API, Paths } from '../common/Enums';
import { ISignFormProps } from '../common/Interfaces';
import { useContextState } from '../context/Context';
import Input from './Input';
import MyButton from './MyButton';
import Swal from 'sweetalert2';

export default function SignForm({ closeModal }: ISignFormProps) {
	const { user, dispatch } = useContextState();

	useEffect(() => {
		if (closeModal && user.user_id) {
			closeModal(true);
		}
	}, [user]);

	const [userToSignIn, setUserToSignIn] = useState({
		email: '',
		password: '',
	});

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

	const [message, setMessage] = useState('');

	return (
		<form className={styles.signForm}>
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
	);
}
