/**
 * @param str {string}
 */
export function parseEntries(str) {
	const DATE_PATTERN = '\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}';

	const regex = new RegExp((
		`(${DATE_PATTERN}.*)\\n` +
		'([\\s\\S]*?)\\n?' +
		`(?=${DATE_PATTERN}|\\s*$)`
	), 'g');

	const arr = [...str.matchAll(regex)];

	return arr.map(v => ({
		date: v[1],
		content: v[2].trim(),
	}));
}
