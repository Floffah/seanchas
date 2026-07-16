import { LanguagesIcon } from "lucide-react";
import Link from "next/link";
import { ViewTransition } from "react";

import HomeProgressWidgets from "@/components/blocks/HomeProgressWidgets";
import UnitList from "@/components/blocks/UnitList";
import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";

export default async function Page() {
    await auth.protect()

    return (
        <ViewTransition>
            <div className="flex gap-4 p-8">
                <aside className="flex shrink-0 basis-auto flex-col gap-4">
                    <h1 className="flex items-center gap-2 text-3xl font-bold">
                        <LanguagesIcon className="size-7 text-muted-foreground" />
                        Seanchas
                    </h1>

                    <nav className="flex flex-col gap-2">
                        <Button variant="secondary" asChild>
                            <Link href="/home">Units</Link>
                        </Button>
                        <Button variant="ghost" asChild>
                            <Link href="/practice">Practice</Link>
                        </Button>
                    </nav>
                </aside>
                <main className="flex flex-1 basis-auto flex-col items-center gap-6">
                    <UnitList />
                </main>
                <aside className="flex max-w-100 min-w-48 basis-1/4 flex-col gap-2">
                    <HomeProgressWidgets />
                </aside>
            </div>
        </ViewTransition>
    );
}
