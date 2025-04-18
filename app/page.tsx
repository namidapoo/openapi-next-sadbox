import client from "@/lib/client";
// import client from "@/lib/client-use-middleware";
import { getStatusText } from "@/lib/get-status-text";
import type { FC } from "react";

const Home: FC = async () => {
	const { data, error, response } = await client.GET("/hello", {
		params: {
			query: {
				q: "jane doe",
				// error: 500,
			},
		},
	});

	const statusCode = response?.status;

	return (
		<div className="flex flex-col min-h-screen bg-gray-50 p-6 sm:p-8">
			<header className="mb-8">
				<h1 className="text-3xl font-bold text-gray-800">
					API Response Viewer
				</h1>
				<p className="text-gray-600 mt-2">
					Testing the Next.js App Router API endpoints
				</p>
				{statusCode && (
					<div
						className={`mt-3 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium 
						${
							statusCode >= 200 && statusCode < 300
								? "bg-green-100 text-green-800"
								: statusCode >= 400 && statusCode < 500
									? "bg-orange-100 text-orange-800"
									: statusCode >= 500
										? "bg-red-100 text-red-800"
										: "bg-blue-100 text-blue-800"
						}`}
					>
						Status: {statusCode} {getStatusText(statusCode)}
					</div>
				)}
			</header>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-96">
				<div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
					<div className="bg-blue-500 px-6 py-4">
						<h2 className="text-xl font-semibold text-white flex items-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5 mr-2"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true"
							>
								<title>Response document icon</title>
								<path
									fillRule="evenodd"
									d="M4 2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H4zm0 2h12v12H4V4zm3 3a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1zm0 4a1 1 0 011-1h6a1 1 0 110 2H8a1 1 0 01-1-1zm0 4a1 1 0 011-1h2a1 1 0 110 2H8a1 1 0 01-1-1z"
									clipRule="evenodd"
								/>
							</svg>
							Response Data
						</h2>
					</div>
					<div className="p-6">
						{data !== undefined && data !== null ? (
							<pre className="bg-gray-50 p-4 rounded-md overflow-auto max-h-[400px] text-sm">
								{JSON.stringify(data, null, 2)}
							</pre>
						) : data === null ? (
							<div className="bg-blue-50 p-4 rounded-md border border-blue-100">
								<p className="flex items-center text-blue-700">
									<span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-2" />
									<span className="font-medium">null</span> - Response is
									explicitly null
								</p>
							</div>
						) : (
							<div className="bg-purple-50 p-4 rounded-md border border-purple-100">
								<p className="flex items-center text-purple-700">
									<span className="inline-block w-3 h-3 bg-purple-500 rounded-full mr-2" />
									<span className="font-medium">undefined</span> - No data
									received
								</p>
							</div>
						)}
						<div className="mt-4 text-sm text-gray-500">
							<p>
								Endpoint:{" "}
								<span className="font-mono bg-gray-100 px-1 py-0.5 rounded">
									/hello
								</span>
							</p>
							<p className="mt-1">
								Method: <span className="font-medium text-green-600">GET</span>
							</p>
						</div>
					</div>
				</div>

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
							{statusCode && statusCode >= 400 && (
								<span className="ml-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
									Status {statusCode}
								</span>
							)}
						</h2>
					</div>
					<div className="p-6">
						{error !== undefined && error !== null ? (
							<>
								<div className="mb-4 flex items-center text-sm font-medium">
									{statusCode && (
										<div
											className={`px-2 py-1 rounded mr-2 
											${
												statusCode >= 400 && statusCode < 500
													? "bg-orange-100 text-orange-800"
													: statusCode >= 500
														? "bg-red-100 text-red-800"
														: "bg-blue-100 text-blue-800"
											}`}
										>
											{statusCode}
										</div>
									)}
									<span>{getStatusText(statusCode)}</span>
								</div>
								<pre className="bg-gray-50 p-4 rounded-md overflow-auto max-h-[400px] text-sm">
									{JSON.stringify(error, null, 2)}
								</pre>
							</>
						) : error === null ? (
							<div className="bg-orange-50 p-4 rounded-md border border-orange-100">
								<p className="flex items-center text-orange-700">
									<span className="inline-block w-3 h-3 bg-orange-500 rounded-full mr-2" />
									<span className="font-medium">null</span> - Error is
									explicitly null
								</p>
							</div>
						) : (
							<div className="bg-green-50 p-4 rounded-md border border-green-100">
								<p className="flex items-center text-green-700">
									<span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2" />
									<span className="font-medium">undefined</span> - No errors
									detected
								</p>
							</div>
						)}
						<div className="mt-4 text-sm">
							<p className="text-gray-500">
								To test error responses, set the error parameter in the code to
								400, 404, or 500.
							</p>
						</div>
					</div>
				</div>
			</div>

			<footer className="mt-auto text-center text-gray-500 text-sm">
				<p>Next.js App Router API Example</p>
			</footer>
		</div>
	);
};

export default Home;
