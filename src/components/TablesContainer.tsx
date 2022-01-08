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

	const incomes = moves.filter((move: IMove) => move.move_type === 'income');
	const outcomes = moves.filter((move: IMove) => move.move_type === 'outcome');

	return (
		<>
			<div className={styles.tablesContainer}>
				<div>
					<h2>Incomes</h2>
					<Table moves={incomes} />
				</div>

				<div>
					<h2>Outcomes</h2>
					<Table moves={outcomes} />
				</div>
			</div>

			{message && <Toast message={message} closeToast={handleCloseToast} />}
		</>
	);
}
