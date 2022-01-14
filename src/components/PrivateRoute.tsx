import React from 'react';
import { Navigate } from 'react-router';
import { useContextState } from '../context/Context';
import { IPrivateRouteProps } from '../common/Interfaces';

export default function PrivateRoute({
	children,
	redirectTo,
}: IPrivateRouteProps) {
	const { user } = useContextState();

	const isAuthenticated = user.user_id === 0 ? false : true;

	return isAuthenticated ? children : <Navigate to={redirectTo} />;
}
