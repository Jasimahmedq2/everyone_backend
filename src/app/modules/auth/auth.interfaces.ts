export type IUser = {
  name: string;
  email: string;
  password: string;
  role: string;
  is_verified: boolean;
  phone_no: string;
  image: string;
  birthday: string;
  login_with: string;
};

export type ILogin = {
  email: string;
  password: string;
};

export type ILoginResponse = {
  is_verified: boolean;
  userId: string;
  email: string;
  role: string;
  token: string;
};
