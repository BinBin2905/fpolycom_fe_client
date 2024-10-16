// import { LoginLocationObject, LoginObject } from "@/type/TypeCommon";
import axios from "axios";
import { useUserStore } from "@/store/userStore";

export const loginStore = async (body: any) => {
  const response = await axios.post(
    import.meta.env.VITE_API_URL + "/user/store-login",
    body,
    {
      headers: {
        Authorization: "Bearer " + useUserStore.getState().currentUser?.token,
      },
    }
  );

  console.log(response);
  // Kiểm tra nếu phản hồi không hợp lệ
  if (response.status != 200) {
    throw new Error("Failed to fetch data");
  }
  // Nếu dữ liệu trả về là undefined hoặc null, ném lỗi
  if (!(response.data?.code == "00")) {
    throw new Error("No data found");
  }
  return response.data?.data;
};

export const loginUser = async (body: any) => {
  const response = await axios.post(
    import.meta.env.VITE_API_URL + "/user-login",
    body
  );

  console.log("loginUser: ", response);
  // Kiểm tra nếu phản hồi không hợp lệ
  if (response.status != 200) {
    throw new Error("Failed to fetch data");
  }
  // Nếu dữ liệu trả về là undefined hoặc null, ném lỗi
  if (!(response.data?.code == "00")) {
    throw new Error("No data found");
  }
  return response.data?.data;
};

export const loginAdmin = async (body: any) => {
  const response = await axios.post(
    import.meta.env.VITE_API_URL + "/admin-login",
    body
  );

  console.log(response);
  // Kiểm tra nếu phản hồi không hợp lệ
  if (response.status != 200) {
    throw new Error("Failed to fetch data");
  }
  // Nếu dữ liệu trả về là undefined hoặc null, ném lỗi
  if (!(response.data?.code == "00")) {
    throw new Error("No data found");
  }
  return response.data?.data;
};
