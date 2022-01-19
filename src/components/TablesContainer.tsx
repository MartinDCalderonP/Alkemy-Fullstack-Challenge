import React, { useState, useEffect } from 'react';
import styles from '../styles/TablesContainer.module.scss';
import { useContextState } from '../context/Context';
import { getMovesFetchUrl } from '../common/Helpers';
import { ITablesContainerProps, IMove } from '../common/Interfaces';
import Table from './Table';
import Toast from './Toast';

export default function TablesContainer({
	getMoveById,
	refreshMoves,
}: ITablesContainerProps) {
	const { user } = useContextState();

	const fetchUrl = getMovesFetchUrl(user.user_id);

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
	}, [refreshMoves]);

	const incomes = moves.filter((move: IMove) => move.move_type === 'income');
	const outcomes = moves.filter((move: IMove) => move.move_type === 'outcome');

	const handleTableMessage = (message: string) => {
		setMessage(message);
	};

	const handleRefreshMoves = () => {
		getMoves();
	};

	return (
		<>
			<div className={styles.tablesContainer}>
				<div>
					<h2>Incomes</h2>
					<Table
						moves={incomes}
						getMoveById={getMoveById}
						message={handleTableMessage}
						refreshMoves={handleRefreshMoves}
					/>
				</div>

				<div className={styles.divider} />

				<div>
					<h2>Outcomes</h2>
					<Table
						moves={outcomes}
						getMoveById={getMoveById}
						message={handleTableMessage}
						refreshMoves={handleRefreshMoves}
					/>
				</div>
			</div>

			{message && <Toast message={message} closeToast={handleCloseToast} />}
		</>
	);
}
