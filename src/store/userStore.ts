import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
type userObject = {
  username: string;
  userImage: string;
  token: string;
  storeStatus: string;
  storeName: string;
  userId: string;
  userLogin: string;
};

type storeUser = {
  currentUser: userObject | null;
  tokenLocation: string | null;
  setCurrentUser: (user: userObject) => void;
  logoutUser: () => void;
};

export const useUserStore = create<storeUser>()(
  persist(
    (set) => ({
      currentUser: null,
      tokenLocation: null,
      setCurrentUser: (user) => set(() => ({ currentUser: user })),
      logoutUser: () =>
        set(() => ({
          currentUser: null,
        })),
    }),
    {
      name: "user",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
