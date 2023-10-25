import { useEffect } from "react";
import { AUTH_TOKEN_NAME, BrowserRoute } from "../const";
import { useNavigate } from "react-router-dom";

const useNavigateAllTabs = () => {
  const navigate = useNavigate();

  const handleInvalidToken = (evt: StorageEvent) => {
    if (evt.key === AUTH_TOKEN_NAME && evt.oldValue && !evt.newValue) {
      navigate(BrowserRoute.Login);
    }

    if (evt.key === AUTH_TOKEN_NAME && !evt.oldValue && evt.newValue) {
      navigate(BrowserRoute.Statistic);
    }
  };

  useEffect(() => {
    window.addEventListener("storage", handleInvalidToken);

    return () => window.removeEventListener("storage", handleInvalidToken);
  }, []);
};

export { useNavigateAllTabs };
