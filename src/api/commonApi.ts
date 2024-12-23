import axios from "axios";
import { useUserStore } from "@/store/userStore";
import { useStoreStore } from "@/store";
import { NewPassword, userProfile } from "@/type/TypeCommon";
import { storage } from "@/lib/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
// import moment from "moment";

export const fetchDataCondition = async (body: { [key: string]: any }) => {
  const response = await axios.post(
    "https://api-dev.firstems.com/Api/data/runApi_Data?run_Code=DTA004",
    body,
    {
      headers: {
        token: useUserStore.getState().tokenLocation,
      },
    }
  );

  console.log(response);
  // Kiểm tra nếu phản hồi không hợp lệ
  if (response.status != 200) {
    throw new Error("Failed to fetch data");
  }
  // Nếu dữ liệu trả về là undefined hoặc null, ném lỗi
  if (!response.data?.RETNCODE) {
    throw new Error("No data found");
  }
  return response.data?.RETNDATA;
};

export const fetchDetailData = async (body: { [key: string]: any }) => {
  const response = await axios.post(
    "https://api-dev.firstems.com/Api/data/runApi_Data?run_Code=DTA005",
    body,
    {
      headers: {
        token: useUserStore.getState().tokenLocation,
      },
    }
  );

  console.log(response);
  // Kiểm tra nếu phản hồi không hợp lệ
  if (response.status != 200) {
    throw new Error("Failed to fetch data");
  }
  // Nếu dữ liệu trả về là undefined hoặc null, ném lỗi
  if (!response.data?.RETNCODE) {
    throw new Error("No data found");
  }
  return response.data?.RETNDATA;
};

// Tải dữ liệu danh mục
export const fetchCategory = async (category: string) => {
  const response = await axios.post(
    "https://api-dev.firstems.com/Api/data/runApi_Data?run_Code=DTA002",
    {
      LISTCODE: category,
    },
    {
      headers: {
        token: useUserStore.getState().tokenLocation,
      },
    }
  );

  console.log(response);
  // Kiểm tra nếu phản hồi không hợp lệ
  if (response.status != 200) {
    throw new Error("Failed to fetch data");
  }
  // Nếu dữ liệu trả về là undefined hoặc null, ném lỗi
  if (!response.data?.RETNCODE || response.data?.RETNDATA == null) {
    throw new Error("No data found");
  }
  return response.data?.RETNDATA;
};

export const fetchImage = async (url: string) => {
  console.log(url);
  try {
    const response = await axios.get(url, {
      headers: {
        token: useUserStore.getState().tokenLocation,
      },
      responseType: "blob",
    });
    return response.data;
  } catch (error) {
    throw new Error("Lỗi hệ thống!");
  }

  // Kiểm tra nếu phản hồi không hợp lệ
  // if (response.status != 200) {
  //   throw new Error("Failed to fetch data");
  // }
};

// Cập nhật dữ liệu
export const updateData = async (body: { [key: string]: any }) => {
  const response = await axios.post(
    "https://api-dev.firstems.com/Api/data/runApi_Data?run_Code=DTA008",
    body,
    {
      headers: {
        token: useUserStore.getState().tokenLocation,
      },
    }
  );

  console.log(response);
  // Kiểm tra nếu phản hồi không hợp lệ
  if (response.status != 200) {
    throw new Error("Failed to fetch data");
  }
  // Nếu dữ liệu trả về là undefined hoặc null, ném lỗi
  if (!response.data?.RETNCODE) {
    throw new Error("No data found");
  }
  return response.data?.RETNDATA;
};

// Xóa chứng từ
export const deleteData = async (body: { [key: string]: any }) => {
  const response = await axios.post(
    "https://api-dev.firstems.com/Api/data/runApi_Data?run_Code=DTA009",
    body,
    {
      headers: {
        token: useUserStore.getState().tokenLocation,
      },
    }
  );

  console.log(response);
  // Kiểm tra nếu phản hồi không hợp lệ
  if (response.status != 200) {
    throw new Error("Failed to fetch data");
  }
  // Nếu dữ liệu trả về là undefined hoặc null, ném lỗi
  if (!response.data?.RETNCODE) {
    throw new Error("No data found");
  }
  return response.data?.RETNDATA;
};

// Thêm mới hình ảnh
export const postImage = async (body: FormData) => {
  const response = await axios.post(
    "https://api-dev.firstems.com/Api/data/runApi_File?run_Code=DTA011",
    body,
    {
      headers: {
        token: useUserStore.getState().tokenLocation,
      },
    }
  );

  console.log(response);
  // Kiểm tra nếu phản hồi không hợp lệ
  if (response.status != 200) {
    throw new Error("Failed to fetch data");
  }
  // Nếu dữ liệu trả về là undefined hoặc null, ném lỗi
  if (!response.data?.RETNCODE) {
    throw new Error("No data found");
  }
  return response.data?.RETNDATA;
};

// Thêm mới hình ảnh
export const deleteImage = async (body: FormData) => {
  const response = await axios.post(
    "https://api-dev.firstems.com/Api/data/runApi_File?run_Code=DTA012",
    body,
    {
      headers: {
        token: useUserStore.getState().tokenLocation,
      },
    }
  );

  console.log(response);
  // Kiểm tra nếu phản hồi không hợp lệ
  if (response.status != 200) {
    throw new Error("Failed to fetch data");
  }
  // Nếu dữ liệu trả về là undefined hoặc null, ném lỗi
  if (!response.data?.RETNCODE) {
    throw new Error("No data found");
  }
  return response.data?.RETNDATA;
};

/// Code
export const uploadImage = async (file: File, url: string) => {
  if (!file) return;

  // Tạo một reference trong Firebase Storage
  const storageRef = ref(storage, `${url}/${file.name}`);

  // Upload file lên Firebase Storage
  try {
    const snapshot = await uploadBytes(storageRef, file);

    // Lấy URL tải xuống của file sau khi upload
    const downloadURL = await getDownloadURL(snapshot.ref);
    console.log("File uploaded and available at:", downloadURL);
    return downloadURL as string; // URL của hình ảnh để bạn có thể sử dụng
  } catch (error) {
    console.error("Upload failed", error);
    throw error;
  }
};

export const fetchData = async (enpoint: string) => {
  const response = await axios.get(import.meta.env.VITE_API_URL + enpoint, {
    headers: {
      Authorization: "Bearer " + useUserStore.getState().currentUser?.token,
    },
  });
  if (response.status != 200) {
    throw new Error("Failed to fetch data");
  }
  // Nếu dữ liệu trả về là undefined hoặc null, ném lỗi
  if (!(response.data?.code == "00")) {
    throw new Error("No data found");
  }
  return response.data?.data;
};

/// Code
export const postData = async (
  body: { [key: string]: any },
  endpoint: string
) => {
  console.log(body);
  const response = await axios.post(
    import.meta.env.VITE_API_URL + endpoint,
    body,
    {
      headers: {
        Authorization: "Bearer " + useUserStore.getState().currentUser?.token,
      },
    }
  );
  console.log(response.data);
  if (response.status != 200) {
    throw new Error("Thêm dữ liệu thất bại!");
  }
  // Nếu dữ liệu trả về là undefined hoặc null, ném lỗi
  if (!(response.data?.code == "00")) {
    throw new Error("No data found");
  }
  return response.data?.data;
};

// current user info
export async function getCurrentUserInfo(body: { userLogin?: string }) {
  const response = await axios.post(
    import.meta.env.VITE_API_URL + "/user/get",
    body,
    {
      headers: {
        Authorization: "Bearer " + useUserStore.getState().currentUser?.token,
      },
    }
  );
  if (response.status != 200) {
    throw new Error("Lấy dữ liệu thất bại!");
  }
  // Nếu dữ liệu trả về là undefined hoặc null, ném lỗi
  if (!(response.data?.code == "00")) {
    throw new Error("No data found");
  }

  return response.data?.data;
}

export async function updateCurrentUserInfo(body: userProfile) {
  console.log("body: ", body);
  const response = await axios.post(
    import.meta.env.VITE_API_URL + "/user/change-info",
    body,
    {
      headers: {
        Authorization: "Bearer " + useUserStore.getState().currentUser?.token,
      },
    }
  );

  if (response.status != 200) {
    throw new Error("Lấy dữ liệu thất bại!");
  }
  // Nếu dữ liệu trả về là undefined hoặc null, ném lỗi
  if (!(response.data?.code == "00")) {
    throw new Error("No data found");
  }

  return response.data?.data;
}

export async function updateNewPassword(body: NewPassword) {
  console.log("body: ", body);
  const response = await axios.post(
    import.meta.env.VITE_API_URL + "/user/change-password",
    body,
    {
      headers: {
        Authorization: "Bearer " + useUserStore.getState().currentUser?.token,
      },
    }
  );

  if (response.status != 200) {
    throw new Error("Lấy dữ liệu thất bại!");
  }
  // Nếu dữ liệu trả về là undefined hoặc null, ném lỗi
  if (!(response.data?.code == "00")) {
    throw new Error("No data found");
  }

  return response.data?.data;
}

export const postDataCommon = async (
  body: { [key: string]: any },
  endpoint: string
) => {
  const response = await axios.post(
    import.meta.env.VITE_API_URL + endpoint,
    body
  );
  if (response.status != 200) {
    throw new Error("Thêm dữ liệu thất bại!");
  }
  // Nếu dữ liệu trả về là undefined hoặc null, ném lỗi
  if (!(response.data?.code == "00")) {
    throw new Error("No data found");
  }
  return response.data?.data;
};

export const fetchDataCommon = async (enpoint: string) => {
  const response = await axios.get(import.meta.env.VITE_API_URL + enpoint);
  if (response.status != 200) {
    throw new Error("Failed to fetch data");
  }
  // Nếu dữ liệu trả về là undefined hoặc null, ném lỗi
  if (!(response.data?.code == "00")) {
    throw new Error("No data found");
  }
  return response.data?.data;
};

//order
export async function getUserOrders(body: { userLogin: string | null }) {
  console.log(body);
  const response = await axios.post(
    import.meta.env.VITE_API_URL + "/user/orders/all",
    body,
    {
      headers: {
        Authorization: "Bearer " + useUserStore.getState().currentUser?.token,
      },
    }
  );
  if (response.status != 200) {
    throw new Error("Lấy dữ liệu thất bại!");
  }
  // Nếu dữ liệu trả về là undefined hoặc null, ném lỗi
  if (!(response.data?.code == "00")) {
    throw new Error("No data found");
  }

  console.log("orders :", response.data?.data);
  return response.data?.data;
}

export async function orderDetails(body: { orderCode?: string }) {
  const response = await axios.post(
    import.meta.env.VITE_API_URL + "/user/orders/detail",
    body,
    {
      headers: {
        Authorization: "Bearer " + useUserStore.getState().currentUser?.token,
      },
    }
  );
  if (response.status != 200) {
    throw new Error("Lấy dữ liệu thất bại!");
  }
  // Nếu dữ liệu trả về là undefined hoặc null, ném lỗi
  if (!(response.data?.code == "00")) {
    throw new Error("No data found");
  }

  return response.data?.data;
}

//Store
export const postDataStore = async (
  body: { [key: string]: any },
  endpoint: string
) => {
  const response = await axios.post(
    import.meta.env.VITE_API_URL + endpoint,
    body,
    {
      headers: {
        Authorization: "Bearer " + useStoreStore.getState().currentStore?.token,
      },
    }
  );
  console.log(response.data);
  if (response.status != 200) {
    throw new Error("Thêm dữ liệu thất bại!");
  }
  // Nếu dữ liệu trả về là undefined hoặc null, ném lỗi
  if (!(response.data?.code == "00")) {
    throw new Error("No data found");
  }
  return response.data?.data;
};

//wish list

export async function getUserWishList(body: { userLogin?: string }) {
  const response = await axios.post(
    import.meta.env.VITE_API_URL + "/user/product/liked-all",
    body,
    {
      headers: {
        Authorization: "Bearer " + useUserStore.getState().currentUser?.token,
      },
    }
  );
  if (response.status != 200) {
    throw new Error("Lấy dữ liệu thất bại!");
  }
  // Nếu dữ liệu trả về là undefined hoặc null, ném lỗi
  if (!(response.data?.code == "00")) {
    throw new Error("No data found");
  }

  return response.data?.data;
}
