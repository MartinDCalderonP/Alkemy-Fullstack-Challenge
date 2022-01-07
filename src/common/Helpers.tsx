export const capitalizeWord = (word: string) => {
	if (!word) return word;
	return word[0].toUpperCase() + word.substr(1).toLowerCase();
};

export const format = (
	date: Date,
	locale: string,
	options?: Intl.DateTimeFormatOptions
) => new Intl.DateTimeFormat(locale, options).format(new Date(date));
