import React, { useState, useEffect } from 'react';
import styles from '../styles/Table.module.scss';
import { useContextState } from '../context/Context';
import useFetch from '../hooks/useFetch';
import { IMove, IStatusResponse } from '../common/Interfaces';
import { deleteMoveFetchUrl, format } from '../common/Helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import MyButton from './MyButton';
import Swal from 'sweetalert2';

interface ITableProps {
	moves: IMove[];
	getMoveById: (moveId: number) => void;
	message: (message: string) => void;
	refreshMoves: () => void;
}

export default function Table({
	moves,
	getMoveById,
	message,
	refreshMoves,
}: ITableProps) {
	const { user } = useContextState();
	const [fetchValues, setFetchValues] = useState({
		url: '',
		options: {},
	});
	const { data, error } = useFetch<IStatusResponse>(
		fetchValues.url,
		fetchValues.options
	);

	const handleEditMove = (moveId: number) => {
		getMoveById(moveId);
	};

	const handleDeleteMove = (moveId: number) => {
		Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: 'darkblue',
			cancelButtonColor: 'darkred',
			confirmButtonText: 'Yes, delete it!',
			reverseButtons: true,
		}).then((result) => {
			if (result.isConfirmed) {
				const body = {
					userId: user.user_id,
				};

				setFetchValues({
					url: deleteMoveFetchUrl(moveId),
					options: {
						method: 'DELETE',
						body: JSON.stringify(body),
						headers: {
							Accept: 'application/json',
							'Content-Type': 'application/json',
						},
					},
				});
			}
		});
	};

	useEffect(() => {
		if (data) {
			message(data.message);
			refreshMoves();
		}

		if (error) {
			message(error.message);
		}
	}, [data]);

	return (
		<div className={styles.tableContainer}>
			<table>
				<thead>
					<tr>
						<th>Description</th>
						<th>Amount</th>
						<th>Date</th>
						<th>Edit</th>
						<th>Delete</th>
					</tr>
				</thead>
				<tbody>
					{moves.map((move: IMove) => (
						<tr key={move.move_id}>
							<td>{move.move_description}</td>
							<td>{'$' + move.move_amount}</td>
							<td>{format(move.move_date, 'es')}</td>
							<td>
								<MyButton
									className={styles.actionButton}
									variant="contained"
									type="submit"
									onClick={() => handleEditMove(move.move_id)}
								>
									<FontAwesomeIcon icon={faEdit} />
								</MyButton>
							</td>
							<td>
								<MyButton
									className={styles.actionButton}
									variant="contained"
									type="submit"
									onClick={() => handleDeleteMove(move.move_id)}
								>
									<FontAwesomeIcon icon={faTrashAlt} />
								</MyButton>
							</td>
						</tr>
					))}

					{moves.length === 0 && (
						<tr>
							<td colSpan={5}>No moves found</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
}
