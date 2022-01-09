import React, { createContext, useReducer, useContext, ReactNode } from 'react';
import { Context } from '../common/Types';
import reducer, { initialState } from './Reducer';

const StateContext = createContext<Context>({} as Context);

export function StateProvider({ children }: { children: ReactNode }) {
	const storagedUser = window.localStorage.getItem('user');

	const storagedState = {
		user: storagedUser ? JSON.parse(storagedUser) : initialState.user,
	};

	const [state, dispatch] = useReducer(
		reducer,
		storagedState ? storagedState : initialState
	);

	return (
		<StateContext.Provider value={{ state, dispatch }}>
			{children}
		</StateContext.Provider>
	);
}

export function useContextState() {
	const context = useContext(StateContext);

	if (!context) {
		throw new Error('useStateValue must be used within a StateProvider');
	}

	return context;
}
