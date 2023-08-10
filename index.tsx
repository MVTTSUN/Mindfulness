import App from "./App";
import { Provider } from "react-redux";
import store, { persistor } from "./store/store";
import { registerRootComponent } from "expo";
import { PersistGate } from "redux-persist/integration/react";
import TrackPlayer, {
  AppKilledPlaybackBehavior,
} from "react-native-track-player";
import { useEffect } from "react";
import { MEDITATIONS_DATA } from "./const";

const RNRedux = () => {
  const setup = async () => {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      android: {
        appKilledPlaybackBehavior: AppKilledPlaybackBehavior.ContinuePlayback,
      },
    });
    await TrackPlayer.add(MEDITATIONS_DATA);
  };
  useEffect(() => {
    setup();
  }, []);

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
