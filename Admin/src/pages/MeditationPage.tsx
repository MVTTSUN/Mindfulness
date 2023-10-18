import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useGetMeditationQuery } from "../services/api";
import { BrowserRoute } from "../const";
import { Helmet } from "react-helmet-async";
import { Subtitle } from "../components/Subtitle";
import { ContainerOneSide } from "../components/ContainerOneSide";
import { Button } from "../components/Button";
import { memo } from "react";

export const MeditationPage = memo(() => {
  const { id } = useParams() as { id: string };
  const { data, error } = useGetMeditationQuery(id);
  const textEdit = data ? "Редактировать" : "Добавить";
  const errorError = error && "error" in error ? error.error : "";
  const navigate = useNavigate();
  const { pathname } = useLocation();
  console.log(1);

  const navigateBack = () => navigate(-1);

  const navigateEdit = () =>
    navigate(`${BrowserRoute.Meditation}/${id}` + BrowserRoute.Edit);

  return (
    <>
      <Helmet>
        <title>Медитация - {data ? data.title : ""}</title>
      </Helmet>
      <Subtitle>Медитация - {data?.title}</Subtitle>
      <ContainerOneSide>
        {!errorError && (
          <>
            <Button type="button" onClick={navigateBack} isPrimary>
              Назад
            </Button>
            {pathname === `${BrowserRoute.Meditation}/${id}` && (
              <Button type="button" onClick={navigateEdit} isPrimary>
                {textEdit}
              </Button>
            )}
            <Outlet context={data} />
          </>
        )}
      </ContainerOneSide>
    </>
  );
});
