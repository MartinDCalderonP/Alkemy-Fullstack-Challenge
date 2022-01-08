import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Form from './components/Form';
import TablesContainer from './components/TablesContainer';
import Footer from './components/Footer';

export default function App() {
	const [getMove, setGetMove] = useState(0);
	const [refreshMoves, setRefreshMoves] = useState(0);

	const onGetMove = (moveId: number) => {
		setGetMove(moveId);
	};

	const onRefreshMoves = () => {
		setRefreshMoves(refreshMoves + 1);
	};

	return (
		<div>
			<Navbar />
			<Form getMove={getMove} refreshMoves={onRefreshMoves} />
			<TablesContainer getMove={onGetMove} refreshMoves={refreshMoves} />
			<Footer />
		</div>
	);
}
