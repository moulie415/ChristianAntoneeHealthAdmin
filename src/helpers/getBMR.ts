import moment from 'moment';
import {Gender, Sample} from '../types/Shared';
import {findClosestSampleToDate} from './findSampleClosestToDate';

export const getBMR = (gender: Gender, w: number, h: number, age: number) => {
  if (gender === 'male') {
    return 10 * w + 6.25 * h - 5 * age + 5;
  }
  return 10 * w + 6.25 * h - 5 * age - 161;
};

export const getBMRItems = (
  weightSamples: Sample[],
  heightSamples: Sample[],
  weight?: number,
  height?: number,
  gender?: Gender,
  dob?: string,
): Sample[] => {
  if (!height || !weight || !dob || !gender) {
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

    const day = moment(sample.startDate);

    const age = day.diff(dob, 'years');

    const bmr = useWeightSamples
      ? getBMR(gender, sample.value, otherSample, age)
      : getBMR(gender, otherSample, sample.value, age);

    return {
      startDate: sample.startDate,
      endDate: sample.endDate,
      value: bmr,
    };
  });
};
