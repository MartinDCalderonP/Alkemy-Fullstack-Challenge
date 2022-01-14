import React from 'react';
import styles from '../styles/MyButton.module.scss';
import Button, { ButtonProps } from '@mui/material/Button';

export default function MyButton({
	children,
	className,
	onClick,
	variant,
	color,
	type,
}: ButtonProps) {
	return (
		<Button
			className={styles.myButton + (className ? ` ${className}` : '')}
			onClick={onClick}
			variant={variant}
			color={color}
			type={type}
		>
			{children}
		</Button>
	);
}
