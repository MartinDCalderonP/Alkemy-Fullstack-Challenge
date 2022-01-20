import React, { ReactElement } from 'react';
import { Navigate } from 'react-router';
import { useContextState } from '../context/Context';

interface IPublicRouteProps {
	children: ReactElement;
	redirectTo: string;
}

export default function PublicRoute({
	children,
	redirectTo,
}: IPublicRouteProps) {
	const { user } = useContextState();

	const isAuthenticated = user.user_id > 0 ? true : false;

	return isAuthenticated ? <Navigate to={redirectTo} /> : children;
}
