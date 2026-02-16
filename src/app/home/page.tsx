import { ChevronRightIcon, LanguagesIcon } from "lucide-react";
import Link from "next/link";
import { ViewTransition } from "react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { conversations } from "@/lib/language/convos";
import { cn } from "@/lib/utils";

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
                        <Button variant="ghost">Practice</Button>
                        <Button variant="ghost">News</Button>
                        <Button variant="ghost">Account</Button>
                    </nav>
                </aside>
                <main className="flex flex-1 basis-auto flex-col items-center gap-6">
                    <h2 className="text-3xl font-bold">Continue Learning</h2>
                    <div className="flex max-w-100 flex-col gap-4">
                        {conversations.map((convo, idx) => (
                            <ViewTransition
                                name={`convo-${convo.id}`}
                                key={convo.id}
                            >
                                <Link
                                    className={cn(
                                        "flex cursor-pointer items-center rounded-lg bg-card p-4 transition-transform hover:scale-105",
                                        idx === 0 && "border border-muted",
                                    )}
                                    href={`/${convo.id}`}
                                >
                                    <div className="flex flex-col items-start gap-2 text-left">
                                        <ViewTransition
                                            name={`convo-${convo.id}-title`}
                                        >
                                            <h3 className="text-xl font-semibold">
                                                {convo.name}
                                            </h3>
                                        </ViewTransition>
                                        <ViewTransition
                                            name={`convo-${convo.id}-description`}
                                        >
                                            <p className="text-sm">
                                                {convo.description}
                                            </p>
                                        </ViewTransition>
                                        <p className="text-sm text-muted-foreground">
                                            {convo.utterances.length} phrases
                                        </p>
                                    </div>
                                    <ViewTransition
                                        name={`convo-${convo.id}-navicon`}
                                    >
                                        <ChevronRightIcon className="size-6 text-muted-foreground" />
                                    </ViewTransition>
                                </Link>
                            </ViewTransition>
                        ))}
                    </div>
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
