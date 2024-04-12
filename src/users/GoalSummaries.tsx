import {
  Box,
  CircularProgress,
  CircularProgressProps,
  Grid,
  Typography,
} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {useGetList, useRecordContext} from 'react-admin';
import * as api from '../helpers/api';
import {getGoalsData} from '../helpers/goals';
import {Profile, QuickRoutine} from '../types/Shared';

interface GoalSet {
  title: string;
  key: string;
  goal: number;
  score: number;
}

function CircularProgressWithLabel(
  props: CircularProgressProps & {value: number; score: number; goal: number},
) {
  return (
    <Box sx={{position: 'relative', display: 'inline-flex'}}>
      <CircularProgress
        variant="determinate"
        {...props}
        value={(100 / props.goal) * props.score}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Typography variant="caption" component="div" color="text.secondary">
          {Math.round(props.score)}
        </Typography>
      </Box>
    </Box>
  );
}

const GoalCircle: React.FC<{
  title: string;
  goal: number;
  score: number;
}> = ({title, goal, score}) => {
  return (
    <Grid item xs={12} md={4} style={{textAlign: 'center'}}>
      <Typography>{title}</Typography>
      <CircularProgressWithLabel goal={goal} score={score} />
    </Grid>
  );
};

const GoalSummaries: React.FC = () => {
  const profile = useRecordContext<Profile>();
  const [loadingWeeklyItems, setLoading] = useState(false);

  const [weeklyItems, setWeeklyItems] = useState({
    quickRoutines: {},
    tests: {},
    workouts: {},
  });

  const {data, isLoading} = useGetList<QuickRoutine>('quickRoutines', {
    pagination: {perPage: 500, page: 1},
  });

  const loading = loadingWeeklyItems || isLoading;

  useEffect(() => {
    const getWeeklyItems = async () => {
      setLoading(true);
      const items = await api.getWeeklyItems(profile.uid);
      setWeeklyItems(items);
      setLoading(false);
    };

    if (profile.uid) {
      getWeeklyItems();
    }
  }, [profile.uid]);

  const quickRoutinesObj =
    data &&
    data.reduce((acc: {[id: string]: QuickRoutine}, cur) => {
      acc[cur.id] = {
        ...cur,
        id: cur.id,
      };
      return acc;
    }, {});

  if (loading || !quickRoutinesObj) {
    return (
      <div style={{marginTop: 20, display: 'flex', justifyContent: 'center'}}>
        <CircularProgress />
      </div>
    );
  }

  const {
    calories,
    mins,
    workoutLevelScore,
    caloriesGoal,
    workoutGoal,
    minsGoal,
    workoutLevelTitleString,
  } = getGoalsData(weeklyItems, quickRoutinesObj, profile.targets);

  const goals: GoalSet[] = [
    {
      title: 'Active minutes',
      key: 'mins',
      goal: minsGoal,
      score: mins,
    },
    {
      title: `${workoutLevelTitleString} workouts`,
      key: 'workoutLevel',

      score: workoutLevelScore,
      goal: workoutGoal,
    },
    {
      title: 'Calories burned',
      key: 'calories',
      goal: caloriesGoal,
      score: Math.round(calories),
    },
  ];

  return (
    <div style={{marginTop: 20}}>
      <Typography variant="h6" gutterBottom>
        Weekly Targets
      </Typography>
      <Grid container>
        {profile.targets &&
          goals.map(({goal, score, title, key}) => {
            return (
              <GoalCircle title={title} key={key} goal={goal} score={score} />
            );
          })}
      </Grid>
    </div>
  );
};

export default GoalSummaries;
