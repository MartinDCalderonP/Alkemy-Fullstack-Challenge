export interface IMove {
	move_id: number;
	move_description: string;
	move_amount: number;
	move_type: string;
	move_date: Date;
}

export interface IStatusResponse {
	status: string;
	message: string;
}
