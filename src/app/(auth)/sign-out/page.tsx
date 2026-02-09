"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter()
    const { signOut } = useAuthActions()

    useQuery({
        queryKey: ["sign out"],
        queryFn: async () => {
            await signOut();
            router.replace("/")
        }
    })
}