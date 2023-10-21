import { Helmet } from "react-helmet-async";
import { Subtitle } from "../components/Subtitle";
import { ContainerOneSide } from "../components/ContainerOneSide";
import { useGetInfoQuery } from "../services/api";
import { Button } from "../components/Button";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { BrowserRoute } from "../const";

export function InformationPage() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { data, error } = useGetInfoQuery();
  const textEdit = data ? "Редактировать" : "Добавить";
  const errorError = error && "error" in error ? error.error : "";

  const navigateEditAndBack = () => {
    if (pathname === BrowserRoute.Information) {
      navigate(BrowserRoute.Information + BrowserRoute.Edit);
    } else {
      navigate(-1);
    }
  };

  return (
    <>
      <Helmet>
        <title>Информация - Mindfulness</title>
      </Helmet>
      <Subtitle>Информация</Subtitle>
      <ContainerOneSide>
        {!errorError && (
          <>
            <Button type="button" onClick={navigateEditAndBack} isPrimary>
              {pathname === BrowserRoute.Information ? textEdit : "Назад"}
            </Button>
            <Outlet context={data && data[0]} />
          </>
        )}
      </ContainerOneSide>
    </>
  );
}
