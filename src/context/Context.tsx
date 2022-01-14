import React, {
	createContext,
	useReducer,
	useContext,
	useEffect,
	ReactNode,
} from 'react';
import { Context } from '../common/Types';
import reducer, { initialState } from './Reducer';
import useLocalStorage from '../hooks/useLocalStorage';

const StateContext = createContext<Context>({} as Context);

export function StateProvider({ children }: { children: ReactNode }) {
	const [storagedState, setStoragedState] = useLocalStorage(
		'state',
		initialState
	);

	const [state, dispatch] = useReducer(
		reducer,
		initialState,
		() => storagedState
	);

	useEffect(() => {
		setStoragedState(state);
	}, [state]);

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
