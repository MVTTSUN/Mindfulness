import { Button } from "../components/Button";
import { ContainerOneSide } from "../components/ContainerOneSide";
import { Subtitle } from "../components/Subtitle";
import { useGetTipsQuery } from "../services/api";
import { Helmet } from "react-helmet-async";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { BrowserRoute } from "../const";

export function TipsPage() {
  const { data, error } = useGetTipsQuery();
  const textEdit = data && data[0]?.data.length ? "Редактировать" : "Добавить";
  const errorError = error && "error" in error ? error.error : "";
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const navigateEditAndBack = () => {
    if (pathname === BrowserRoute.Tip) {
      navigate(BrowserRoute.Tip + BrowserRoute.Edit);
    } else {
      navigate(-1);
    }
  };

  return (
    <>
      <Helmet>
        <title>Советы - Mindfulness</title>
      </Helmet>
      <Subtitle>Советы</Subtitle>
      <ContainerOneSide>
        {!errorError && (
          <>
            <Button type="button" onClick={navigateEditAndBack} isPrimary>
              {pathname === BrowserRoute.Tip ? textEdit : "Назад"}
            </Button>
            <Outlet context={data} />
          </>
        )}
      </ContainerOneSide>
    </>
  );
}
