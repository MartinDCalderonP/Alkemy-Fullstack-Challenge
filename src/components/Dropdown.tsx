import React, { useRef } from 'react';
import styles from '../styles/Dropdown.module.scss';
import { Link } from 'react-router-dom';
import { useContextState } from '../context/Context';
import { initialUser } from '../context/Reducer';
import useOnClickOutside from '../hooks/useOnClickOutside';
import { Paths } from '../common/Enums';
import { signOutFetchUrl } from '../common/Helpers';
import { IDropdownProps } from '../common/Interfaces';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExchangeAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

export default function Dropdown({ toggleDropdown }: IDropdownProps) {
	const ref = useRef(null);
	
	const { dispatch } = useContextState();

	const handleToggleDropdown = () => {
		toggleDropdown();
	};

	useOnClickOutside(ref, handleToggleDropdown);

	const handleSignOut = () => {
		const fetchUrl = signOutFetchUrl();

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
