export interface LoginFormInterface {
  email: string;
  password: string;
}

export interface AuthUserInterface {
  ok: boolean;
  uid: string;
  name: string;
  token: string;
}

export interface ErrorAuthInterface {
  ok: boolean;
  msg: string;
}

export interface AuthStateContextInterface {
  status: "checking" | "authenticated" | "no-authenticated";
  doLogin: () => void;
  doLogout: () => void;
  doCheking: () => void;
}

