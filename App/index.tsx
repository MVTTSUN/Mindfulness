import { App } from "./App";
import { Provider } from "react-redux";
import store, { persistor } from "./store/store";
import { registerRootComponent } from "expo";
import { PersistGate } from "redux-persist/integration/react";
import TrackPlayer from "react-native-track-player";
import { PlaybackService } from "./services";
import { Text } from "react-native";
import { TextWithDefaultProps } from "./types";

const RNRedux = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};

(Text as unknown as TextWithDefaultProps).defaultProps = {
  ...((Text as unknown as TextWithDefaultProps).defaultProps || {}),
  allowFontScaling: false,
};
registerRootComponent(RNRedux);
TrackPlayer.registerPlaybackService(() => PlaybackService);
