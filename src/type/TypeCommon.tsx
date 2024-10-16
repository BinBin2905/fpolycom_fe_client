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
  ACCERGHT: number;
  COMPCODE: string;
  CURRCODE: string;
  CUSTCODE: string;
  CUSTNAME: string;
  DDDD: string;
  DSCNAMNT: number;
  DSCNRATE: number;
  EXCHQTTY: number;
  JSTFDATE: string;
  KKKK0000: string;
  PRCEDSCN: number;
  PRCESALE: number;
  PRDCBRIF: number;
  PRDCCODE: number;
  PRDCDESC: string;
  PRDCIMGE: string;
  PRDCNAME: string;
  QUOMCODE: number;
  QUOMNAME: string;
  SHOPCODE: string;
  SHOPNAME: string;
  STTEICON: number;
  STTENAME: string;
  STTESIGN: number;
  [key: string]: any;
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
  categoryTitle?: string;
  products?: Product[];
  type?: any;
  brands?: any[];
  categoryBackground?: string;
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
