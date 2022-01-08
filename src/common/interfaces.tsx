import { MouseEventHandler } from 'react';

export interface IFormProps {
	getMove: number;
	refreshMoves: Function;
}

export interface ITablesContainerProps {
	getMove: (moveId: number) => void;
	refreshMoves: number;
}

export interface ITableProps {
	moves: IMove[];
	getMove: (moveId: number) => void;
	message: (message: string) => void;
	refreshMoves: Function;
}

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
