import React from "react";
import { AuthContextType } from "../types/auth-types";
export const AuthContext = React.createContext<AuthContextType>(
  {} as AuthContextType,
);
