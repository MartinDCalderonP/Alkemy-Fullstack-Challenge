import React, { useState } from 'react';
import { useContextState } from '../context/Context';
import Layout from '../components/Layout';
import MovesForm from '../components/MovesForm';
import TablesContainer from '../components/TablesContainer';

export default function Home() {
	const { user } = useContextState();

	const isAuthenticated = user.user_id > 0 ? true : false;

	const [getMoveById, setGetMove] = useState(0);
	const [refreshMoves, setRefreshMoves] = useState(0);

	const onGetMove = (moveId: number) => {
		setGetMove(moveId);
	};

	const onRefreshMoves = () => {
		setRefreshMoves(refreshMoves + 1);
	};

	return (
		<Layout>
			<MovesForm getMoveById={getMoveById} refreshMoves={onRefreshMoves} />

			{isAuthenticated && (
				<TablesContainer getMoveById={onGetMove} refreshMoves={refreshMoves} />
			)}
		</Layout>
	);
}
