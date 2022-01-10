import React from 'react';
import { createPortal } from 'react-dom';
import styles from '../styles/Modal.module.scss';
import { IModalProps } from '../common/Interfaces';
import CloseIcon from './CloseIcon';

export default function Modal({ closeModal }: IModalProps) {
	const handleCloseIconClick = () => {
		closeModal(true);
	};

	return createPortal(
		<div className={styles.overlay}>
			<div className={`${styles.modal} ${styles.appearModal}`}>
				<CloseIcon
					className={styles.closeIcon}
					onClick={handleCloseIconClick}
				/>
			</div>
		</div>,
		document.getElementById('portal') as Element
	);
}
