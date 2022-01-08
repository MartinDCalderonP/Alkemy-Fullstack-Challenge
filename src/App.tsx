import React from 'react';
import Navbar from './components/Navbar';
import Form from './components/Form';
import TablesContainer from './components/TablesContainer';
import Footer from './components/Footer';

export default function App() {
	return (
		<div>
			<Navbar />
			<Form />
			<TablesContainer />
			<Footer />
		</div>
	);
}
