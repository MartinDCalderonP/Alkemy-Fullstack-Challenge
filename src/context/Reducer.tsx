type IUserData = {
	user_id: number;
	user_name: string;
	user_email: string;
	user_password: string;
};

export type State = IUserData;

export type Action = {
	type: string;
	payload: IUserData;
};

export const initialUser = {
	user_id: 0,
	user_name: '',
	user_email: '',
	user_password: '',
};

export const actionTypes = {
	SET_USER: 'SET_USER',
};

export default function reducer(state: State, action: Action): State {
	switch (action.type) {
		case actionTypes.SET_USER:
			return {
				...state,
				...action.payload,
			};

		default:
			return initialUser;
	}
}
