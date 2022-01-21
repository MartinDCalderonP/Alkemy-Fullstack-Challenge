import React, { useState, useEffect, ChangeEvent, MouseEvent } from 'react';
import styles from '../styles/SignForm.module.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContextState } from '../context/Context';
import useFetch from '../hooks/useFetch';
import { Paths } from '../common/Enums';
import { signInOrUpFetchUrl } from '../common/Helpers';
import { IStatusResponse } from '../common/Interfaces';
import Input from './Input';
import MyButton from './MyButton';
import Swal from 'sweetalert2';

interface ISignFormProps {
	toggleModal: () => void;
	type: string;
}

export default function SignForm({ toggleModal, type }: ISignFormProps) {
	const { user, dispatch } = useContextState();

	useEffect(() => {
		if (toggleModal && user.user_id) {
			toggleModal();
		}
	}, [user]);

	const [userToSign, setUserToSign] = useState({
		name: '',
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
	const [fetchUrl, setFetchUrl] = useState('');
	const [fetchOptions, setFetchOptions] = useState({});
	const { data, error } = useFetch<IStatusResponse>(fetchUrl, fetchOptions);
	const navigate = useNavigate();

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

		setFetchOptions({
			method: 'POST',
			credentials: 'include',
			body: JSON.stringify(userToSign),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		setFetchUrl(signInOrUpFetchUrl(type));
	};

	useEffect(() => {
		if (data && data.user) {
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
		}

		if (data && data.status === 'Error') {
			setMessage(data.message);
		}

		if (error) {
			setMessage(error.message);
		}
	}, [data, error]);

	const { pathname } = useLocation();

	const handleToggleModal = () => {
		toggleModal();
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
