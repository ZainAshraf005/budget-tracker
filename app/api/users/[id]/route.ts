import { NextResponse } from "next/server";
import dbConnect from "@/config/db";
import User from "@/models/User";
import Transaction from "@/models/Transaction";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const user = await User.findByIdAndDelete(params.id);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    await Transaction.deleteMany({ user: params.id });

    return NextResponse.json(
      { message: "User and all related transactions deleted" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
