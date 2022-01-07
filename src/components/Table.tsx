import React, { useState, useEffect } from 'react';
import styles from '../styles/Table.module.scss';
import { API } from '../common/Enums';
import { IMove } from '../common/Interfaces';
import { capitalizeWord, format } from '../common/Helpers';
import Toast from './Toast';
import { Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

export default function Table() {
	const fetchUrl = `${API.base}${API.moves}`;
	const [moves, setMoves] = useState([]);
	const [message, setMessage] = useState('');

	const getMoves = () => {
		fetch(fetchUrl)
			.then((res) => res.json())
			.then((data) => setMoves(data))
			.catch((err) => setMessage(err));
	};

	useEffect(() => {
		getMoves();
	}, []);

	const handleCloseToast = () => {
		setMessage('');
	};

	return (
		<>
			<div className={styles.container}>
				<table>
					<thead>
						<tr>
							<th>Description</th>
							<th>Amount</th>
							<th>Type</th>
							<th>Date</th>
							<th>Edit</th>
							<th>Delete</th>
						</tr>
					</thead>
					<tbody>
						{moves.map((move: IMove) => (
							<tr key={move.move_id}>
								<td>{move.move_description}</td>
								<td>{'$ ' + move.move_amount}</td>
								<td>{capitalizeWord(move.move_type)}</td>
								<td>{format(move.move_date, 'es')}</td>
								<td>
									<Button
										className={styles.actionButton}
										variant="contained"
										type="submit"
									>
										<FontAwesomeIcon icon={faEdit} />
									</Button>
								</td>
								<td>
									<Button
										className={styles.actionButton}
										variant="contained"
										type="submit"
									>
										<FontAwesomeIcon icon={faTrashAlt} />
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{message && <Toast message={message} closeToast={handleCloseToast} />}
		</>
	);
}
