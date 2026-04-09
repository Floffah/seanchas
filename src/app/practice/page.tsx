import { LanguagesIcon } from "lucide-react";
import Link from "next/link";

import PracticeUnitList from "@/components/blocks/PracticeUnitList";
import { Button } from "@/components/ui/button";

export default function Page() {
    return (
        <div className="flex gap-4 p-8">
            <aside className="flex shrink-0 basis-auto flex-col gap-4">
                <h1 className="flex items-center gap-2 text-3xl font-bold">
                    <LanguagesIcon className="size-7 text-muted-foreground" />
                    Seanchas
                </h1>

                <nav className="flex flex-col gap-2">
                    <Button variant="ghost" asChild>
                        <Link href="/home">Units</Link>
                    </Button>
                    <Button variant="secondary" asChild>
                        <Link href="/practice">Practice</Link>
                    </Button>
                    <Button variant="ghost">News</Button>
                    <Button variant="ghost">Account</Button>
                </nav>
            </aside>

            <main className="flex flex-1 basis-auto flex-col items-center gap-6">
                <PracticeUnitList />
            </main>
        </div>
    );
}
