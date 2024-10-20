import { postData } from "@/api/commonApi";
import { useCartStore } from "@/store/cartStore";
import { useMutation } from "@tanstack/react-query";

const { updateCart } = useCartStore();

export const handleUpdateCart = useMutation({
  mutationFn: (body: any) => postData(body, "/user/cart/new"),
  onSuccess: (data, variables) => {
    updateCart(data);
  },
});
