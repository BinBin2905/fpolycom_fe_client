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
};

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export type SearchObjectProduct = {
  key: string;
  name: string;
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
