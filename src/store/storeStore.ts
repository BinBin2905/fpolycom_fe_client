import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
type storeObject = {
    storeName: string;
    storeImage: string;
    storeCode: 1;
    token: string;
    status: string;
};

type storeUser = {
    currentStore: storeObject | null;
    setCurrentStore: (user: storeObject) => void;
    logoutStore: () => void;
};

export const useStoreStore = create<storeUser>()(
    persist(
        (set) => ({
            currentStore: null,
            setCurrentStore: (user) => set(() => ({ currentStore: user })),
            logoutStore: () =>
                set(() => ({
                    currentStore: null,
                })),
        }),
        {
            name: "user",
            storage: createJSONStorage(() => localStorage),
        }
    )
);
