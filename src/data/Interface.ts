export interface ProductDataType {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

export interface User {
  email: string;
  password: string;
}

export interface AuthReturnObjType {
  success: boolean;
  error?: string;
}

export interface CartItemType {
  id: number;
  quantity: number;
}

export interface CheckoutItemType extends CartItemType {
  product: ProductDataType;
}
