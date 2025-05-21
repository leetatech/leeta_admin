// Enums
export enum BusinessRegistrationStatus {
  PendingConfirmation = "PENDING_CONFIRMATION",
  RegistrationApproved = "REGISTRATION_APPROVED",
  RegistrationRejected = "REGISTRATION_REJECTED",
}

export interface Email {
  address: string;
  verified: boolean;
}
export type Phone = string;

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export type UserStatus = string; // Replace with a proper enum if needed

export enum AddressType {
  Home = "HOME",
  Work = "WORK",
  Other = "OTHER",
}

// Address interface
export interface Address {
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
}

// TimeStamps interface
export interface TimeStamps {
  status_ts: number;
  ts: number;
}

// User interface
export interface User {
  id?: string;
  first_name?: string;
  last_name?: string;
  email?: Email;
  addresses?: Address[];
  phone?: Phone;
  dob?: string;
  has_pin?: boolean;
  pin_blocked?: boolean;
  is_blocked?: boolean;
  is_blocked_reason?: string;
  status?: UserStatus;
  business_registration_status?: BusinessRegistrationStatus;
  location?: Coordinates;
  device_id?: string;
}

// Vendor interface
export interface Vendor extends User, TimeStamps {
  admin_id: string;
}

export interface ApiResponse<T = any> {
  data: T;
  error_reference?: string;
}
