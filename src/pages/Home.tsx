import React from 'react';
import styles from '../styles/Home.module.scss';
import { useContextState } from '../context/Context';
import Layout from '../components/Layout';

export default function Home() {
	const { user } = useContextState();

	return (
		<Layout>
			<div className={styles.home}>
				<h1 className={styles.title}>
					Welcome{user.user_id !== 0 && ` ${user.user_name}`}!
				</h1>

				<p className={styles.subtitle}>
					{user.user_id === 0 && (
						<span className={`${styles.typewriter} ${styles.steps60}`}>
							You must sign in to view your incomes & outcomes in the moves
							page.
						</span>
					)}

					{user.user_id !== 0 && (
						<span className={`${styles.typewriter} ${styles.steps47}`}>
							You can view your incomes & outcomes in the moves page.
						</span>
					)}
				</p>
			</div>
		</Layout>
	);
}
