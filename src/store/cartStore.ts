import { CartObject, userProfile } from "@/type/TypeCommon";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";


type storeUser = {
    currentCart: CartObject[];
    // currentUserInfo?: userProfile;
    // tokenLocation: string | null;
    setCart: (cart: CartObject[]) => void;
    updateCart: (cartItem: CartObject) => void
    addNewCart: (cartItem: CartObject) => void
    checkAllProduct: (storeCode: number, check: boolean) => void,
    checkFalseAll: () => void,
    checkTrueItem: (productDetailCode: number) => void,
    checkFalseItem: (productDetailCode: number) => void
    // logoutUser: () => void;
    // setCurrentUserInfo: (userInfo: userProfile) => void;
};

export const useCartStore = create<storeUser>()(
    persist(
        (set) => ({
            currentCart: [],
            setCart: (cart: CartObject[]) => set(() => ({ currentCart: [...cart.map(item => ({ ...item, checked: false }))] })),
            updateCart: (cart: CartObject) => set((current) => {
                let cloneValue = current.currentCart.map(item => {
                    return { ...item, quantity: item.productDetailCode == cart.productDetailCode ? cart.quantity : item.quantity }
                });

                return { currentCart: cloneValue }
            }),
            addNewCart: (cart: CartObject) => set((current) => {
                let cloneValue = current.currentCart;
                cloneValue = [{ ...cart, checked: false }, ...cloneValue.filter(item => item.productDetailCode != cart.productDetailCode)]
                return { currentCart: cloneValue }
            }),
            checkAllProduct: (storeCode: number, check: boolean) => set((current) => {
                console.log(storeCode)
                console.log(check)
                let cloneValue = current.currentCart.map(item => {
                    return { ...item, checked: item.storeCode == storeCode ? check : item.checked }
                });
                return { currentCart: cloneValue }
            }), checkFalseAll: () => set((current) => {

                let cloneValue = current.currentCart.map(item => {
                    return { ...item, checked: false }
                });
                return { currentCart: cloneValue }
            }), checkTrueItem: (productDetailCode: number) => set((current) => {
                let cloneValue = current.currentCart.map(item => {
                    return { ...item, checked: item.productDetailCode == productDetailCode ? true : item.checked }
                });
                return { currentCart: cloneValue }
            }), checkFalseItem: (productDetailCode: number) => set((current) => {
                let cloneValue = current.currentCart.map(item => {
                    return { ...item, checked: item.productDetailCode == productDetailCode ? false : item.checked }
                });
                return { currentCart: cloneValue }
            })
        }),
        {
            name: "cart",
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);
