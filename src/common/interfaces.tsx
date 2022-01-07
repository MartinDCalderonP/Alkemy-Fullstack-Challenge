import { MouseEventHandler } from 'react';

export interface IMove {
	move_id: number;
	move_description: string;
	move_amount: number;
	move_type: string;
	move_date: Date;
}

export interface IToastProps {
	message: string;
	closeToast: Function;
}

export interface ICloseIconProps {
	className: string;
	onClick: MouseEventHandler;
}
