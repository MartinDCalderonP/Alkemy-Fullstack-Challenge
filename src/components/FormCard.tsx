import React, { ReactNode } from 'react';
import styles from '../styles/FormCard.module.scss';

interface IFormCardProps {
	children: ReactNode;
}

export default function FormCard({ children }: IFormCardProps) {
	return <div className={styles.card}>{children}</div>;
}
