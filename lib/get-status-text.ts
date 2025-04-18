export function getStatusText(status?: number): string {
	if (!status) return "";
	const statusTexts: Record<number, string> = {
		200: "OK",
		201: "Created",
		400: "Bad Request",
		401: "Unauthorized",
		403: "Forbidden",
		404: "Not Found",
		500: "Internal Server Error",
		502: "Bad Gateway",
		503: "Service Unavailable",
		504: "Gateway Timeout",
	};
	return statusTexts[status] || "Unknown Status";
}
