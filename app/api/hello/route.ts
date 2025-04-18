import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const query = searchParams.get("query") || "default";
	const errorType = searchParams.get("error");

	if (errorType === "400") {
		return NextResponse.json(
			{
				error: "Invalid request",
				details: "Request parameters are incorrect",
			},
			{ status: 400 },
		);
	}

	if (errorType === "404") {
		return NextResponse.json(
			{
				error: "Resource not found",
				details: "The specified resource does not exist",
			},
			{ status: 404 },
		);
	}

	if (errorType === "500") {
		return NextResponse.json(
			{
				error: "Server error occurred",
				details: "An unexpected error occurred during processing",
			},
			{ status: 500 },
		);
	}

	return NextResponse.json({
		message: `Received GET request. Query: ${query}`,
		timestamp: new Date().toISOString(),
	});
}

export async function POST(request: NextRequest) {
	const body = await request.json().catch(() => ({}));
	return NextResponse.json(
		{
			message: "Data created successfully",
			receivedData: body,
		},
		{ status: 201 },
	);
}

export async function PUT(request: NextRequest) {
	const body = await request.json().catch(() => ({}));
	return NextResponse.json({
		message: "Data updated successfully",
		receivedData: body,
	});
}

export async function DELETE(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const id = searchParams.get("id");

	if (!id) {
		return NextResponse.json({ error: "ID is not specified" }, { status: 400 });
	}

	return NextResponse.json({
		message: `Data with ID: ${id} has been deleted`,
	});
}
