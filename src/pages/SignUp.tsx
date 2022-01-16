import React from 'react';
import Layout from '../components/Layout';
import FormCard from '../components/FormCard';
import SignForm from '../components/SignForm';

export default function SignUp() {
	return (
		<Layout>
			<FormCard>
				<SignForm type="signUp" />
			</FormCard>
		</Layout>
	);
}
