import { MouseEventHandler, ReactNode, ReactElement } from 'react';

export interface IFormProps {
	getMoveById: number;
	refreshMoves: Function;
}

export interface ITablesContainerProps {
	getMoveById: (moveId: number) => void;
	refreshMoves: number;
}

export interface ITableProps {
	moves: IMove[];
	getMoveById: (moveId: number) => void;
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
	user_name: string;
	user_email: string;
	user_password: string;
}

export interface IModalProps {
	toggleModal: Function;
}

export interface ILayoutProps {
	children: ReactNode;
}

export interface ISignFormProps {
	toggleModal: Function;
	type: string;
}

export interface IPublicRouteProps {
	children: ReactElement;
	redirectTo: string;
}

export interface IPrivateRouteProps {
	children: ReactElement;
	redirectTo: string;
}

export interface ICardProps {
	children: ReactNode;
}
