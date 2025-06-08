export type SignUpDTO = {
  name: string;
  email: string;
  password: string;
};

export type SignInDTO = {
  email: string;
  password: string;
};

export type Response<T = undefined> = {
  success: boolean;
  message: string;
  data?: T;
};
