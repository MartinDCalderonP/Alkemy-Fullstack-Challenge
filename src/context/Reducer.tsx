import { Action, State } from '../common/Types';

export const initialState = {
	user: {
		user_id: 0,
		user_email: '',
		user_password: '',
	},
};

export const actionTypes = {
	SET_USER: 'SET_USER',
};

export default function reducer(state: State, action: Action): State {
	switch (action.type) {
		case actionTypes.SET_USER:
			return {
				...state,
				user: action.payload.user,
			};

		default:
			return initialState;
	}
}
