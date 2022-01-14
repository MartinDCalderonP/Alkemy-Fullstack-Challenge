import { IUserData } from './Interfaces';

export type Action = {
	type: string;
	payload: IUserData;
};

export type Dispatch = (action: Action) => void;

export type State = IUserData;

export type Context = { user: State; dispatch: Dispatch };
