
export enum AccountStatus {
  Ativas = 'Ativas',
  ProntasParaPostar = 'ProntasParaPostar',
  Aquecendo = 'Aquecendo',
  Ruins = 'Ruins',
}

export interface Person {
  id: string;
  name: string;
}

export interface Account {
  id: string;
  username: string;
  status: AccountStatus;
  monetized: boolean;
  tiktokShopLinked: boolean;
  email: string;
  responsiblePersonId?: string;
  logo?: string; // Changed from photos: string[] to logo: string
}

export type MonetizationFilter = 'all' | 'yes' | 'no';