import { NextResponse } from "next/server";

export async function GET() {
	const res = await fetch("https://github.com/shadcn.png");
	const buffer = await res.arrayBuffer();

	return new NextResponse(Buffer.from(buffer), {
		headers: {
			"Content-Type": "image/png",
			"Cache-Control": "public, max-age=86400", // cache por 1 dia
		},
	});
}
