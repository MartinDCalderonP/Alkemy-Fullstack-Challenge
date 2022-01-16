import React from 'react';
import { createPortal } from 'react-dom';
import styles from '../styles/Modal.module.scss';
import { IModalProps } from '../common/Interfaces';
import CloseIcon from './CloseIcon';
import SignForm from './SignForm';

export default function Modal({ closeModal }: IModalProps) {
	const handleCloseModal = () => {
		closeModal(true);
	};

	return createPortal(
		<div className={styles.overlay}>
			<div className={`${styles.modal} ${styles.appearModal}`}>
				<CloseIcon className={styles.closeIcon} onClick={handleCloseModal} />

				<SignForm closeModal={handleCloseModal} type="signIn" />
			</div>
		</div>,
		document.getElementById('portal') as Element
	);
}
