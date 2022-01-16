import React from 'react';
import styles from '../styles/SignUp.module.scss';
import Layout from '../components/Layout';
import Card from '../components/Card';
import SignForm from '../components/SignForm';

export default function SignUp() {
	return (
		<Layout>
			<div className={styles.container}>
				<Card>
					<SignForm />
				</Card>
			</div>
		</Layout>
	);
}
