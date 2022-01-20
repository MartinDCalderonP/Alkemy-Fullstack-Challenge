import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface ILayoutProps {
	children: ReactNode;
}

export default function Layout({ children }: ILayoutProps) {
	return (
		<>
			<Navbar />
			<main>{children}</main>
			<Footer />
		</>
	);
}
