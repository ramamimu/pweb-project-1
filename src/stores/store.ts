import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";
import type { clockTypes, currentClockTypes } from "@/types/clock";

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

  const alarm: clockTypes = reactive({
    hour: 0,
    minute: 0,
    second: 0,
    status: false,
  });

  const timer: clockTypes = reactive({
    hour: 0,
    minute: 0,
    second: 0,
    status: false,
  });

  const stopwatch: clockTypes = reactive({
    hour: 0,
    minute: 0,
    second: 0,
    status: false,
  });

  function updateTime() {
    time.value = new Date();
  }
  function startClock() {
    setInterval(updateTime, 1000);
  }

  const getHours = computed<number | string>(() => {
    let hour: number | string = time.value.getHours();
    hour < 10 && (hour = "0" + hour.toString());
    return hour;
  });

  const getMinutes = computed<number | string>(() => {
    let minute: number | string = time.value.getMinutes();
    minute < 10 && (minute = "0" + minute.toString());
    return minute;
  });

  const getSeconds = computed<number | string>(() => {
    let second: number | string = time.value.getSeconds();
    second < 10 && (second = "0" + second.toString());
    return second;
  });
  return {
    time,
    alarm,
    timer,
    stopwatch,
    getHours,
    getMinutes,
    getSeconds,
    updateTime,
    startClock,
  };
});
