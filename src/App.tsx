import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Paths } from './common/Enums';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import Home from './pages/Home';
import Moves from './pages/Moves';
import SignUp from './pages/SignUp';

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path={Paths.home} element={<Home />} />

				<Route
					path={Paths.moves}
					element={
						<PrivateRoute redirectTo={Paths.home}>
							<Moves />
						</PrivateRoute>
					}
				/>

				<Route
					path={Paths.signUp}
					element={
						<PublicRoute redirectTo={Paths.home}>
							<SignUp />
						</PublicRoute>
					}
				/>

				<Route path="*" element={<Navigate replace to={Paths.home} />} />
			</Routes>
		</BrowserRouter>
	);
}
