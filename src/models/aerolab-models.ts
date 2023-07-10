export interface User {
  id: string;
  name: string;
  points: number;
  redeemHistory: RedeemHistory[];
}

interface RedeemHistory {
  productId: string;
  name: string;
  cost: 200;
  category: string;
  _id: string;
  createDate: string;
}

export interface ProductItem {
  _id: string;
  name: string;
  cost: number;
  category: string;
  img: Image;
}

interface Image {
  url: string;
  hdUrl: string;
}

export interface Config {
  endpoint: string;
  method?: string;
  body?: string;
}
