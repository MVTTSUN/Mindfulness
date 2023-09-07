import { App } from "./App";
import { Provider } from "react-redux";
import store, { persistor } from "./store/store";
import { registerRootComponent } from "expo";
import { PersistGate } from "redux-persist/integration/react";
import TrackPlayer from "react-native-track-player";

const RNRedux = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};

registerRootComponent(RNRedux);
TrackPlayer.registerPlaybackService(() => require("./service"));
