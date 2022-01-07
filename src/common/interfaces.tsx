import { MouseEventHandler } from "react";

export interface IToastProps {
	message: string;
	closeToast: Function;
}

export interface ICloseIconProps {
	className: string;
	onClick: MouseEventHandler;
}
