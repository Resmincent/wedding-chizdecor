import type { JSX } from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: JSX.Element;
}

export default function AuthGuard({ children }: Props) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
}
