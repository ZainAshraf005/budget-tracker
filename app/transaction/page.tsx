import { TransactionForm } from "@/components/transaction-form"

export default function Page() {
  return (
    <main className="container mx-auto py-8 px-4">
      <div className="max-w-md mx-auto">
        <TransactionForm />
      </div>
    </main>
  )
}
