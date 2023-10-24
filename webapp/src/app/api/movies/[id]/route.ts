import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const API_KEY = process.env.TMDB_API_KEY;
    if (!API_KEY) throw new Error("API key not found");
    console.log(id, API_KEY);
    const response = await fetch(
      `https://api.themoviedb.org/3/find/${id}?external_source=imdb_id&api_key=${API_KEY}`
    );
    if (!response.ok) throw new Error("API request failed");
    const data = await response.json();
    return NextResponse.json(data);
  } catch (e) {
    console.error(e);
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 500 });
    } else {
      return NextResponse.json({}, { status: 500 });
    }
  }
}
