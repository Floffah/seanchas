import { useSnapshot } from "valtio";

import { tipsStore } from "@/lib/state/features";

export function useFeatures() {
    const tips = useSnapshot(tipsStore);

    return {
        tips,
    };
}
