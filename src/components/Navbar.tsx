import React from 'react';
import styles from '../styles/Navbar.module.scss';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function Navbar() {
	return (
		<AppBar position="static" color="inherit">
			<Toolbar className={styles.navbar}>
				<Typography variant="h6">MERN ToDo App</Typography>
			</Toolbar>
		</AppBar>
	);
}
