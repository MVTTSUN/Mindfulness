import { isRejectedWithValue } from "@reduxjs/toolkit";
import type { Middleware } from "@reduxjs/toolkit";
import { Toast } from 'react-native-toast-notifications'
import { normalize } from '../utils';
import { Color, ErrorMessage } from '../const';

export const rtkQueryErrorLogger: Middleware =
  () => (next) => async (action) => {
    if (isRejectedWithValue(action)) {
      if (action?.payload?.error) {
        Toast.show(
          ErrorMessage.NoConnect,
          {
            type: "warning",
            textStyle: {
              fontFamily: "Poppins-Regular",
              fontSize: normalize(14),
              color: Color.TextWhite,
            },
        });
      } else {
        Toast.show(
          action?.payload?.data?.message,
          {
            type: "warning",
            textStyle: {
              fontFamily: "Poppins-Regular",
              fontSize: normalize(14),
              color: Color.TextWhite,
            },
        });
      }
    }

    return next(action);
  };