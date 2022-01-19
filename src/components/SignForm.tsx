import React, { useState, useEffect, ChangeEvent, MouseEvent } from 'react';
import styles from '../styles/SignForm.module.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { API, Paths } from '../common/Enums';
import { ISignFormProps } from '../common/Interfaces';
import { useContextState } from '../context/Context';
import Input from './Input';
import MyButton from './MyButton';
import Swal from 'sweetalert2';

export default function SignForm({ toggleModal, type }: ISignFormProps) {
	const navigate = useNavigate();

	const { user, dispatch } = useContextState();

	const [userToSign, setUserToSign] = useState({
		name: '',
		email: '',
		password: '',
	});

	const [message, setMessage] = useState('');

	useEffect(() => {
		if (toggleModal && user.user_id) {
			toggleModal(true);
		}
	}, [user]);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setUserToSign({
			...userToSign,
			[name]: value,
		});
	};

	const validateFields = () => {
		const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/;
		const emailRegex = /\S+@\S+\.\S+/;

		if (type === 'signUp' && !userToSign.name.match(nameRegex)) {
			setMessage('Name must be only letters.');
			return;
		}

		if (type === 'signUp' && userToSign.name === '') {
			setMessage('Name is required.');
			return;
		}

		if (userToSign.email === '' || userToSign.password === '') {
			setMessage('Please fill in all fields.');
			return;
		}

		if (!userToSign.email.match(emailRegex)) {
			setMessage('Please enter a valid email.');
			return;
		}

		if (userToSign.password.length < 8) {
			setMessage('Password must be at least 8 characters.');
			return;
		}

		return true;
	};

	const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		if (!validateFields()) {
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

					navigate(Paths.moves);
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
			<h1 className={styles.title}>Sign {type === 'signIn' ? 'In' : 'Up'}</h1>

			{type === 'signUp' && (
				<Input
					className={styles.input}
					label="User Name"
					name="name"
					value={userToSign.name}
					onChange={handleChange}
				/>
			)}

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
