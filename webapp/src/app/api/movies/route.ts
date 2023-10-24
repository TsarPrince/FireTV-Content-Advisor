import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      `https://amazon-challenge-api.onrender.com/get_movies`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mood: "happy",
        }),
      }
    );
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
