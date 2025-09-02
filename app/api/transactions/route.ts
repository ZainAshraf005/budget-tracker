import { NextResponse } from "next/server";
import dbConnect from "@/config/db";
import Transaction from "@/models/Transaction";

export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { message: "UserId is required" },
        { status: 400 }
      );
    }

    const transactions = await Transaction.find({ user: userId }).sort({
      date: -1,
    });
    return NextResponse.json(transactions, { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    const { title, amount, type, user } = body;

    if (!title || !amount || !type || !user) {
      return NextResponse.json(
        { message: "Missing required fields (title, amount, type, user)" },
        { status: 400 }
      );
    }

    if (amount < 0)
      return NextResponse.json(
        { message: "Amount cannot be negative" },
        { status: 400 }
      );

    const newTransaction = await Transaction.create(body);
    return NextResponse.json(newTransaction, { status: 201 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
