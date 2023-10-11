import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./components/App.tsx";
import { BrowserRouter } from "react-router-dom";
import "normalize.css";
import { createGlobalStyle } from "styled-components";
import { Color } from "./const.ts";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";

const GlobalStyle = createGlobalStyle`
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
  <React.StrictMode>
    <GlobalStyle />
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
