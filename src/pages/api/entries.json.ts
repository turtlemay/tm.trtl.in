import text from "../../../entries.txt?raw";
import { parseEntries } from "../../../parse-entries.js";

export function GET({ params, request }) {
	return new Response(
		JSON.stringify(parseEntries(text)),
	);
}
