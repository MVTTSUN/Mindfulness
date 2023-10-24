import { isFulfilled, isRejectedWithValue } from "@reduxjs/toolkit";
import type { Middleware } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const rtkQueryErrorLogger: Middleware =
  () => (next) => async (action) => {
    if (isRejectedWithValue(action)) {
      if (action.meta.arg.endpointName !== "logout") {
        if (action?.payload?.error) {
          toast.error("Не удалось связаться с сервером", { autoClose: 3000 });
        } else if (action?.payload?.data?.validation?.body?.message) {
          toast.error(action?.payload?.data?.validation?.body?.message, {
            autoClose: 3000,
          });
        } else {
          toast.error(action?.payload?.data?.message, { autoClose: 3000 });
        }
      }
    } else if (isFulfilled(action)) {
      if (
        action.meta.arg.endpointName === "addTips" ||
        action.meta.arg.endpointName === "addEmotions" ||
        action.meta.arg.endpointName === "addInfo" ||
        action.meta.arg.endpointName === "addTask" ||
        action.meta.arg.endpointName === "updateTask" ||
        action.meta.arg.endpointName === "addMeditation" ||
        action.meta.arg.endpointName === "updateMeditation" ||
        action.meta.arg.endpointName === "updateUser"
      ) {
        toast.success("Данные успешно отправлены!", { autoClose: 1000 });
      }
    }

    return next(action);
  };
