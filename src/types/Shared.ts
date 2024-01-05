import {Timestamp} from 'firebase/firestore';

export type Gender = 'male' | 'female';

export type Unit = 'metric' | 'imperial';

export type StressLevel = 'low' | 'medium' | 'high';

export enum SleepPattern {
  FIVE = 1,
  FIVE_SIX = 2,
  SEVEN_EIGHT = 3,
  EIGHT = 4,
}

export enum TrainingAvailability {
  ONE_TWO = 1,
  TWO_THREE = 2,
  THREE_FOUR = 3,
  FOUR_PLUS = 4,
}

export enum Level {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
}

export enum Goal {
  STRENGTH = 'strength',
  WEIGHT_LOSS = 'weightLoss',
  ACTIVE = 'active',
}

export enum WarmUp {
  CIRCULATORY = 'circulatory',
  SOFT_TISSUE = 'softTissue',
  DYNAMIC_STRETCHING = 'dynamicStretching',
}

export enum CoolDown {
  CIRCULATORY = 'circulatory',
  STATIC_STRETCHING = 'staticStretching',
}

export enum FlexibilityArea {
  SHOULDERS = 'shoulders',
  HIPS = 'hips',
  SPINE = 'spine',
}

export interface Sample {
  startDate: string;
  endDate: string;
  value: number;
}

export interface StepSample {
  date: string;
  value: number;
}

export interface ExerciseEvent {
  value: number;
  time: Date;
}

export interface PauseEvent {
  paused: boolean;
  time: Date;
}

export enum EquipmentItem {
  NONE = 'none',
  BARBELLS = 'barbells',
  DUMBBELLS = 'dumbbells',
  BENCHES = 'benches',
  CABLE_MACHINES = 'cableMachines',
  KETTLEBELLS = 'kettlebells',
  PULL_UP_BAR = 'pullUpBar',
  SQUAT_RACK = 'squatRack',
  EXERCISE_BALL = 'exerciseBall',
  BOSU_BALL = 'bosuBall',
  AGILITY_LADDER = 'agilityLadder',
  PLYOMETRIC_BOX = 'plyometricBox',
  TRX_SUSPENSION_TRAINER = 'trxSuspensionTrainer',
  MEDICINE_BALLS = 'medicineBalls',
  LANDMINE = 'landmine',
  EXERCISE_STEP = 'exerciseStep',
}

export interface PlanExercise {
  exercise: string;
  sets: string;
  reps: string;
  duration: string;
  resistanceScale: string;
  restTime: string;
  additionalNotes: string;
  time?: number;
}

export interface PlanWorkout {
  name: string;
  steps?: string[];
  dates: string[];
  exercises: PlanExercise[];
  today?: boolean;
  level: Level;
}

export interface PlanNutrition {
  preWorkout: string;
  postWorkout: string;
  general: string;
}

export interface PlanSleep {
  general: string;
}

export interface Plan {
  id: string;
  user: string;
  workouts: PlanWorkout[];
  nutrition: PlanNutrition;
  sleep: PlanSleep;
  tests: string[];
  education: string[];
  createdate: Timestamp;
}

export interface CalendarType {
  /** Unique calendar ID. */
  id: string;
  /** The calendar’s title. */
  title: string;
  /** The calendar’s type. */
  type: string;
  /** The source object representing the account to which this calendar belongs. */
  source: string;
  /** Indicates if the calendar is assigned as primary. */
  isPrimary: boolean;
  /** Indicates if the calendar allows events to be written, edited or removed. */
  allowsModifications: boolean;
  /** The color assigned to the calendar represented as a hex value. */
  color: string;
  /** The event availability settings supported by the calendar. */
  allowedAvailabilities: string[];
}

export interface SavedWorkout {
  id?: string;
  workout: string[];
  calories?: number;
  seconds: number;
  difficulty: number;
  createdate: Date;
  saved?: boolean;
  planWorkout?: PlanWorkout;
  averageHeartRate: number;
  heartRateSamples: Sample[];
  exerciseEvents: ExerciseEvent[];
  pauseEvents: PauseEvent[];
  startTime: Date;
  endTime: Date;
  fitbitData: ActivitiesHeart[];
  planId: string;
}

export interface SavedTest {
  id?: string;
  createdate: Date;
  seconds?: number;
  result: number;
  testId: string;
  saved?: boolean;
}

export interface SavedQuickRoutine {
  id?: string;
  calories: number;
  seconds: number;
  difficulty: number;
  createdate: Date;
  quickRoutineId: string;
  saved?: boolean;
  averageHeartRate: number;
  heartRateSamples: Sample[];
  exerciseEvents: ExerciseEvent[];
  pauseEvents: PauseEvent[];
  startTime: Date;
  endTime: Date;
  fitbitData: ActivitiesHeart[];
}

export interface Message {
  _id: string;
  text: string;
  createdAt: Date | number;
  user: {
    _id: string;
    name?: string;
    avatar?: string;
  };
  image?: string;
  video?: string;
  audio?: string;
  system?: boolean;
  sent?: boolean;
  received?: boolean;
  pending?: boolean;
  type: 'text' | 'workout';
}

export interface Profile {
  email: string;
  uid: string;
  name?: string;
  avatar?: string;
  gender?: Gender;
  weight?: number;
  height?: number;
  goal?: Goal;
  unit?: Unit;
  marketing?: boolean;
  dob?: string;
  signedUp?: boolean;
  admin?: boolean;
  premium?: boolean;
  unread?: {[key: string]: number};
  sleepPattern?: SleepPattern;
  stressLevel?: StressLevel;
  equipment?: string;
  trainingAvailability?: TrainingAvailability;
  viewedPlan?: boolean;
}

export interface FitbitHeartRateResponse {
  'activities-heart': ActivitiesHeart[];
}

export interface ActivitiesHeart {
  dateTime: string;
  value: Value;
}

export interface Value {
  customHeartRateZones: CustomHeartRateZone[];
  heartRateZones: HeartRateZone[];
  restingHeartRate: number;
}

export interface CustomHeartRateZone {
  caloriesOut: number;
  max: number;
  min: number;
  minutes: number;
  name: string;
}

export interface HeartRateZone {
  caloriesOut: number;
  max: number;
  min: number;
  minutes: number;
  name: string;
}

export interface Thumbnail {
  src: string;
  title: string;
}

export interface Video {
  src: string;
  title: string;
}
export interface Exercise {
  id?: string;
  name: string;
  description: string;
  level?: Level;
  type?: Goal;
  area?: Area;
  flexibilityArea?: FlexibilityArea;
  equipment?: EquipmentItem[];
  muscles?: Muscle[];
  musclesSecondary?: Muscle[];
  warmUp?: WarmUp;
  coolDown?: CoolDown;
  live?: boolean;
  premium?: boolean;
  reps?: string;
  sets?: string;
  resistance?: string;
  thumbnail?: Thumbnail;
  video?: Video;
  resistanceScale?: string;
  duration?: string;
  notes?: string;
  weight?: string;
  time?: number;
}

export type Muscle =
  | 'chest'
  | 'upperBack'
  | 'midBack'
  | 'lowBack'
  | 'shoulders'
  | 'biceps'
  | 'triceps'
  | 'abdominals'
  | 'obliques'
  | 'leg'
  | 'gluteals'
  | 'hamstrings'
  | 'quadriceps'
  | 'calves'
  | 'hipFlexors'
  | 'iliotibialBand'
  | 'rotatorCuff'
  | 'innerThigh'
  | 'all'
  | 'upperBody'
  | 'arms';

export type Area = 'upper' | 'lower' | 'full';
export type Equipment = 'full' | 'minimal' | 'none';

export interface QuickRoutine {
  id: string;
  name: string;
  area: Area;
  duration: number;
  equipment: Equipment;
  level: Level;
  premium: boolean;
  exerciseIds: string[];
  thumbnail?: {src: string; title: string};
  instructions?: string;
  steps?: string[];
  preview?: {src: string; title: string};
}

export interface Test {
  id: string;
  name: string;
  type: 'countdown' | 'countup' | 'untimed';
  time?: number;
  summary?: string;
  metric?: string;
  mens?: Table | PercentileTable;
  womens?: Table | PercentileTable;
  premium?: boolean;
  source?: string;
  disabled?: boolean;
  thumbnail: {src: string; title: string};
  video?: {src: string; title: string};
  formula?: 'vo2';
}

export interface Table {
  age: Row;
  excellent?: Row;
  good?: Row;
  aboveAverage?: Row;
  average?: Row;
  belowAverage?: Row;
  poor?: Row;
  veryPoor?: Row;
}

export interface Row {
  col1?: Cell;
  col2?: Cell;
  col3?: Cell;
  col4?: Cell;
  col5?: Cell;
  col6?: Cell;
}

export interface Cell {
  higher?: string;
  lower?: string;
}

export interface PercentileTable {
  '10th': string;
  '20th': string;
  '30th': string;
  '40th': string;
  '50th': string;
  '60th': string;
  '70th': string;
  '80th': string;
  '90th': string;
}

export interface Education {
  id: string;
  title: string;
  body: string;
  premium: boolean;
  category: Category;
  image: {
    src: string;
    title: string;
  };
  createdate: Date;
}

export enum Category {
  GENERAL = 'general',
  NUTRITIONAL = 'nutritional',
  EXERCISE = 'exercise',
}

export interface Chat {
  id: string;
  users: string[];
  createdate: Date;
}
