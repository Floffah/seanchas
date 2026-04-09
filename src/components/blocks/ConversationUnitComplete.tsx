"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";

import LoadingButton from "@/components/ui/button-loading";
import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
} from "@/components/ui/card";
import { useConversation } from "@/providers/ConvoProvider";

export default function ConversationUnitComplete() {
    const convo = useConversation();
    const router = useRouter();
    const params = useSearchParams();

    const returnUrl = useMemo(() => {
        const returnTo = params.get("returnTo");

        if (returnTo === "practice") {
            return "/practice";
        }

        return "/home";
    }, [params]);

    useEffect(() => {
        router.prefetch(returnUrl);
    }, [returnUrl, router]);

    return (
        <div className="mx-auto mt-20 flex w-full max-w-lg grow flex-col items-center p-4">
            <Card className="w-full items-center text-center">
                <CardContent>
                    <CardTitle>Unit Complete</CardTitle>
                    <CardDescription>
                        You&apos;ve finished this conversation unit.
                    </CardDescription>
                    <LoadingButton
                        className="mt-2"
                        isLoading={convo.saveCompletionPending}
                        disabled={convo.saveCompletionSuccess}
                        onClick={async () => {
                            try {
                                await convo.finishUnit();
                            } catch {
                                return;
                            }

                            router.push(returnUrl);
                        }}
                    >
                        Save and return home
                    </LoadingButton>
                    {!!convo.saveCompletionError && (
                        <p className="mt-2 text-sm text-destructive">
                            {convo.saveCompletionError.toString()}
                        </p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
