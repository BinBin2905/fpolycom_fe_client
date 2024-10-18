import { userProfile } from "@/type/TypeCommon";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
type CartObject = {
    "productDetailCode": string,
    "productName": string,
    "discountCode": number,
    "productCode": number,
    "image": string,
    "percentDecrease": number,
    "detailName": string,
    "price": number,
    "quantity": number
};

type storeUser = {
    currentCart: CartObject[];
    // currentUserInfo?: userProfile;
    // tokenLocation: string | null;
    setCart: (cart: CartObject[]) => void;
    updateCart: (cartItem: CartObject) => void
    // logoutUser: () => void;
    // setCurrentUserInfo: (userInfo: userProfile) => void;
};

export const useCartStore = create<storeUser>()(
    persist(
        (set) => ({
            currentCart: [],
            setCart: (cart: CartObject[]) => set(() => ({ currentCart: cart })),
            updateCart: (cart: CartObject) => set(() => {
                return { currentCart: [] }
            })
        }),
        {
            name: "cart",
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);
