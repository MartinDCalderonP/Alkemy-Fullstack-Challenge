import React, { useRef } from 'react';
import { createPortal } from 'react-dom';
import styles from '../styles/Modal.module.scss';
import useOnClickOutside from '../hooks/useOnClickOutside';
import CloseIcon from './CloseIcon';
import SignForm from './SignForm';

interface IModalProps {
	toggleModal: () => void;
}

export default function Modal({ toggleModal }: IModalProps) {
	const ref = useRef(null);

	const handleToggleModal = () => {
		toggleModal();
	};

	useOnClickOutside(ref, handleToggleModal);

	return createPortal(
		<div className={styles.overlay}>
			<div className={`${styles.modal} ${styles.appearModal}`} ref={ref}>
				<CloseIcon className={styles.closeIcon} onClick={handleToggleModal} />

				<SignForm toggleModal={handleToggleModal} type="signIn" />
			</div>
		</div>,
		document.getElementById('portal') as Element
	);
}
