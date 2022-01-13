import React from 'react';
import { ILayoutProps } from '../common/Interfaces';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children }: ILayoutProps) {
	return (
		<>
			<Navbar />
			<main>{children}</main>
			<Footer />
		</>
	);
}
