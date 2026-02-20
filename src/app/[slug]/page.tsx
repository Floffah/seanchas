import { notFound } from "next/navigation";
import { ViewTransition } from "react";

import ConversationUnit from "@/components/blocks/ConversationUnit";
import { conversations } from "@/lib/language/convos";
import ConvoProvider from "@/providers/ConvoProvider";

export async function generateStaticParams() {
    return conversations.map((c) => ({
        slug: c.id,
    }));
}

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const convo = conversations.find((c) => c.id === slug);

    if (!convo) {
        return notFound();
    }

    return (
        <ConvoProvider slug={slug}>
            <ViewTransition>
                <ConversationUnit />
            </ViewTransition>
        </ConvoProvider>
    );
}
