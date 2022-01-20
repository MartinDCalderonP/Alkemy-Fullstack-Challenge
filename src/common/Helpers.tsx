import { API } from '../common/Enums';

export const format = (
	date: Date,
	locale: string,
	options?: Intl.DateTimeFormatOptions
) => new Intl.DateTimeFormat(locale, options).format(new Date(date));

export const getMovesFetchUrl = (userId: number): string => {
	return `${API.base}${API.moves}${API.byUserId}/${userId}`;
};

export const getMoveByIdFetchUrl = (userId: number, moveId: number): string => {
	return `${API.base}${API.moves}${API.byMoveId}/${userId}/${moveId}`;
};

export const postOrPutMoveFetchUrl = (moveId?: number): string => {
	return !moveId
		? `${API.base}${API.moves}`
		: `${API.base}${API.moves}/${moveId}`;
};

export const deleteMoveFetchUrl = (moveId: number): string => {
	return `${API.base}${API.moves}/${moveId}`;
};

export const signInOrUpFetchUrl = (type: string): string => {
	return type === 'signIn'
		? `${API.base}${API.auth}${API.users}`
		: `${API.base}${API.signUp}${API.users}`;
};

export const signOutFetchUrl = (): string => {
	return `${API.base}${API.auth}`;
};
