import { IUserData } from '../common/Interfaces';

export type State = IUserData;

export type Action = {
	type: string;
	payload: IUserData;
};

export type Dispatch = (action: Action) => void;

export type Context = { user: State; dispatch: Dispatch };
