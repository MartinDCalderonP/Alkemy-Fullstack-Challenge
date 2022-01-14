import React, {
	createContext,
	useReducer,
	useContext,
	useEffect,
	ReactNode,
} from 'react';
import { Context } from '../common/Types';
import reducer, { initialUser } from './Reducer';
import useLocalStorage from '../hooks/useLocalStorage';

const StateContext = createContext<Context>({} as Context);

export function StateProvider({ children }: { children: ReactNode }) {
	const [storagedUser, setStoragedUser] = useLocalStorage('user', initialUser);

	const [user, dispatch] = useReducer(reducer, initialUser, () => storagedUser);

	useEffect(() => {
		setStoragedUser(user);
	}, [user]);

	return (
		<StateContext.Provider value={{ user, dispatch }}>
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
