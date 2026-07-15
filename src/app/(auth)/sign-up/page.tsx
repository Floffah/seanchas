import { SignUp } from "@clerk/nextjs";

export default function Page() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-linear-to-b from-slate-950 to-background p-2">
            <SignUp routing="hash" signInUrl="/" fallbackRedirectUrl="/home" />
        </main>
    );
}
