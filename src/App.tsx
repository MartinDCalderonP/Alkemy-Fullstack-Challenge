import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Paths } from './common/Enums';
import Home from './pages/Home';
import SignUp from './pages/SignUp';

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path={Paths.home} element={<Home />} />

				<Route path={Paths.register} element={<SignUp />} />

				<Route path="*" element={<Navigate replace to={Paths.home} />} />
			</Routes>
		</BrowserRouter>
	);
}
