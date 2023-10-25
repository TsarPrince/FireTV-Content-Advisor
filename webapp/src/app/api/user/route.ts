import prisma from "@/lib/db/prisma";
import { verifyToken } from "@/lib/server/auth-utils";
import { generateMessage } from "@/lib/server/response-utils";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;
    if (token === undefined) throw new Error("No token provided");

    const verifiedToken = verifyToken(token);

    if (verifiedToken === undefined) throw new Error("Invalid token");

    // Check the body
    const body = await request.json();
    if (body === undefined) throw new Error("No body provided");

    // Get the updateFields
    const updateFields = body.updateFields;
    if (updateFields === undefined) throw new Error("No updateFields provided");

    // Get the user
    const user = await prisma.user.findUnique({
      where: {
        id: verifiedToken.id,
      },
    });

    if (user === null) throw new Error("User not found");

    console.log({ updateFields });

    // Update the user
    const updatedUser = await prisma.user.update({
      where: {
        id: verifiedToken.id,
      },
      data: {
        ...updateFields,
      },
    });

    return NextResponse.json(
      generateMessage({
        message: "Successfully updated user",
        data: updatedUser,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      generateMessage({
        message: err instanceof Error ? err.message : "Something went wrong...",
        error: "unknown",
      }),
      { status: err instanceof Error ? 401 : 500 }
    );
  }
}
