export const STAGES = {
  DEV: 'dev',
  PROD: 'prod',
  TEST: 'test'
} as const;

export type Stage = (typeof STAGES)[keyof typeof STAGES];

export const STAGE_VALUES = Object.values(STAGES);
