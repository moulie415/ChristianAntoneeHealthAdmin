import {
  Level,
  PlanWorkout,
  QuickRoutine,
  Targets,
  WeeklyItems,
} from '../types/Shared';
import {capitalizeFirstLetter} from './capitalizeFirstLetter';

interface GenericWorkout {
  level: Level;
}

export const contributesToScore = <Type extends GenericWorkout>(
  workout: Type,
  goalLevel?: Level,
) => {
  if (!goalLevel || goalLevel === Level.BEGINNER) {
    return true;
  }
  if (goalLevel) {
    if (goalLevel === Level.INTERMEDIATE) {
      return (
        workout.level === Level.INTERMEDIATE || workout.level === Level.ADVANCED
      );
    }
    if (goalLevel === Level.ADVANCED) {
      return workout.level === Level.ADVANCED;
    }
  }
  return false;
};

export const getGoalsData = (
  weeklyItems: WeeklyItems,
  quickRoutinesObj: {[key: string]: QuickRoutine},
  goalData?: Targets,
) => {
  const workoutGoal = goalData?.workouts.number || 0;
  const minsGoal = goalData?.mins || 0;
  const workoutLevelTitleString = capitalizeFirstLetter(
    goalData?.workouts.level || '',
  );
  const caloriesGoal = goalData?.calories || 0;

  const savedWorkouts = weeklyItems?.workouts
    ? Object.values(weeklyItems.workouts)
    : [];

  const savedQuickRoutines = weeklyItems?.quickRoutines
    ? Object.values(weeklyItems.quickRoutines)
    : [];

  const quickRoutines =
    savedQuickRoutines &&
    savedQuickRoutines
      .map(({quickRoutineId}) => {
        return quickRoutinesObj[quickRoutineId];
      })
      .filter(x => x);

  const planWorkouts: PlanWorkout[] = [];

  savedWorkouts.forEach(w => {
    if (w.planWorkout) {
      planWorkouts.push(w.planWorkout);
    }
  });

  const workoutLevelScore =
    (quickRoutines
      ? quickRoutines?.filter(routine =>
          contributesToScore(routine, goalData?.workouts.level),
        ).length
      : 0) +
    planWorkouts.filter(workout =>
      contributesToScore(workout, goalData?.workouts.level),
    ).length;

  const mins = Math.round(
    [...savedWorkouts, ...savedQuickRoutines].reduce((acc, cur) => {
      return acc + cur.seconds / 60;
    }, 0),
  );

  const calories = [...savedWorkouts, ...savedQuickRoutines].reduce(
    (acc, cur) => {
      return acc + (cur.calories || 0);
    },
    0,
  );
  const completed =
    calories >= caloriesGoal &&
    mins >= minsGoal &&
    workoutLevelScore >= workoutGoal;
  return {
    calories,
    mins,
    workoutLevelScore,
    workoutGoal,
    minsGoal,
    workoutLevelTitleString,
    caloriesGoal,
    workoutLevel: goalData?.workouts.level,
    completed,
  };
};
