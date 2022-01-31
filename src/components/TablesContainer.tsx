import React, { useState, useEffect, useMemo } from 'react';
import styles from '../styles/TablesContainer.module.scss';
import { useContextState } from '../context/Context';
import useFetch from '../hooks/useFetch';
import { getMovesFetchUrl } from '../common/Helpers';
import { IMove } from '../common/Interfaces';
import Table from './Table';
import Toast from './Toast';
import Spinner from './Spinner';

interface ITablesContainerProps {
	getMoveById: (moveId: number) => void;
	refreshMoves: number;
}

export default function TablesContainer({
	getMoveById,
	refreshMoves,
}: ITablesContainerProps) {
	const { user } = useContextState();
	const fetchValues = useMemo(() => {
		return {
			url: getMovesFetchUrl(),
			options: {
				headers: {
					Authorization: `Bearer ${user.user_token}`,
				},
			},
		};
	}, [user.user_token]);
	const { data, loading, error, fetchData } = useFetch<IMove[]>(
		fetchValues.url,
		fetchValues.options
	);
	const [message, setMessage] = useState('');

	const handleCloseToast = () => {
		setMessage('');
	};

	const getMoves = () => {
		fetchData(fetchValues.url, fetchValues.options);
	};

	useEffect(() => {
		getMoves();
	}, [refreshMoves]);

	const incomes = data?.filter((move: IMove) => move.move_type === 'income');
	const outcomes = data?.filter((move: IMove) => move.move_type === 'outcome');

	const handleTableMessage = (message: string) => {
		setMessage(message);
	};

	const handleRefreshMoves = () => {
		getMoves();
	};

	return (
		<>
			{incomes && outcomes && (
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
			)}

			{loading && <Spinner />}

			{error && <Toast message={error.message} closeToast={handleCloseToast} />}
		</>
	);
}
