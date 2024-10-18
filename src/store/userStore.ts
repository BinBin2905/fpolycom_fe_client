import { userProfile } from "@/type/TypeCommon";
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
  currentUserInfo?: userProfile | null;
  setCurrentUser: (user: userObject) => void;
  logoutUser: () => void;
  setCurrentUserInfo: (userInfo: userProfile) => void;
};

export const useUserStore = create<storeUser>()(
  persist(
    (set) => ({
      currentUser: null,
      currentUserInfo: null,
      setCurrentUser: (user) => set(() => ({ currentUser: user })),
      setCurrentUserInfo: (userInfo) =>
        set(() => ({ currentUserInfo: userInfo })),
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
