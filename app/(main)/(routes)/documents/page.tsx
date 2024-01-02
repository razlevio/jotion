"use client";

import Image from "next/image";
import { useUser } from "@clerk/clerk-react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { toast } from "sonner"

export default function DocumentsPage() {
  const { user } = useUser();
  const create = useMutation(api.documents.create)

  const onCreate = () => {
    const promise = create({title: "Untitled"})
    toast.promise(promise, {
      loading: "Creating a new document...",
      success: "New document created!",
      error: "Failed to create a new document"
    })
  }

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <Image
        src="/empty.png"
        height="300"
        width="300"
        alt="Empty"
        className="dark:hidden"
      />
      <Image
        src="/empty-dark.png"
        height="300"
        width="300"
        alt="Empty"
        className="hidden dark:block"
      />
      <h2 className="text-lg font-medium">
        {user?.fullName} Workspace 📃
      </h2>
      <Button onClick={onCreate}>
        <PlusCircle className="h-4 w-4 mr-2" />
        Create a document
      </Button>
    </div>
  );
}
