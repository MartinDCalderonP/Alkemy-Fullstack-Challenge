import React from 'react';
import styles from '../styles/Home.module.scss';
import Layout from '../components/Layout';

export default function Home() {
	return (
		<Layout>
			<div className={styles.home}>
				<h1 className={styles.title}>Home</h1>
				<p className={styles.welcome}>
					Welcome to the home page. You must be logged in to view your moves in
					the moves page.
				</p>
			</div>
		</Layout>
	);
}
