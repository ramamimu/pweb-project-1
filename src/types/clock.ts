export type clockTypes = {
  hour: number | string;
  minute: number | string;
  second: number | string;
  status: boolean;
};

export type currentClockTypes = {
  digitalClock: boolean;
  alarm: boolean;
  timer: boolean;
  stopwatch: boolean;
};
