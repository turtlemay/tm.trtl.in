export const myAge = function (bd = "1995") {
	const d = new Date(Date.now() - new Date(bd).getTime());
	return d.getUTCFullYear() - 1970;
}();