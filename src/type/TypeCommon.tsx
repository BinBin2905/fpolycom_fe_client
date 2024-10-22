export type MenuItemObject = {
  [key: string]: any;
};

export type BreadcrumbItemObject = {
  [key: string]: any;
};

export type LoginObject = {
  APP_CODE: string;
  USERLGIN: string;
  PASSWORD: string;
  LGINTYPE: string;
  SYSTCHAR: string;
  INPTCHAR: string;
  PHONNAME: string;
  TKENDEVC: string;
};

export type LoginLocationObject = {
  COMPCODE: string;
  LCTNCODE: string;
};

export type LctnCodeObject = {
  LCTNCODE: string;
  LCTNNAME: string;
};

export type CompcodeObject = {
  COMPCODE: string;
  COMPNAME: string;
  IMGELIST: string[];
  LCTNLIST: LctnCodeObject[];
};

export type ProductObject = {
  productCode: number | undefined | null;
  name: string | undefined | null;
  image: string | undefined | null;
  status: string | undefined | null;
  typeGoodName: string | undefined | null;
  typeGoodCode: string | undefined | null;
  numberOfLikes: number | undefined | null;
  numberOfEvaluates: number | undefined | null;
  provinceCode: number | undefined | null;
  provinceName: string | undefined | null;
  pointEvaluate: number | undefined | null;
  minPrice: number | undefined | null;
  maxPrice: number | undefined | null;
};

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export type CommonObject = {
  [key: string]: any;
};

export type SearchObjectProduct = {
  key: string;
  name: string;
  type?: "text" | "combobox";
  dataList?: CommonObject[];
  dataKey?: keyof CommonObject;
  dataName?: keyof CommonObject;
};

export type CategoryObject = {
  ITEMATTR: string;
  ITEMCODE: string;
  ITEMNAME: string;
  ITEMODER: string;
  ITEMSRCH: string;
  ITEMTREE: string;
  ITEM_KEY: string;
  KEY_CODE: string;
  LISTCODE: string;
};

export type DataExcelPatternObject = {
  header: string;
  id: string;
  type: "list" | "single";
  dataKey?: string;
  dataName?: string;
  dataDemo?: string | number;
  data?: any[];
};

export type DataExcelObject = {
  header: string;
  id: string;
};

export type AdvertisementObject = {
  COMPCODE: string;
  LCTNCODE: string;
  BANRCODE: string;
  BANRNAME: string;
  BANRTYPE: string;
  OBJCTYPE: string;
  OBJCCODE: string;
  BANR_RUN: number;
  DDDD: string;
  ACCERGHT: number;
  STTESIGN: number;
  STTENAME: string;
  KKKK0000: string;
  DCMNFILE: { [key: string]: any }[];
};

export type AdvertisementUpdateObject = {
  KKKK0000: string;
  COMPCODE: string;
  LCTNCODE: string;
  BANRCODE: string;
  BANRNAME: string;
  BANRTYPE: string;
  OBJCCODE: string;
  OBJCTYPE: string;
  BANR_RUN: number;
  IMAGE_BANR: string;
};

export type ProvinceObject = {
  name: string;
  provinceCode: string;
  numberOfDistricts: number;
};

export type SectionStyle = {
  className?: string;
  sectionTitle?: string;
  seeMoreUrl?: string;
  categoryTitle: string | null;
  products?: Product[];
  type?: any;
  brands?: any[];
  categoryBackground: string | null;
  showProducts?: number;
};

export type SanPhamChiTiet = {
  id: string;
  tenSPCT: string;
  gia: string;
  hinhAnh: string;
  motaOption: string;
  soLuong: string;
  binhLuan: {}[];
  hoaDonChiTiet: string;
};

export type SanPham = {
  id: string;
  createDate?: string;
  deleted: string | null;
  deletedDate: string | null;
  updatedDate: string | null;
  hinhAnh: string;
  moTa: string;
  motaOption: string;
  tenSanPham: string;
  cuaHangID: string;
  loaiHang: string;
  trangThaiID: string;
  danhGia: string;
  SanPhamChiTiet: SanPhamChiTiet[];
};

export type ReplyComments = {
  id: number;
  name: string;
  comments: string;
  author?: string;
};

export type Comments = {
  id: number;
  author: string;
  comments: string;
  review: number;
  replys?: ReplyComments[];
};

export type Product = {
  id: string;
  image: string;
  brand: string;
  review: number;
  title: string;
  offer_price: string;
  price: string;
  campaingn_product: boolean;
  cam_product_available: number | null;
  cam_product_sale: number | null;
  product_type: string | null;
};

export type RegisterObject = {
  userLogin?: string | null | undefined;
  password?: string | null | undefined;
  name?: string | null | undefined;
  phone?: string | null | undefined;
  addressDetail?: string | null | undefined;
  address?: string | null | undefined;
  email?: string | null | undefined;
  dateOfBirth?: string | null | undefined;
  gender?: boolean | null | undefined;
  provinceCode?: string | null | undefined;
  wardCode?: string | null | undefined;
  districtCode?: string | null | undefined;
};
export type userProfile = {
  userLogin: string;
  name: string;
  phone: string;
  email: string;
  addressDetail: string | "";
  address: string | "";
  image:
    | string
    | "https://cdn-media.sforum.vn/storage/app/media/THANHAN/2/2a/avatar-dep-89.jpg";
  bannerImage: string | "";
  dateOfBirth: string | "1999-01-01";
  gender: boolean | true;
  provinceCode: number | 1;
  districtCode: number | 1;
  wardCode: number | 1;
  provinceName: string | "";
  districtName: string | "";
  wardName: string | "";
};

export type NewPassword = {
  userLogin: string;
  passwordCurrent: string;
  passwordNew: string;
};

export type OrderProps = {
  orderCode: string | "1";
  storeName: string | "Cuawr hang thu cng";
  storeImage: string | null;
  orderStatus: string | "complete";
  pickupDate: string | "2024-10-18";
  deliveryDate: string | "2024-10-18";
  totalAmount: number | 60000.0;
  paymentTypeName: string | "Thanh toasn viet qr";
  totalAmountVoucher: number | 30000.0;
  totalAmountShip: number | 80000.0;
  finalTotal: number | 50000.0;
  deliveryType: string | "Ship hang sieu toc";
  paymentSuccess: boolean | false;
};

export type OrderDetailList = {
  totalAmount: number | 100000.0;
  totalDiscount: number | 10000.0;
  finalTotal: number | 9000000.0;
  quantity: number | 10;
  productDetailCode: number | 1;
  discountCode: number | 1;
};
export type OrderDetailsProps = {
  orderCode: string | "1";
  userLogin: string | null;
  totalAmount: number | 60000.0;
  totalAmountVoucher: number | 30000.0;
  totalAmountShip: number | 80000.0;
  finalTotal: number | 50000.0;
  orderBillCode: string | null;
  noteContent: string | "Content";
  addressDetail: string | "35 Trai Dai Nghiax kp noi hoa 2 ";
  address: string | "35 Tran dai nghia";
  shippingFeeCode: number | 1;
  storeCode: number | 1;
  provinceCode: number | null;
  districtCode: number | null;
  wardCode: number | null;
  deliveryTypeCode: number | 1;
  paymentTypeCode: number | 1;
  paymentSuccess: boolean | false;
  orderDetailList: OrderDetailList[] | null;
};

export type CartObject = {
  checked: boolean;
  productDetailCode: number;
  productName: string;
  discountCode: number;
  productCode: number;
  image: string;
  percentDecrease: number;
  provinceCode: string;
  detailName: string;
  price: number;
  quantity: number;
  storeName: string;
  storeCode: number;
};

export type OrderDetailObject = {
  totalAmount: number;
  totalDiscount: number;
  checked: boolean;
  finalTotal: number;
  quantity: number;
  productDetailCode: number;
  discountCode: number;
  percentDecrease: number;
  image: string;
  productName: string;
  productDetailName: string;
  price: number;
};

export type VoucherObject = {
  voucherCode: 1;
};

export type OrderObject = {
  userLogin?: string;
  totalAmount?: number;
  totalAmountVoucher?: number;
  totalAmountShip?: number;
  totalAmountDiscount?: number;
  provinceStoreCode?: string;
  finalTotal?: number;
  orderBillCode?: string;
  noteContent?: string;
  addressDetail?: string;
  address?: string;
  shippingFeeCode?: number;
  storeCode?: number;
  storeName?: string;
  paymentTypeCode?: number;
  provinceCode?: number;
  districtCode?: number;
  wardCode?: number;
  deliveryTypeCode?: number;
  orderDetailList: OrderDetailObject[];
  voucherList: VoucherObject[];
};

export type ProductDetailCreateObject = {
  productDetailCode: number | undefined | null;
  name: string | undefined | null;
  price: number | undefined | null;
  image: string | undefined | null;
  quantity: number | undefined | null;
  newImage?: File | null;
  discountCode: number | undefined | null;
};

export type ProductAttrObject = {
  attrValue: string | undefined | null;
  typeGoodAttrCode: number | undefined | null;
  productAttrCode: number | undefined | null;
  typeGoodAttrName?: string | undefined | null;
};

export type ProductCreateObject = {
  productCode: number | undefined | null;
  name: string | undefined | null;
  description: string | undefined | null;
  shortDescription: string | undefined | null;
  image: string | undefined | null;
  newImage: File | null;
  typeGoodCode: number | undefined | null;
  storeCode: number | undefined | null;
  productDetailList: ProductDetailCreateObject[] | [];
  productAttrList: ProductAttrObject[] | [];
};
