import { Helmet } from "react-helmet-async";
import { Subtitle } from "../components/Subtitle";

export function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>Страница не найдена - Mindfulness</title>
      </Helmet>
      <Subtitle>Not Found 404</Subtitle>
    </>
  );
}
