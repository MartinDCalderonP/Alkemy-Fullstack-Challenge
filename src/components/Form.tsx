import React, { useState, useCallback, ChangeEvent, MouseEvent } from 'react';
import styles from '../styles/Form.module.scss';
import { throttle } from 'lodash';
import { API } from '../common/Enums';
import Toast from './Toast';
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

export default function Form() {
	const [move, setMove] = useState({
		id: '',
		description: '',
		amount: '',
		type: 'income',
		date: new Date(),
	});

	const [message, setMessage] = useState('');

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

	const throttledSubmit = useCallback(
		throttle(() => {
			if (!move.description || !move.amount) {
				setMessage('Please fill in all fields');
				return;
			}

			if (Number.isNaN(parseInt(move.amount))) {
				setMessage('Amount must be a number');
				return;
			}

			if (parseInt(move.amount) <= 0) {
				setMessage('Amount must be greater than 0');
				return;
			}

			const fetchURL = !move.id
				? `${API.base}${API.moves}`
				: `${API.base}${API.moves}/${move.id}`;
			const fetchMethod = !move.id ? 'POST' : 'PUT';

			fetch(fetchURL, {
				method: fetchMethod,
				body: JSON.stringify(move),
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			})
				.then((res) => res.json())
				.then((data) => {
					setMessage(data.message);
					setMove({
						id: '',
						description: '',
						amount: '',
						type: 'income',
						date: new Date(),
					});
				})
				.catch((err) => setMessage(err));
		}, 1000),
		[move]
	);

	const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		throttledSubmit();
	};

	const handleCloseToast = () => {
		setMessage('');
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
									{...(move.id && { disabled: true })}
								/>

								<FormControlLabel
									value="outcome"
									control={<Radio />}
									label="Outcome"
									{...(move.id && { disabled: true })}
								/>
							</RadioGroup>
						</FormControl>

						{move.id && (
							<p className={styles.radioWarning}>
								{"You can't change the move type"}.
							</p>
						)}
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

			{message && <Toast message={message} closeToast={handleCloseToast} />}
		</>
	);
}
