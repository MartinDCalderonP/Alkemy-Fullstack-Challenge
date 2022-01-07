import React from 'react';
import styles from './styles/App.module.scss';
import Navbar from './components/Navbar';
import Form from './components/Form';
import Table from './components/Table';
import Footer from './components/Footer';

function App() {
	return (
		<div>
			<Navbar />
			<div className={styles.container}>
				<Form />
				<Table />
			</div>
			<Footer />
		</div>
	);
}

export default App;
