import { Helmet } from "react-helmet-async";
import { Subtitle } from "../components/Subtitle";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import { ContainerOneSide } from "../components/ContainerOneSide";

export function NotFoundPage() {
  const navigate = useNavigate();

  const navigateBack = () => navigate(-1);

  return (
    <>
      <Helmet>
        <title>Страница не найдена - Mindfulness</title>
      </Helmet>
      <Subtitle>Not Found 404</Subtitle>
      <ContainerOneSide>
        <Button type="button" onClick={navigateBack} isPrimary>
          Назад
        </Button>
      </ContainerOneSide>
    </>
  );
}
