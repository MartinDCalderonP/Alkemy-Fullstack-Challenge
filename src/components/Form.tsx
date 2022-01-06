import React, { useState, ChangeEvent, MouseEvent } from 'react';
import styles from '../styles/Form.module.scss';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const url = 'http://localhost:8888/moves';

export default function Form() {
	const [move, setMove] = useState({
		id: '',
		description: '',
		amount: '',
		type: 'income',
		date: new Date(),
	});

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setMove({
			...move,
			[name]: value,
		});
	};

	const handleDateChange = (date: Date | null) => {
		if (date) {
			setMove({
				...move,
				date,
			});
		}
	};

	const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		if (!move.description || !move.amount) {
			return;
		}

		let fetchURL = url;
		let fetchMethod = 'POST';

		if (move.id) {
			fetchURL = `${url}/${move.id}`;
			fetchMethod = 'PUT';
		}

		fetch(fetchURL, {
			method: fetchMethod,
			body: JSON.stringify(move),
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		})
			.then((res) => res.json())
			.then(() => {
				setMove({
					id: '',
					description: '',
					amount: '',
					type: 'income',
					date: new Date(),
				});
			})
			.catch((err) => console.log(err));
	};

	return (
		<>
			<form className={styles.form}>
				<Card className={styles.card}>
					<CardContent className={styles.cardContent}>
						<TextField
							className={styles.textField}
							label="Move Description"
							name="description"
							value={move.description}
							onChange={handleChange}
							multiline
						/>

						<TextField
							className={styles.textField}
							label="Move Amount"
							name="amount"
							value={move.amount}
							onChange={handleChange}
						/>

						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<DatePicker
								className={styles.datePicker}
								label="Move Date"
								value={move.date}
								onChange={handleDateChange}
								renderInput={(params) => (
									<TextField className={styles.textField} {...params} />
								)}
							/>
						</LocalizationProvider>

						<FormControl className={styles.formControl} component="fieldset">
							<FormLabel component="legend">Move Type</FormLabel>
							<RadioGroup
								aria-label="type"
								defaultValue="income"
								name="type"
								onChange={handleChange}
								row
							>
								<FormControlLabel
									value="income"
									control={<Radio />}
									label="Income"
								/>
								<FormControlLabel
									value="outcome"
									control={<Radio />}
									label="Outcome"
								/>
							</RadioGroup>
						</FormControl>
					</CardContent>
					<CardActions className={styles.cardActions}>
						<Button
							className={styles.sendButton}
							variant="contained"
							type="submit"
							onClick={handleSubmit}
						>
							{!move.id ? 'Send' : 'Update'}
						</Button>
					</CardActions>
				</Card>
			</form>

			{/* <Notification message={message} /> */}
		</>
	);
}
