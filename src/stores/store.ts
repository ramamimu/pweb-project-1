import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";
import type {
  clockTypes,
  currentClockTypes,
  Stopwatch,
  Timer,
} from "@/types/clock";
import type { Ref } from "vue";

const hourToMS = (hour: number) => hour * 60 * 60 * 1000;

const minuteToMS = (min: number) => min * 60 * 1000;

const getHour = (hour: number | string): number | string => {
  hour < 10 && (hour = "0" + hour.toString());
  return hour;
};

const getMinute = (minute: number | string): number | string => {
  minute < 10 && (minute = "0" + minute.toString());
  return minute;
};

const getSecond = (second: number | string): number | string => {
  second < 10 && (second = "0" + second.toString());
  return second;
};

const getMilisecond = (milisecond: number | string): number | string => {
  if (milisecond < 10) milisecond = "00" + milisecond.toString();
  else if (milisecond < 100) milisecond = "0" + milisecond.toString();
  else if (milisecond < 1000) milisecond = "" + milisecond.toString();
  return milisecond;
};

export const useCounterStore = defineStore("counter", () => {
  const count = ref(0);
  const doubleCount = computed(() => count.value * 2);
  function increment() {
    count.value++;
  }

  return { count, doubleCount, increment };
});

export const useLogicUI = defineStore("logicUI", () => {
  const clock: currentClockTypes = reactive({
    digitalClock: true,
    alarm: false,
    timer: false,
    stopwatch: false,
  });

  function changeView(currentState: string) {
    if (currentState === "digitalClock") {
      clock.digitalClock = true;
      clock.alarm = false;
      clock.timer = false;
      clock.stopwatch = false;
    } else if (currentState === "alarm") {
      clock.digitalClock = false;
      clock.alarm = true;
      clock.timer = false;
      clock.stopwatch = false;
    } else if (currentState === "timer") {
      clock.digitalClock = false;
      clock.alarm = false;
      clock.timer = true;
      clock.stopwatch = false;
    } else if (currentState === "stopwatch") {
      clock.digitalClock = false;
      clock.alarm = false;
      clock.timer = false;
      clock.stopwatch = true;
    }
  }
  return { clock, changeView };
});

export const useClock = defineStore("clock", () => {
  const time = ref(new Date());
  function updateTime() {
    time.value = new Date();
  }
  function startClock() {
    setInterval(updateTime, 1000);
  }

  const getHours = computed<number | string>(() => {
    return getHour(time.value.getHours());
  });

  const getMinutes = computed<number | string>(() => {
    return getMinute(time.value.getMinutes());
  });

  const getSeconds = computed<number | string>(() => {
    return getSecond(time.value.getSeconds());
  });
  return {
    time,
    getHours,
    getMinutes,
    getSeconds,
    updateTime,
    startClock,
  };
});

export const useAlarm = defineStore("alarm", () => {
  const alarm: Ref<clockTypes[]> = ref([]);

  function setAlarm(hour: number | string, minute: number | string) {
    let temp_alarm: clockTypes = {
      hour: hour,
      minute: minute,
    };

    const LEN_ALARM = alarm.value.length;
    let flag = false;
    for (let i = 0; i < LEN_ALARM; i++) {
      if (alarm.value[i].hour === hour && alarm.value[i].minute === minute) {
        flag = true;
      }
    }
    if (!flag) alarm.value.push(temp_alarm);
  }

  return { alarm, setAlarm };
});

export const useTimer = defineStore("timer", () => {
  const timer: Timer = reactive({
    hours: 0,
    minutes: 1,
    timerEnd: 0,
    status: false,
  });

  const setTimer = () => {
    timer.status = !timer.status;
    timer.timerEnd =
      Date.now() + hourToMS(timer.hours) + minuteToMS(timer.minutes);
    console.log(timer.timerEnd);
  };

  return { timer, setTimer };
});

export const useStopwatch = defineStore("stopwatch", () => {
  const stopwatch: Stopwatch = reactive({
    current: 0,
    savedTime: 0,
    status: false,
  });

  const savedTimes: Ref<number[]> = ref([]);
  let interval: number = 0;

  function updateStopwatch() {
    stopwatch.current = new Date().getTime() - stopwatch.savedTime;
  }

  function startStopwatch() {
    if (!stopwatch.status) {
      stopwatch.savedTime = new Date().getTime();
      stopwatch.status = true;
      savedTimes.value = [];
      interval = setInterval(updateStopwatch, 100);
    }
  }

  function stopStopwatch() {
    if (stopwatch.status) {
      clearInterval(interval);
      stopwatch.status = false;
      stopwatch.current = 0;
    }
  }

  function saveTime() {
    savedTimes.value.push(stopwatch.current);
  }

  const getHours = computed<number | string>(() => {
    return getHour(Math.floor(stopwatch.current / 1000 / 60 / 60));
  });

  const getMinutes = computed<number | string>(() => {
    return getMinute(Math.floor((stopwatch.current / 1000 / 60) % 60));
  });

  const getSeconds = computed<number | string>(() => {
    return getSecond(Math.floor((stopwatch.current / 1000) % 60));
  });

  const getMiliseconds = computed<number | string>(() => {
    return getMilisecond(Math.floor((stopwatch.current / 10) % 100));
  });

  return {
    stopwatch,
    startStopwatch,
    getHours,
    getMinutes,
    getSeconds,
    getMiliseconds,
    stopStopwatch,
    saveTime,
    savedTimes,
  };
});
