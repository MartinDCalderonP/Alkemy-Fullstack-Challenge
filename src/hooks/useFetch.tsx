import { useState, useEffect } from 'react';

export default function useFetch<T>(url: string, options: RequestInit) {
	const [data, setData] = useState<T | undefined>(undefined);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | undefined>(undefined);

	const fetchData = async (url: string, options: RequestInit) => {
		setLoading(true);

		if (!url) {
			setLoading(false);
			return;
		}

		fetch(url, options)
			.then((res) => res.json())
			.then((data) => {
				setData(data);
				setLoading(false);
			})
			.catch((err) => {
				setError(err.message);
				setLoading(false);
			});
	};

	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;

		const optionsWithSignal: RequestInit = {
			...options,
			signal,
		};

		fetchData(url, optionsWithSignal);

		return () => {
			abortController.abort();
		};
	}, [url, options]);

	return { data, loading, error };
}
