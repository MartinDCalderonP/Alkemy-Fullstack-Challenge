import React from 'react';
import styles from '../styles/Table.module.scss';
import { API } from '../common/Enums';
import { ITableProps, IMove } from '../common/Interfaces';
import { format } from '../common/Helpers';
import { Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

export default function Table({ moves, message, updateMoves }: ITableProps) {
	const handleDeleteButton = (moveId: number) => {
		Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!',
			reverseButtons: true,
		}).then((result) => {
			if (result.isConfirmed) {
				fetch(`${API.base}${API.moves}/${moveId}`, {
					method: 'DELETE',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
				})
					.then((res) => res.json())
					.then((data) => {
						message(data.message);
						updateMoves();
					})
					.catch((err) => message(err));
			}
		});
	};

	return (
		<div className={styles.table}>
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
							<td>{'$ ' + move.move_amount}</td>
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
									onClick={() => handleDeleteButton(move.move_id)}
								>
									<FontAwesomeIcon icon={faTrashAlt} />
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
