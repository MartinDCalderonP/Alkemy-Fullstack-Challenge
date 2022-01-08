import React, { useState, useEffect } from 'react';
import styles from '../styles/TablesContainer.module.scss';
import { API } from '../common/Enums';
import Table from './Table';
import Toast from './Toast';
import { IMove } from '../common/Interfaces';

export default function TablesContainer() {
	const fetchUrl = `${API.base}${API.moves}`;
	const [moves, setMoves] = useState([]);
	const [message, setMessage] = useState('');

	const handleCloseToast = () => {
		setMessage('');
	};

	const getMoves = () => {
		fetch(fetchUrl)
			.then((res) => res.json())
			.then((data) => setMoves(data))
			.catch((err) => setMessage(err));
	};

	useEffect(() => {
		getMoves();
	}, []);

	const incomes = moves.filter((move: IMove) => move.move_type === 'income');
	const outcomes = moves.filter((move: IMove) => move.move_type === 'outcome');

	const handleTableMessage = (message: string) => {
		setMessage(message);
	};

	const handleUpdateMoves = () => {
		getMoves();
	};

	return (
		<>
			<div className={styles.tablesContainer}>
				<div>
					<h2>Incomes</h2>
					<Table
						moves={incomes}
						message={handleTableMessage}
						updateMoves={handleUpdateMoves}
					/>
				</div>

				<div>
					<h2>Outcomes</h2>
					<Table
						moves={outcomes}
						message={handleTableMessage}
						updateMoves={handleUpdateMoves}
					/>
				</div>
			</div>

			{message && <Toast message={message} closeToast={handleCloseToast} />}
		</>
	);
}
