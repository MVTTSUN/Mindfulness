import { SliceName } from '../const';
import { RootState } from '../types';

const getValueTheme = (state: Pick<RootState, SliceName.Theme>) => state[SliceName.Theme].value;
const getIdRadioButtonTheme = (state: Pick<RootState, SliceName.Theme>) => state[SliceName.Theme].idRadioButton;

export { getValueTheme, getIdRadioButtonTheme };