import moment, {Moment} from 'moment';
import {Sample} from '../types/Shared';

export const findClosestSampleToDate = (
  samples: Sample[],
  day: Moment,
  profileVal: number,
) => {
  let value;
  let closest;
  for (let i = 0; i < samples.length; i++) {
    const sample = samples[i];
    if (
      !value ||
      moment(sample.startDate).diff(day) < moment(closest).diff(day)
    ) {
      value = sample.value;
      closest = sample.startDate;
    }
  }

  return value || profileVal;
};
