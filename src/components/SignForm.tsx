import React, { useState, useEffect, ChangeEvent, MouseEvent } from 'react';
import styles from '../styles/SignForm.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { API, Paths } from '../common/Enums';
import { ISignFormProps } from '../common/Interfaces';
import { useContextState } from '../context/Context';
import Input from './Input';
import MyButton from './MyButton';
import Swal from 'sweetalert2';

export default function SignForm({ toggleModal, type }: ISignFormProps) {
	const { user, dispatch } = useContextState();

	useEffect(() => {
		if (toggleModal && user.user_id) {
			toggleModal(true);
		}
	}, [user]);

	const [userToSign, setUserToSign] = useState({
		email: '',
		password: '',
	});

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setUserToSign({
			...userToSign,
			[name]: value,
		});
	};

	const [message, setMessage] = useState('');

	const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		if (userToSign.email === '' || userToSign.password === '') {
			setMessage('Please fill in all fields.');
			return;
		}

		if (!userToSign.email.match(/\S+@\S+\.\S+/)) {
			setMessage('Please enter a valid email.');
			return;
		}

		if (userToSign.password.length < 8) {
			setMessage('Password must be at least 8 characters.');
			return;
		}

		const fetchUrl =
			type === 'signIn'
				? `${API.base}${API.auth}${API.users}`
				: `${API.base}${API.signUp}${API.users}`;

		fetch(fetchUrl, {
			method: 'POST',
			credentials: 'include',
			body: JSON.stringify(userToSign),
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

	const { pathname } = useLocation();

	const handleToggleModal = () => {
		toggleModal(true);
	};

	return (
		<form className={styles.signForm}>
			<h2>Sign {type === 'signIn' ? 'In' : 'Up'}</h2>

			<Input
				className={styles.input}
				label="User Email"
				name="email"
				value={userToSign.email}
				onChange={handleChange}
			/>

			<Input
				className={styles.input}
				label="User Password"
				name="password"
				value={userToSign.password}
				onChange={handleChange}
				type="password"
			/>

			<div className={styles.message}>{message}</div>

			<MyButton
				className={styles.signButton}
				variant="contained"
				type="submit"
				onClick={handleSubmit}
			>
				Sign {type === 'signIn' ? 'In' : 'Up'}
			</MyButton>

			{type === 'signIn' && pathname !== '/sign-up' && (
				<Link className={styles.signLink} to={Paths.signUp}>
					{"Don't have an account? Sign Up"}
				</Link>
			)}

			{type === 'signIn' && pathname === '/sign-up' && (
				<a className={styles.signLink} href="#" onClick={handleToggleModal}>
					{"Don't have an account? Sign Up"}
				</a>
			)}

			{type === 'signUp' && (
				<a className={styles.signLink} href="#" onClick={handleToggleModal}>
					Already have an account? Sign In
				</a>
			)}
		</form>
	);
}
