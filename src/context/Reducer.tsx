import { State, Action } from '../common/Types';

export const initialUser = {
	user_id: 0,
	user_name: '',
	user_email: '',
	user_password: '',
	user_token: '',
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
