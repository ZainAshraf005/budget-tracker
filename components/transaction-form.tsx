"use client";

import type React from "react";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useUserStore } from "@/store/useUserStore";
import { toast } from "sonner";

export function TransactionForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState<"income" | "expense">("expense");
  const { user } = useUserStore();
  const userId = user?._id;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) {
      alert("Please login or create a user first.");
      return;
    }

    try {
      const { data } = await axios.post("/api/transactions", {
        user: userId,
        title,
        amount: Number(amount),
        category,
        type,
      });

      toast("Transaction saved successfully!");

      // reset form
      setTitle("");
      setAmount("");
      setCategory("");
      setType("expense");
    } catch (error) {
      if (error instanceof AxiosError) toast.error(error.response?.data.message);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Add New Transaction</CardTitle>
          <CardDescription>
            Enter transaction details to track your income and expenses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="Grocery shopping"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  type="text"
                  placeholder="Food & Dining"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-3">
                <Label>Transaction Type</Label>
                <RadioGroup
                  value={type}
                  onValueChange={(value: "income" | "expense") =>
                    setType(value)
                  }
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="expense" id="expense" />
                    <Label htmlFor="expense">Expense</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="income" id="income" />
                    <Label htmlFor="income">Income</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Add Transaction
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
