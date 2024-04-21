import moment from 'moment';
import {Sample} from '../types/Shared';
import {findClosestSampleToDate} from './findSampleClosestToDate';

export const getBMI = (h: number, w: number) => {
  const val = w / Math.pow(h / 100, 2);
  // convert to one decimal place
  return Math.round(val * 10) / 10;
};

export const getBMIItems = (
  weightSamples: Sample[],
  heightSamples: Sample[],
  weight?: number,
  height?: number,
): Sample[] => {
  if (!height || !weight) {
    return [];
  }

  const useWeightSamples = weightSamples.length > heightSamples.length;
  const samples = useWeightSamples ? weightSamples : heightSamples;

  return samples.map(sample => {
    const otherSample = findClosestSampleToDate(
      useWeightSamples ? heightSamples : weightSamples,
      moment(sample.startDate),
      useWeightSamples ? height : weight,
    );
    const bmi = useWeightSamples
      ? getBMI(otherSample, sample.value)
      : getBMI(sample.value, otherSample);
    return {
      startDate: sample.startDate,
      endDate: sample.endDate,
      value: bmi,
    };
  });
};
