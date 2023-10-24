import { Navigate, useLocation } from "react-router-dom";
import { getToken } from "../services/token";
import { BrowserRoute } from "../const";

type PrivateRouteProps = {
  children: JSX.Element;
};

export function PrivateRoute(props: PrivateRouteProps) {
  const { children } = props;
  const isAuth = getToken();
  const { pathname, key } = useLocation();

  if (
    isAuth &&
    pathname !== BrowserRoute.Login &&
    pathname !== BrowserRoute.Register
  ) {
    return children;
  } else if (
    isAuth &&
    (pathname === BrowserRoute.Login || pathname === BrowserRoute.Register) &&
    key === "default"
  ) {
    return <Navigate to={BrowserRoute.Statistic} replace />;
  } else if (
    !isAuth &&
    pathname !== BrowserRoute.Login &&
    pathname !== BrowserRoute.Register
  ) {
    return (
      <Navigate to={BrowserRoute.Login} state={{ from: pathname }} replace />
    );
  } else {
    return children;
  }
}
