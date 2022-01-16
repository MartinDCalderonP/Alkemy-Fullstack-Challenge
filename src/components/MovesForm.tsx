import React, {
	useState,
	useEffect,
	useCallback,
	ChangeEvent,
	MouseEvent,
} from 'react';
import styles from '../styles/MovesForm.module.scss';
import { throttle } from 'lodash';
import { API } from '../common/Enums';
import { IFormProps } from '../common/Interfaces';
import FormCard from './FormCard';
import Input from './Input';
import MyButton from './MyButton';
import Toast from './Toast';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function MovesForm({ getMove, refreshMoves }: IFormProps) {
	const [move, setMove] = useState({
		id: '',
		description: '',
		amount: '',
		type: 'income',
		date: new Date(),
	});

	const [message, setMessage] = useState('');

	useEffect(() => {
		if (getMove) {
			fetch(`${API.base}${API.moves}/${getMove}`)
				.then((res) => res.json())
				.then((data) => {
					setMove({
						id: data[0].move_id,
						description: data[0].move_description,
						amount: data[0].move_amount,
						type: data[0].move_type,
						date: data[0].move_date,
					});
				})
				.catch((err) => setMessage(err));
		}
	}, [getMove]);

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
				setMessage('Please fill in all fields.');
				return;
			}

			if (Number.isNaN(parseInt(move.amount))) {
				setMessage('Amount must be a number.');
				return;
			}

			if (parseInt(move.amount) <= 0) {
				setMessage('Amount must be greater than 0.');
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
					refreshMoves(true);
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
		<FormCard>
			<form className={styles.form}>
				<Input
					label="Move Description"
					name="description"
					value={move.description}
					onChange={handleChange}
				/>

				<Input
					label="Move Amount"
					name="amount"
					value={move.amount}
					onChange={handleChange}
				/>

				<LocalizationProvider dateAdapter={AdapterDateFns}>
					<DatePicker
						label="Move Date"
						value={move.date}
						onChange={handleDateChange}
						renderInput={(params) => (
							<TextField className={styles.datePickerField} {...params} />
						)}
					/>
				</LocalizationProvider>

				<FormControl className={styles.formControl} component="fieldset">
					<FormLabel component="legend">Move Type</FormLabel>
					<RadioGroup
						aria-label="type"
						defaultValue="income"
						name="type"
						value={move.type}
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

				<div className={styles.buttonContainer}>
					<MyButton variant="contained" type="submit" onClick={handleSubmit}>
						{!move.id ? 'Send' : 'Update'}
					</MyButton>
				</div>
			</form>

			{message && <Toast message={message} closeToast={handleCloseToast} />}
		</FormCard>
	);
}
