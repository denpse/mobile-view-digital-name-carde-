import { IUser } from "./user-type";

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
  is_deleted: boolean;
  updated_at: string;
  created_at: string;
}

export type CardType = "Minimal" | "Modern" | "Corporate";
export type GenderType = "male" | "female";
export interface CardItem {
  user: IUser;
  id: string;
  gender: GenderType;
  dob: string;
  address: string;
  phone: string;
  nationality: string;
  qr_url?: string;
  qr_code?: string;
  card_type?: CardType;
  is_active: boolean;
  is_deleted: boolean;
  theme_color?: string;
  updated_at: string;
  created_at: string;
  socialLinks: SocialLink[];
  job: string;
  bio: string;
  web_site: string;
  company: string;
}
