export interface User {
  id: string;
  name: string;
  points: number;
  redeemHistory: RedeemHistory[];
  createDate: string;
}

export interface RedeemHistory {
  productId: string;
  name: string;
  cost: 200;
  category: string;
  _id: string;
  createDate: string;
}

export interface Products {
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
