import { SliceName } from '../const';
import { RootState } from '../types';

const getIsConcentration = (state: Pick<RootState, SliceName.Concentration>) => state[SliceName.Concentration].isConcentration;

export { getIsConcentration };