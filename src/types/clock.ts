export type clockTypes = {
  hour: number | string;
  minute: number | string;
  second?: number | string;
  status?: boolean;
};

export type currentClockTypes = {
  digitalClock: boolean;
  alarm: boolean;
  timer: boolean;
  stopwatch: boolean;
};

export interface Timer {
  hours: number;
  minutes: number;
  timerEnd: number;
  status?: boolean;
}

export interface Stopwatch {
  current: number;
  savedTime: number;
  status: boolean;
}
