import { isFulfilled, isRejectedWithValue } from "@reduxjs/toolkit";
import type { Middleware } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    toast.error(action.payload.data.message, { autoClose: 2000 });
  } else if (isFulfilled(action)) {
    if (action.meta.arg.endpointName === "addTips") {
      toast.success("Данные успешно отправлены!", { autoClose: 1000 });
    }
  }

  return next(action);
};
