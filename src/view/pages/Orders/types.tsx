export const DEFAULT_ORDER_PER_PAGE = 10

// OrderStatus enum equivalent
export type OrderStatus =
  | "PENDING"
  | "ACCEPTED"
  | "PROCESSED"
  | "SHIPPED"
  | "COMPLETED"
  | "CANCELLED"
  | "REJECTED";

// AddressType enum equivalent
export type AddressType =
  | "customer_resident_address"
  | "delivery_address";

// Coordinates model
export type Coordinates = {
  latitude: number;
  longitude: number;
};

// Address model
export type Address = {
  state?: string;
  state_id: string;
  city?: string;
  lga?: string;
  lga_id: string;
  full_address?: string;
  closest_landmark?: string;
  coordinate?: Coordinates;
  verified?: boolean;
  default_delivery_address?: boolean;
  address_type?: AddressType;
};

// ShippingInfo model
export type ShippingInfo = {
  name?: string;
  phone?: string;
  email?: string;
  address?: Address;
};

// StatusHistory model
export type StatusHistory = {
  status: OrderStatus;
  reason: string;
  status_ts: number;
};

// CartItem model
export type CartItem = {
  id: string;
  product_id: string;
  product_category: ProductCategory;
  vendor_id: string;
  weight?: number;
  quantity?: number;
  cost: number;
};

// Order model
export type Order = {
  id: string;
  orders: CartItem[];
  customer_id: string;
  order_number: string;
  delivery_details: ShippingInfo;
  payment_method: string;
  delivery_fee: number;
  service_fee: number;
  total: number;
  status_history: StatusHistory[];
  reason: string;
  status_ts: number;
  status: OrderStatus;
  ts: number;
};

// Placeholder for ProductCategory – needs actual definition
export type ProductCategory = string; // Update this as per your actual enum or structure