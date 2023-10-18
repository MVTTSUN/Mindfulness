import { useGetTaskQuery } from "../services/api";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Subtitle } from "../components/Subtitle";
import { ContainerOneSide } from "../components/ContainerOneSide";
import { Button } from "../components/Button";
import { BrowserRoute } from "../const";

export function TaskPage() {
  const { id } = useParams() as { id: string };
  const { data, error } = useGetTaskQuery(id);
  const textEdit = data && data?.data.length ? "Редактировать" : "Добавить";
  const errorError = error && "error" in error ? error.error : "";
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dataTest = [data];

  const navigateBack = () => navigate(-1);

  const navigateEdit = () =>
    navigate(`${BrowserRoute.Task}/${id}` + BrowserRoute.Edit);

  return (
    <>
      <Helmet>
        <title>Задание - {data ? data.title : ""}</title>
      </Helmet>
      <Subtitle>Задание - {data?.title}</Subtitle>
      <ContainerOneSide>
        {!errorError && (
          <>
            <Button type="button" onClick={navigateBack} isPrimary>
              Назад
            </Button>
            {pathname === `${BrowserRoute.Task}/${id}` && (
              <Button type="button" onClick={navigateEdit} isPrimary>
                {textEdit}
              </Button>
            )}
            <Outlet context={dataTest} />
          </>
        )}
      </ContainerOneSide>
    </>
  );
}
