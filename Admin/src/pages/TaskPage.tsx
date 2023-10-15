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

  const navigateEditAndBack = () => {
    if (pathname === `${BrowserRoute.Task}/${id}`) {
      navigate(`${BrowserRoute.Task}/${id}` + BrowserRoute.Edit);
    } else {
      navigate(-1);
    }
  };

  return (
    <>
      <Helmet>
        <title>Задание - {data ? data.title : ""}</title>
      </Helmet>
      <Subtitle>Задание - {data?.title}</Subtitle>
      <ContainerOneSide>
        {!errorError && (
          <>
            <Button type="button" onClick={navigateEditAndBack} isPrimary>
              {pathname === `${BrowserRoute.Task}/${id}` ? textEdit : "Назад"}
            </Button>
            <Outlet context={dataTest} />
          </>
        )}
      </ContainerOneSide>
    </>
  );
}
