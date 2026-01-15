import React from 'react';
import { LucideIcon } from 'lucide-react';

export type Language = 'en' | 'ar';
export type Theme = 'dark' | 'light';

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export interface UserProfile {
  id: string;
  name: string; 
  email: string;
  role?: 'admin' | 'user';
  avatar?: string;
}

export interface Message {
  sender: 'user' | 'admin';
  text: string;
  date: string;
}

export interface Ticket {
  id: string;
  subject: string;
  status: 'Open' | 'Closed' | 'Answered';
  lastUpdated: string;
  messages: Message[];
}

export interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ElementType;
  min: number;
  fee: string;
  color: string;
}

export interface PaymentHistory {
  id: string;
  method: string;
  amount: number;
  date: string;
  status: 'Completed' | 'Failed' | 'Pending';
}

export interface SMMService {
  id: string;
  service: string;
  name: string; // The translated name key or raw name
  type: string;
  rate: number;
  min: number;
  max: number;
  category: string;
  source?: string;
}

export interface Order {
  id: string;
  serviceId?: string;
  serviceName: string;
  link?: string;
  quantity?: number;
  charge?: number;
  date: string;
  status: 'Completed' | 'Pending' | 'Processing';
  amount?: number;
}

export interface UserState {
  name: string;
  balance: number;
  spent: number;
  orders: Order[];
  tickets: Ticket[];
  services: SMMService[];
  // Fix: Add parenthesis to correctly define array of intersection type
  allUsers: (UserProfile & { balance: number; spent: number; orders: Order[] })[];
}

export interface UserContextType {
  state: UserState;
  dispatch: React.Dispatch<any>;
}

export interface LanguageContextType {
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
  lang: Language;
}

export interface Service {
  id: string;
  title: string;
  icon: React.ElementType; 
  color: string;
  bg: string;
  price: string;
  gradient: string;
}

export interface ServicePackage {
  id: string;
  name: string;
  price: number;
  description: string;
  deliveryTime: string;
}

export interface ServiceItem {
  id: string;
  categoryId: string;
  nameKey: string;
  rate: number;
  min: number;
  max: number;
  type: string;
}

export interface PlatformCategory {
  id: string;
  name: string;
  icon: React.ElementType; 
  color: string;
  bg: string;
  services: ServiceItem[];
}

// New Order Page Types
export interface ServiceOption {
  id: string;
  name: string;
  rate: number;
  min: number;
  max: number;
  description: string;
}

export interface CategoryOption {
  id: string;
  name: string;
  services: ServiceOption[];
}

export interface PlatformOption {
  id: string;
  name: string;
  icon: React.ElementType;
  categories: CategoryOption[];
}

export interface OrderPrefillData {
  platformId: string;
  categoryId: string;
  serviceId: string;
}