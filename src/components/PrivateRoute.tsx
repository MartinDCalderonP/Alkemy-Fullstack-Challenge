import React, { ReactElement } from 'react';
import { Navigate } from 'react-router';
import { useContextState } from '../context/Context';

interface IPrivateRouteProps {
	children: ReactElement;
	redirectTo: string;
}

export default function PrivateRoute({
	children,
	redirectTo,
}: IPrivateRouteProps) {
	const { user } = useContextState();

	const isAuthenticated = user.user_id > 0 ? true : false;

	return isAuthenticated ? children : <Navigate to={redirectTo} />;
}
