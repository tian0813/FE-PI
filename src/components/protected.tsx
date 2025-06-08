import { ReactNode, useEffect, useState } from "react";
import { LS_TOKEN, ROUTES } from "../utils/constants";
import { Navigate } from "react-router-dom";
import { useAuthorize } from "../services/auth/mutations/use-authorize";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const authorizeMuatation = useAuthorize()

  useEffect(() => {
    const token = localStorage.getItem(LS_TOKEN)
    if (!token) {
      setIsAuthenticated(false)
      return
    }

    authorizeMuatation.mutate(
      undefined,
      {
        onSuccess: (data) => {
          console.log(data)
          if (data.success) {
            setIsAuthenticated(true)
          } else {
            localStorage.removeItem(LS_TOKEN)
            setIsAuthenticated(false)
          }
        },
        onError: () => {
          localStorage.removeItem(LS_TOKEN)
          setIsAuthenticated(false)
        }
      }
    )
  }, [])

  if (isAuthenticated === null) {
    return <p>Loading...</p>
  }

  return isAuthenticated ? <>{children} </> : <Navigate to={ROUTES.LOGIN} replace />
};

export default ProtectedRoute;
