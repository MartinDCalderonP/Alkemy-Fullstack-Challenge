import React from 'react';
import styles from '../styles/FormCard.module.scss';
import { ICardProps } from '../common/Interfaces';

export default function FormCard({ children }: ICardProps) {
	return <div className={styles.card}>{children}</div>;
}
