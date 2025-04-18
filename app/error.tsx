"use client";
import { getStatusText } from "@/lib/get-status-text";
import { type FC, useEffect, useState } from "react";

type Props = {
	error: Error & { digest?: string; status?: number; statusText?: string };
	reset: () => void;
};

const ErrorPage: FC<Props> = ({ error, reset }) => {
	const [errorInfo, setErrorInfo] = useState({
		statusCode: 500,
		statusText: "Internal Server Error",
	});

	useEffect(() => {
		console.error(error);
		try {
			if (error.status) {
				const statusCode = error.status;
				const statusText = error.statusText || getStatusText(statusCode);
				setErrorInfo({ statusCode, statusText });
				return;
			}
			const statusMatch = error.message.match(/(\d{3})/);
			if (statusMatch?.[1]) {
				const statusCode = Number.parseInt(statusMatch[1], 10);
				if (statusCode >= 400 && statusCode < 600) {
					setErrorInfo({
						statusCode,
						statusText: getStatusText(statusCode),
					});
					return;
				}
			}
		} catch (e) {
			console.error("Failed to parse error information:", e);
		}
	}, [error]);

	return (
		<div className="flex flex-col min-h-screen bg-gray-50 p-6 sm:p-8">
			<header className="mb-8">
				<h1 className="text-3xl font-bold text-gray-800">Error Occurred</h1>
				<p className="text-gray-600 mt-2">
					Something went wrong with your request
				</p>
				<div className="mt-3 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
					Status: {errorInfo.statusCode} {errorInfo.statusText}
				</div>
			</header>

			<div className="max-w-2xl mx-auto">
				<div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
					<div className="bg-red-500 px-6 py-4">
						<h2 className="text-xl font-semibold text-white flex items-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5 mr-2"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true"
							>
								<title>Error icon</title>
								<path
									fillRule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
									clipRule="evenodd"
								/>
							</svg>
							Error Information{" "}
							<span className="ml-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
								Status {errorInfo.statusCode}
							</span>
						</h2>
					</div>
					<div className="p-6">
						<div className="mb-4 flex items-center text-sm font-medium">
							<div className="px-2 py-1 rounded mr-2 bg-red-100 text-red-800">
								{errorInfo.statusCode}
							</div>
							<span>{errorInfo.statusText}</span>
						</div>

						<div className="bg-red-50 p-4 rounded-md border border-red-100 mb-6">
							<p className="text-red-700 font-medium break-words">
								{error.message}
							</p>
							{error.digest && (
								<div className="mt-3 pt-3 border-t border-red-100">
									<div className="flex items-center">
										<span className="bg-gray-200 px-2 py-1 rounded text-xs font-mono text-gray-800 mr-2">
											Error ID
										</span>
										<span className="font-mono text-sm text-gray-700">
											{error.digest}
										</span>
									</div>
								</div>
							)}
						</div>

						<div className="mt-4 text-sm text-gray-500 mb-6">
							<p>
								The application encountered an error that prevented it from
								fulfilling your request.
							</p>
						</div>

						<button
							type="button"
							onClick={() => reset()}
							className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded transition duration-200"
						>
							Try Again
						</button>
					</div>
				</div>
			</div>

			<footer className="mt-auto text-center text-gray-500 text-sm pt-8">
				<p>Next.js App Router API Example</p>
			</footer>
		</div>
	);
};

export default ErrorPage;
