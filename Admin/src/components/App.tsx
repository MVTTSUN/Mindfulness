import { Routes, Route, Navigate } from "react-router-dom";
import { BrowserRoute } from "../const";
import { TipsPage } from "../pages/TipsPage";
import { NotFoundPage } from "../pages/NotFoundPage";
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
import { HeaderWithFooterLayout } from "./HeaderWithMainLayout";
import { useEffect } from "react";
import { useLazyRefreshQuery } from "../services/api";
import { getToken } from "../services/token";
import { PrivateRoute } from "./PrivateRoute";
import { ProfilePage } from "../pages/ProfilePage";

export function App() {
  const [trigger] = useLazyRefreshQuery();

  useEffect(() => {
    if (getToken()) {
      trigger();
    }
  }, []);

  return (
    <HelmetProvider>
      <Routes>
        <Route
          path={BrowserRoute.Login}
          element={
            <PrivateRoute>
              <Auth />
            </PrivateRoute>
          }
        />
        <Route
          path={BrowserRoute.Register}
          element={
            <PrivateRoute>
              <Auth />
            </PrivateRoute>
          }
        />
        <Route
          element={
            <PrivateRoute>
              <HeaderWithFooterLayout />
            </PrivateRoute>
          }
        >
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
            <Route path={BrowserRoute.Statistic} element={<StatisticsPage />} />
            <Route path={BrowserRoute.Profile} element={<ProfilePage />} />
          </Route>
          <Route path={BrowserRoute.NotFoundPage} element={<NotFoundPage />} />
        </Route>
      </Routes>
      <Preloader />
    </HelmetProvider>
  );
}
