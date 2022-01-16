import React from 'react';
import { Navigate } from 'react-router';
import { useContextState } from '../context/Context';
import { IPublicRouteProps } from '../common/Interfaces';

export default function PublicRoute({
	children,
	redirectTo,
}: IPublicRouteProps) {
	const { user } = useContextState();

	const isAuthenticated = user.user_id > 0 ? false : true;

	return isAuthenticated ? children : <Navigate to={redirectTo} />;
}