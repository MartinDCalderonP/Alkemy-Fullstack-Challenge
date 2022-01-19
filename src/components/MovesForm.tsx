import React, {
	useState,
	useEffect,
	useCallback,
	ChangeEvent,
	MouseEvent,
} from 'react';
import styles from '../styles/MovesForm.module.scss';
import { throttle } from 'lodash';
import { useContextState } from '../context/Context';
import { getMoveByIdFetchUrl, postOrPutMoveFetchUrl } from '../common/Helpers';
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

export default function MovesForm({ getMoveById, refreshMoves }: IFormProps) {
	const { user } = useContextState();

	const [move, setMove] = useState({
		id: 0,
		description: '',
		amount: '',
		type: 'income',
		date: new Date(),
	});

	const [message, setMessage] = useState('');

	useEffect(() => {
		if (getMoveById) {
			const fetchUrl = getMoveByIdFetchUrl(user.user_id, getMoveById);

			fetch(fetchUrl)
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
	}, [getMoveById]);

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

	const validateFields = () => {
		if (move.description === '' || move.amount === '') {
			setMessage('Please fill in all fields.');
			return;
		}

		if (move.amount.match(/[^0-9.]/)) {
			setMessage('Please enter a valid amount.');
			return;
		}

		return true;
	};

	const throttledSubmit = useCallback(
		throttle(() => {
			const fetchUrl = postOrPutMoveFetchUrl(move.id);

			const fetchMethod = !move.id ? 'POST' : 'PUT';

			const body = {
				...move,
				userId: user.user_id,
			};

			fetch(fetchUrl, {
				method: fetchMethod,
				body: JSON.stringify(body),
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			})
				.then((res) => res.json())
				.then((data) => {
					setMessage(data.message);
					setMove({
						id: 0,
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

		if (!validateFields()) {
			return;
		}

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

				<FormControl
					className={
						styles.formControl + (move.id ? ` ${styles.disabled}` : '')
					}
					component="fieldset"
				>
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

				{move.id > 0 && (
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
