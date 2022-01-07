import React from 'react';
import styles from '../styles/Table.module.scss';

export default function Table() {
	return (
		<table className={styles.table}>
			<thead>
				<tr>
					<th>Description</th>
					<th>Amount</th>
					<th>Type</th>
					<th>Date</th>
				</tr>
			</thead>
			<tbody />
		</table>
	);
}
