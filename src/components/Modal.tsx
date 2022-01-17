import React from 'react';
import { createPortal } from 'react-dom';
import styles from '../styles/Modal.module.scss';
import { IModalProps } from '../common/Interfaces';
import CloseIcon from './CloseIcon';
import SignForm from './SignForm';

export default function Modal({ toggleModal }: IModalProps) {
	const handleToggleModal = () => {
		toggleModal(true);
	};

	return createPortal(
		<div className={styles.overlay}>
			<div className={`${styles.modal} ${styles.appearModal}`}>
				<CloseIcon className={styles.closeIcon} onClick={handleToggleModal} />

				<SignForm toggleModal={handleToggleModal} type="signIn" />
			</div>
		</div>,
		document.getElementById('portal') as Element
	);
}
