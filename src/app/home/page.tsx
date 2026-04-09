import { LanguagesIcon } from "lucide-react";
import Link from "next/link";
import { ViewTransition } from "react";

import UnitList from "@/components/blocks/UnitList";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function Page() {
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
                        <Button variant="ghost">News</Button>
                        <Button variant="ghost">Account</Button>
                    </nav>
                </aside>
                <main className="flex flex-1 basis-auto flex-col items-center gap-6">
                    <UnitList />
                </main>
                <aside className="flex max-w-100 min-w-48 basis-1/4 flex-col gap-2">
                    <div className="items-center rounded-lg bg-card p-4">
                        <div className="flex items-center gap-2">
                            <p className="text-xl">🔥</p>
                            <p>10</p>
                            <Progress value={70} className="h-2 grow" />
                            <p>14</p>
                        </div>
                        <p className="text-center text-sm text-muted-foreground">
                            Come back every day to increase your streak!
                        </p>
                    </div>
                    <div className="items-center rounded-lg bg-card p-4">
                        <div className="flex items-center gap-2">
                            <p className="text-xl">✅</p>
                            <p>5</p>
                            <Progress value={2} className="h-2 grow" />
                            <p>200</p>
                        </div>
                        <p className="text-center text-sm text-muted-foreground">
                            Keep doing units to increase your completion!
                        </p>
                    </div>
                </aside>
            </div>
        </ViewTransition>
    );
}
