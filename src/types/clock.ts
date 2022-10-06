export type clockTypes = {
  hour: number | string;
  minute: number | string;
  second?: number | string;
  status?: boolean;
  id?: number;
  title?: string;
  repeat?: boolean[];
};

export type currentClockTypes = {
  digitalClock: boolean;
  alarm: boolean;
  timer: boolean;
  stopwatch: boolean;
  popUp: boolean;
  editAlarm: boolean;
};

export interface Timer {
  hours: number;
  minutes: number;
  seconds: number;
  interval: number;
  status?: boolean;
}

export interface Stopwatch {
  current: number;
  savedTime: number;
  status: boolean;
  isContinue: boolean;
}
