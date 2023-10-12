import { Routes, Route, Navigate } from "react-router-dom";
import { BrowserRoute } from "../const";
import { TipsPage } from "../pages/TipsPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import styled from "styled-components";
import { Header } from "./Header";
import { CenterContainer } from "./CenterContainer";
import { TasksPage } from "../pages/TasksPage";
import { MeditationsPage } from "../pages/MeditationsPage";
import { EmotionsPage } from "../pages/EmotionsPage";
import { InformationPage } from "../pages/Information";
import { Player } from "./Player";
import { useAppSelector } from "../hooks/useAppSelector";
import { getAudioSrc, getIsPause } from "../store/currentAudioSelectors";
import { useEffect, useState } from "react";
import { HelmetProvider } from "react-helmet-async";

export function App() {
  const isPause = useAppSelector(getIsPause);
  const srcAudio = useAppSelector(getAudioSrc);
  const [isFirstPlayAudio, setIsFirstPlayAudio] = useState(false);

  useEffect(() => {
    if (!isPause) {
      setIsFirstPlayAudio(true);
    }
  }, [isPause]);

  return (
    <HelmetProvider>
      <Header />
      <Main>
        <CenterContainer>
          <Routes>
            <Route path={BrowserRoute.Main}>
              <Route
                index
                element={<Navigate to={BrowserRoute.Meditation} replace />}
              />
              <Route path={BrowserRoute.Tip} element={<TipsPage />} />
              <Route path={BrowserRoute.Task} element={<TasksPage />} />
              <Route
                path={BrowserRoute.Meditation}
                element={<MeditationsPage />}
              />
              <Route path={BrowserRoute.Emotion} element={<EmotionsPage />} />
              <Route
                path={BrowserRoute.Information}
                element={<InformationPage />}
              />
            </Route>
            <Route
              path={BrowserRoute.NotFoundPage}
              element={<NotFoundPage />}
            />
          </Routes>
        </CenterContainer>
      </Main>
      {isFirstPlayAudio && srcAudio !== "" && <Player />}
    </HelmetProvider>
  );
}

const Main = styled.main`
  margin-bottom: 120px;
`;
