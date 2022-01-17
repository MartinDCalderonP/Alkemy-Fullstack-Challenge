import React, { useState } from 'react';
import Layout from '../components/Layout';
import FormCard from '../components/FormCard';
import SignForm from '../components/SignForm';
import Modal from '../components/Modal';

export default function SignUp() {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleToggleModal = () => {
		setIsModalOpen(!isModalOpen);
	};

	return (
		<>
			<Layout>
				<FormCard>
					<SignForm toggleModal={handleToggleModal} type="signUp" />
				</FormCard>
			</Layout>

			{isModalOpen && <Modal toggleModal={handleToggleModal} />}
		</>
	);
}
