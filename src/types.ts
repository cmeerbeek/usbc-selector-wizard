export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  rating: number;
  imageUrl: string;
  sellers: {
    name: string;
    url: string;
    price: string;
  }[];
}

export interface DeviceOption {
  id: string;
  name: string;
  models: {
    id: string;
    name: string;
  }[];
}

export interface PeripheralOption {
  id: string;
  name: string;
  description: string;
  icon: string;
}