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
