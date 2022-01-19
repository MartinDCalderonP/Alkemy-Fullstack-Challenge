import React from 'react';
import styles from '../styles/Home.module.scss';
import Layout from '../components/Layout';

export default function Home() {
	return (
		<Layout>
			<div className={styles.home}>
				<h1 className={styles.title}>Welcome!</h1>
				<p className={styles.subtitle}>
					You must be logged in to view your incomes & outcomes in the moves
					page.
				</p>
			</div>
		</Layout>
	);
}
