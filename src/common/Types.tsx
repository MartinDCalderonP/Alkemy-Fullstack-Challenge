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