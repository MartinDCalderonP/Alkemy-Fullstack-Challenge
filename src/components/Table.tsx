import React from 'react';
import styles from '../styles/Table.module.scss';
import { ITableProps, IMove } from '../common/Interfaces';
import { format } from '../common/Helpers';
import { Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

export default function Table({ moves }: ITableProps) {
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
