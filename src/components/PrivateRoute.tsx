import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useUserContext } from "./UserContext";

interface PrivateRouteProps {
  children: ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { user } = useUserContext();

  if (!user) {
    // Se non loggato → redirect
    return <Navigate to="/login" replace />;
  }

  // Se loggato → renderizza la pagina protetta
  return <>{children}</>;
}