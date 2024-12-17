import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type StoreObjectInitial = {
    storeName: string;
    storeImage: string;
    storeCode: number;
    token: string;
    status: string;
};

type storeUser = {
    currentStore: StoreObjectInitial | null;
    setCurrentStore: (user: StoreObjectInitial) => void;
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
            name: "store",
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);
