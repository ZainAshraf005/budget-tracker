import { Schema, Document, models, model } from "mongoose";
import { IUser } from "./User";

export interface ITransaction extends Document {
  user: IUser["_id"]; // reference to User
  title: string;
  amount: number;
  category: string;
  type: "income" | "expense";
  date: Date;
}

const transactionSchema: Schema = new Schema<ITransaction>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User", // reference relation
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
      min: [1, "Amount must be positive"],
    },
    category: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["income", "expense"],
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

const Transaction =
  models.Transaction || model<ITransaction>("Transaction", transactionSchema);

export default Transaction;
