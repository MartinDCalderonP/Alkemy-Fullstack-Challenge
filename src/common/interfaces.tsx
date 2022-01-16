import { MouseEventHandler, ReactNode, ReactElement } from 'react';

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

export interface IUserData {
	user_id: number;
	user_email: string;
	user_password: string;
}

export interface IModalProps {
	closeModal: Function;
}

export interface ILayoutProps {
	children: ReactNode;
}

export interface ISignFormProps {
	closeModal?: Function;
}

export interface IPublicRouteProps {
	children: ReactElement;
	redirectTo: string;
}
