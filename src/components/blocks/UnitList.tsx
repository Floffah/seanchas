"use client";

import { useQuery } from "convex/react";
import {
    BookCheckIcon,
    ChevronsDownUpIcon,
    ChevronsUpDownIcon,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import UnitCard from "@/components/blocks/UnitCard";
import { Button } from "@/components/ui/button";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty";
import { api } from "@/convex/api";
import { conversations } from "@/lib/language/convos";

export default function UnitList() {
    const completedUnitsQuery = useQuery(api.units.getCompletedUnitIds);

    const completedUnits = useMemo(
        () =>
            conversations.filter((convo) =>
                completedUnitsQuery?.includes(convo.id),
            ),
        [completedUnitsQuery],
    );
    const incompleteUnits = useMemo(
        () =>
            completedUnitsQuery
                ? conversations.filter(
                      (convo) => !completedUnitsQuery.includes(convo.id),
                  )
                : conversations,
        [completedUnitsQuery],
    );

    const [completedOpen, setCompletedOpen] = useState(true);

    return (
        <div className="flex flex-1 basis-auto flex-col items-center gap-12">
            <div className="flex flex-1 basis-auto flex-col items-center gap-6">
                <h2 className="text-3xl font-bold">Continue Learning</h2>
                <div className="flex max-w-100 flex-col gap-4">
                    {incompleteUnits.length === 0 && (
                        <Empty>
                            <EmptyHeader>
                                <EmptyMedia variant="icon">
                                    <BookCheckIcon />
                                </EmptyMedia>
                                <EmptyTitle>No Units to Show</EmptyTitle>
                                <EmptyDescription>
                                    You&apos;ve completed all available units.
                                    Great job!
                                </EmptyDescription>
                                <EmptyContent className="flex-row justify-center gap-2">
                                    <Button asChild>
                                        <Link href="/practice">
                                            Start Practicing
                                        </Link>
                                    </Button>
                                </EmptyContent>
                            </EmptyHeader>
                        </Empty>
                    )}

                    {incompleteUnits.map((convo, idx) => (
                        <UnitCard
                            convo={convo}
                            active={idx === 0}
                            key={convo.id}
                        />
                    ))}
                </div>
            </div>

            {completedUnits.length > 0 && (
                <Collapsible
                    open={completedOpen}
                    onOpenChange={setCompletedOpen}
                    className="flex flex-1 basis-auto flex-col items-center gap-6"
                >
                    <CollapsibleTrigger asChild>
                        <button className="flex items-center gap-4 text-3xl font-bold">
                            Revisit Units
                            {completedOpen && (
                                <ChevronsDownUpIcon className="ml-auto size-5" />
                            )}
                            {!completedOpen && (
                                <ChevronsUpDownIcon className="ml-auto size-5" />
                            )}
                        </button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="flex max-w-100 flex-col gap-4">
                        {completedUnits.map((convo) => (
                            <UnitCard convo={convo} key={convo.id} />
                        ))}
                    </CollapsibleContent>
                </Collapsible>
            )}
        </div>
    );
}
