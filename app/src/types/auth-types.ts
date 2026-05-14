import { FormState } from "./cat-types";
export type AuthContextType = {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
};

export type LoginProps = {
  email: string;
  password: string;
};
export interface Response {
  data: {
    token: string;
  };
}
export type RegisterProps = {
  photo: string;
  form: FormState;
  setForm: (form: FormState) => void;
  onRegister: () => void;
  onCancel: () => void;
  onClose: () => void;
};

export type UserProps = {
  name: string;
  email: string;
  avatar?: string;
};
