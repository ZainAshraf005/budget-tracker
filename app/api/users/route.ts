import { NextResponse } from "next/server";
import dbConnect from "@/config/db";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { name, email } = await req.json();

    if (!name || !email) {
      return NextResponse.json(
        { message: "Name and email are required" },
        { status: 400 }
      );
    }

    let user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(user, { status: 200 });
    }

    user = await User.create({ name, email });
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
