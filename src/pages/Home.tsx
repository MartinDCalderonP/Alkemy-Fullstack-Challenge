import React, { useState } from 'react';
import Layout from '../components/Layout';
import Form from '../components/Form';
import TablesContainer from '../components/TablesContainer';

export default function Home() {
	const [getMove, setGetMove] = useState(0);
	const [refreshMoves, setRefreshMoves] = useState(0);

	const onGetMove = (moveId: number) => {
		setGetMove(moveId);
	};

	const onRefreshMoves = () => {
		setRefreshMoves(refreshMoves + 1);
	};

	return (
		<Layout>
			<Form getMove={getMove} refreshMoves={onRefreshMoves} />
			<TablesContainer getMove={onGetMove} refreshMoves={refreshMoves} />
		</Layout>
	);
}
