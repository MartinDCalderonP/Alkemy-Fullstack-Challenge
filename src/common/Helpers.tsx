export const format = (
	date: Date,
	locale: string,
	options?: Intl.DateTimeFormatOptions
) => new Intl.DateTimeFormat(locale, options).format(new Date(date));
