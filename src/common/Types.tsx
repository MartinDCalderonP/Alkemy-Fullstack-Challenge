import { IUserData } from './Interfaces';

export type Action = {
	type: string;
	payload: { user: IUserData };
};

export type Dispatch = (action: Action) => void;

export type State = { user: IUserData };

export type Context = { state: State; dispatch: Dispatch };
