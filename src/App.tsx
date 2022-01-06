import React from 'react';
import styles from './styles/App.module.scss';
import Navbar from './components/Navbar';
import Form from './components/Form';
import Footer from './components/Footer';

function App() {
	return (
		<div>
			<Navbar />
			<div className={styles.container}>
				<Form />
			</div>
			<Footer />
		</div>
	);
}

export default App;
