import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
} from "@/components/ui/card";

export default function ConversationUnitComplete() {
    return (
        <div className="mx-auto mt-20 flex w-full max-w-lg grow flex-col items-center p-4">
            <Card className="w-full items-center text-center">
                <CardContent>
                    <CardTitle>Unit Complete</CardTitle>
                    <CardDescription>
                        You&apos;ve finished this conversation unit.
                    </CardDescription>
                    <Button asChild>
                        <Link href="/home" className="mt-2">
                            Back to home
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
