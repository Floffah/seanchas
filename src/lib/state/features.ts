import { persistedProxy } from "@/lib/util/persistence";

export const tipsStore = persistedProxy("seanchas-tips", {
    firstIntroSeen: false,
});
