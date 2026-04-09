"use client";

import { useQuery } from "convex/react";
import { BookOpenCheckIcon } from "lucide-react";

import UnitCard from "@/components/blocks/UnitCard";
import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty";
import { api } from "@/convex/api";
import { conversations } from "@/lib/language/convos";
import { PracticeQueueItem } from "@/lib/util/practice";

function PracticeSection({
    title,
    items,
}: {
    title: string;
    items: PracticeQueueItem[];
}) {
    if (items.length === 0) {
        return null;
    }

    return (
        <section className="flex w-full max-w-100 flex-col gap-4">
            <h2 className="text-3xl font-bold">{title}</h2>
            <div className="flex flex-col gap-4">
                {items.map((item) => {
                    const conversation = conversations.find(
                        (convo) => convo.id === item.unitId,
                    );

                    if (!conversation) {
                        return null;
                    }

                    return (
                        <UnitCard
                            convo={conversation}
                            returnTo="practice"
                            key={item.unitId}
                        />
                    );
                })}
            </div>
        </section>
    );
}

export default function PracticeUnitList() {
    const practiceQueue = useQuery(api.units.getPracticeQueue);
    const groupedQueue = {
        due: practiceQueue?.filter((item) => item.status === "due") ?? [],
        new: practiceQueue?.filter((item) => item.status === "new") ?? [],
        later: practiceQueue?.filter((item) => item.status === "later") ?? [],
    };

    if (practiceQueue === undefined) {
        return null;
    }

    if (practiceQueue.length === 0) {
        return (
            <Empty>
                <EmptyHeader>
                    <EmptyMedia variant="icon">
                        <BookOpenCheckIcon />
                    </EmptyMedia>
                    <EmptyTitle>No Practice Units Yet</EmptyTitle>
                    <EmptyDescription>
                        Complete a unit first and it will show up here for
                        review.
                    </EmptyDescription>
                </EmptyHeader>
            </Empty>
        );
    }

    return (
        <div className="flex flex-1 basis-auto flex-col items-center gap-12">
            <PracticeSection title="Due now" items={groupedQueue.due} />
            <PracticeSection title="New" items={groupedQueue.new} />
            <PracticeSection title="Later" items={groupedQueue.later} />
        </div>
    );
}
