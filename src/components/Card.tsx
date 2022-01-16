import React from 'react';
import styles from '../styles/Card.module.scss';
import { ICardProps } from '../common/Interfaces';

export default function Card({ children }: ICardProps) {
	return <div className={styles.card}>{children}</div>;
}
