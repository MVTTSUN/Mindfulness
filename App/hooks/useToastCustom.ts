import { useToast } from 'react-native-toast-notifications'
import { normalize } from '../utils';
import { Color } from '../const';

export const useToastCustom = () => {
  const toast = useToast();

  const onSuccessToast = (message: string) => {
    toast.show(message, {
      type: "success",
      textStyle: {
        fontFamily: "Poppins-Regular",
        fontSize: normalize(14),
        color: Color.TextStandard,
      },
    })
  };

  const onErrorToast = (message: string) => {
    toast.show(message, {
      type: "warning",
      textStyle: {
        fontFamily: "Poppins-Regular",
        fontSize: normalize(14),
        color: Color.TextWhite,
      },
    })
  };

  return {
    onSuccessToast,
    onErrorToast
  };
}