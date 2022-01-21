import React, { useState, useEffect, useRef } from 'react';
import styles from '../styles/Dropdown.module.scss';
import { Link } from 'react-router-dom';
import { useContextState } from '../context/Context';
import { initialUser } from '../context/Reducer';
import useFetch from '../hooks/useFetch';
import useOnClickOutside from '../hooks/useOnClickOutside';
import { Paths } from '../common/Enums';
import { signOutFetchUrl } from '../common/Helpers';
import { IStatusResponse } from '../common/Interfaces';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExchangeAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

interface IDropdownProps {
	toggleDropdown: () => void;
}

export default function Dropdown({ toggleDropdown }: IDropdownProps) {
	const ref = useRef(null);

	const handleToggleDropdown = () => {
		toggleDropdown();
	};

	useOnClickOutside(ref, handleToggleDropdown);

	const { dispatch } = useContextState();
	const [fetchUrl, setFetchUrl] = useState('');
	const [fetchOptions, setFetchOptions] = useState({});
	const { data, error } = useFetch<IStatusResponse>(fetchUrl, fetchOptions);

	const handleSignOut = () => {
		setFetchOptions({
			method: 'DELETE',
			crential: 'include',
		});
		setFetchUrl(signOutFetchUrl());
	};

	useEffect(() => {
		if (data) {
			dispatch({
				type: 'SET_USER',
				payload: initialUser,
			});
			Swal.fire({
				text: data.message,
				icon: 'success',
				confirmButtonColor: 'darkblue',
			});
		}

		if (error) {
			Swal.fire({
				text: error.message,
				icon: 'error',
				confirmButtonColor: 'darkblue',
			});
		}
	}, [data, error]);

	return (
		<div className={styles.dropdown} ref={ref}>
			<ul className={styles.list}>
				<li className={styles.listItem}>
					<Link to={Paths.moves} className={styles.movesAnchor}>
						<FontAwesomeIcon icon={faExchangeAlt} />
						Moves
					</Link>
				</li>

				<li className={styles.listItem}>
					<button className={styles.signOutButton} onClick={handleSignOut}>
						<FontAwesomeIcon icon={faSignOutAlt} />
						Sign Out
					</button>
				</li>
			</ul>
		</div>
	);
}
