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
import { InformationPage } from "../pages/InformationPage";
import { HelmetProvider } from "react-helmet-async";
import { StatisticsPage } from "../pages/StatisticsPage";
import { Auth } from "../pages/Auth";
import { TaskPage } from "../pages/TaskPage";
import { DisplayResultTips } from "./DisplayResultTips";
import { FormTextLottieImage } from "./FormTextLottieImage";
import { DisplayResultInfo } from "./DisplayResultInfo";
import { FormInformation } from "./FormInformation";
import { DisplayResultTask } from "./DisplayResultTask";
import { Preloader } from "./Preloader";
import { DisplayResultMeditation } from "./DisplayResultMeditation";
import { MeditationPage } from "../pages/MeditationPage";
import { FormMeditation } from "./FormMeditation";

export function App() {
  return (
    <HelmetProvider>
      <Header />
      <Main>
        <CenterContainer>
          <Routes>
            <Route path={BrowserRoute.Main}>
              <Route
                index
                element={<Navigate to={BrowserRoute.Statistic} replace />}
              />
              <Route path={BrowserRoute.Tip} element={<TipsPage />}>
                <Route index element={<DisplayResultTips />} />
                <Route
                  path={BrowserRoute.Tip + BrowserRoute.Edit}
                  element={<FormTextLottieImage />}
                />
              </Route>
              <Route path={BrowserRoute.Task}>
                <Route index element={<TasksPage />} />
                <Route path=":id" element={<TaskPage />}>
                  <Route index element={<DisplayResultTask />} />
                  <Route
                    path={BrowserRoute.Task + "/:id" + BrowserRoute.Edit}
                    element={<FormTextLottieImage />}
                  />
                </Route>
              </Route>
              <Route path={BrowserRoute.Meditation}>
                <Route index element={<MeditationsPage />} />
                <Route path=":id" element={<MeditationPage />}>
                  <Route index element={<DisplayResultMeditation />} />
                  <Route
                    path={BrowserRoute.Meditation + "/:id" + BrowserRoute.Edit}
                    element={<FormMeditation />}
                  />
                </Route>
              </Route>
              <Route path={BrowserRoute.Emotion} element={<EmotionsPage />} />
              <Route
                path={BrowserRoute.Information}
                element={<InformationPage />}
              >
                <Route index element={<DisplayResultInfo />} />
                <Route
                  path={BrowserRoute.Information + BrowserRoute.Edit}
                  element={<FormInformation />}
                />
              </Route>
              <Route
                path={BrowserRoute.Statistic}
                element={<StatisticsPage />}
              />
              <Route path={BrowserRoute.Login} element={<Auth />} />
              <Route path={BrowserRoute.Register} element={<Auth />} />
              <Route path={BrowserRoute.Setting} element={<Auth />} />
            </Route>
            <Route
              path={BrowserRoute.NotFoundPage}
              element={<NotFoundPage />}
            />
          </Routes>
        </CenterContainer>
      </Main>
      <Preloader />
    </HelmetProvider>
  );
}

const Main = styled.main`
  margin-bottom: 120px;
  padding-top: 100px;
`;
