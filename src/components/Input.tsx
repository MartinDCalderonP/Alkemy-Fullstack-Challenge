import React from 'react';
import styles from '../styles/Input.module.scss';
import TextField, { TextFieldProps } from '@mui/material/TextField';

export default function Input({
	className,
	label,
	name,
	value,
	onChange,
	type,
}: TextFieldProps) {
	return (
		<TextField
			className={styles.textField + (className ? ' ' + className : '')}
			label={label}
			name={name}
			value={value}
			onChange={onChange}
			type={type}
		/>
	);
}
