import ReactDOM from "react-dom/client";
import { App } from "./components/App.tsx";
import "normalize.css";
import { createGlobalStyle } from "styled-components";
import { Color } from "./const.ts";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { HistoryRouter } from "./components/HistoryRouter.tsx";
import { browserHistory } from "./utils/browserHistory.ts";

const GlobalStyle = createGlobalStyle`
  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  body {
    background-color: ${Color.BackgroundMain};
    color: ${Color.TextStandard};
    font-family: 'Poppins', 'Arial', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
    -moz-text-size-adjust: 100%;
  }
`;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <>
    <GlobalStyle />
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <ToastContainer
          position="bottom-center"
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <App />
      </HistoryRouter>
    </Provider>
  </>
);
