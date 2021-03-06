export interface IMove {
	move_id: number;
	move_description: string;
	move_amount: number;
	move_type: string;
	move_date: Date;
}

export interface IUserData {
	user_id: number;
	user_name: string;
	user_email: string;
	user_password: string;
	user_token: string;
}

export interface IStatusResponse {
	status: string;
	message: string;
	user?: IUserData;
	token?: string;
}
