<script setup lang="ts">
import DigitalClock from "@/components/DigitalClock.vue";
import Alarm from "@/components/Alarm.vue";
import Timer from "@/components/Timer.vue";
import Stopwatch from "@/components/Stopwatch.vue";

import {
  useClock,
  useLogicUI,
  useTimer,
  useAlarm,
  useAudio,
} from "@/stores/store";
import { onMounted } from "vue";

const CLOCK_STATE = useClock();
const LOGIC_UI_STATE = useLogicUI();
const TIMER_STATE = useTimer();
const ALARM_STATE = useAlarm();
const AUDIO_STATE = useAudio();

interface ClockButtons {
  alarm: string;
  timer: string;
  stopwatch: string;
}

const clockButtons: ClockButtons = {
  alarm: "alarm",
  timer: "timer",
  stopwatch: "stopwatch",
};

onMounted(() => {
  CLOCK_STATE.startClock();
});
</script>

<template>
  <div class="h-screen bg-slate-50">
    <div
      v-if="LOGIC_UI_STATE.clock.popUp"
      class="fixed top-0 z-40 flex h-screen w-full items-center justify-center bg-black bg-opacity-50"
    >
      <div
        class="flex h-80 w-80 max-w-sm flex-col items-center justify-center gap-10 rounded-lg border border-gray-700 bg-gray-800 p-6 shadow-md"
      >
        <div>
          <h5
            class="mb-2 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white"
            v-if="TIMER_STATE.timer.status"
          >
            Timer( {{ TIMER_STATE.saveTimer.hour }} :
            {{ TIMER_STATE.saveTimer.minute }} :
            {{ TIMER_STATE.saveTimer.second }} )
          </h5>
        </div>
        <button
          @click="
            LOGIC_UI_STATE.clock.popUp = false;
            TIMER_STATE.stopTimer();
          "
          class="flex h-14 w-14 items-center justify-center rounded-full bg-white pb-3 text-5xl font-bold"
        >
          x
        </button>
      </div>
    </div>
    <div
      class="container mx-auto flex h-full flex-col items-center justify-center"
    >
      <h2 class="p-5 text-3xl font-extrabold text-slate-600">Clock APP</h2>
      <div
        class="w-[600px] rounded-3xl bg-white p-2 shadow-md transition-shadow duration-500 hover:shadow-2xl"
      >
        <div class="flex w-full items-center justify-between gap-2 p-2 pl-5">
          <ul class="flex gap-10">
            <li
              v-for="clockButton in clockButtons"
              :key="clockButton"
              class="m-2 cursor-pointer rounded-xl border bg-white px-4 py-1 text-sm text-slate-600 shadow-sm transition-all duration-150 hover:translate-x-[1px] hover:translate-y-[-0.5px] hover:shadow-md active:translate-x-[1px] active:translate-y-[2px]"
              @click="LOGIC_UI_STATE.changeView(clockButton)"
            >
              {{ clockButton }}
            </li>
          </ul>
          <div
            :class="{
              'mr-10 cursor-pointer rounded-md p-2 text-sm font-semibold text-slate-600 shadow-inner transition-opacity duration-300 hover:shadow-xl': true,
              'opacity-0': LOGIC_UI_STATE.clock.digitalClock,
            }"
            @click="LOGIC_UI_STATE.changeView('digitalClock')"
          >
            {{
              `${CLOCK_STATE.getHours}:${CLOCK_STATE.getMinutes}:${CLOCK_STATE.getSeconds}`
            }}
          </div>
        </div>
        <div
          class="flex h-72 w-full flex-col items-center justify-center rounded-b-3xl bg-slate-50 shadow-inner"
        >
          <DigitalClock :isShow="LOGIC_UI_STATE.clock.digitalClock" />
          <Alarm :isShow="LOGIC_UI_STATE.clock.alarm" />
          <Stopwatch :isShow="LOGIC_UI_STATE.clock.stopwatch" />
          <Timer :isShow="LOGIC_UI_STATE.clock.timer" />
        </div>
      </div>
    </div>
  </div>
</template>
