export type AuthRegisterType = {
  email: string;
  user_name: string;
  full_name: string;
  password: string;
  os?: string;
  device_type?: string;
  device_name?: string;
  ip_address?: string;
  browser?: string;
};

export type AuthLoginType = {
  user_name: string;
  password: string;
};
