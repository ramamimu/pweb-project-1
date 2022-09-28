<script setup lang="ts">
import { useStopwatch } from "@/stores/store";

const props = defineProps({
  isShow: {
    type: Boolean,
    required: true,
  },
});

function getFormatMiliseconds(miliseconds: number) {
  return miliseconds < 10 ? `0${miliseconds}` : miliseconds;
}

function getFormatSecond(second: number): string {
  return second < 10 ? `0${second}` : `${second}`;
}

function getFormatMinute(minute: number): string {
  return minute < 10 ? `0${minute}` : `${minute}`;
}

function getFormatHour(hour: number): string {
  return hour < 10 ? `0${hour}` : `${hour}`;
}

const STOPWATCH_STATE = useStopwatch();
</script>

<template>
  <div v-show="props.isShow" class="grid h-full w-full grid-cols-3">
    <div class="col-span-2 flex flex-col items-center justify-center">
      <div class="flex items-center justify-center gap-2">
        <div class="rounded-xl border bg-white px-6 py-2">
          <p>{{ STOPWATCH_STATE.getHours }}</p>
        </div>
        <div class="rounded-xl border bg-white px-6 py-2">
          <p>{{ STOPWATCH_STATE.getMinutes }}</p>
        </div>
        <div class="rounded-xl border bg-white px-6 py-2">
          <p>{{ STOPWATCH_STATE.getSeconds }}</p>
        </div>
        <div class="rounded-xl border bg-white px-6 py-2">
          <p>{{ STOPWATCH_STATE.getMiliseconds }}</p>
        </div>
      </div>
      <div class="mt-10" v-show="!STOPWATCH_STATE.stopwatch.status">
        <button
          class="mx-auto block rounded-xl bg-green-500 px-5 py-3 font-bold text-white"
          @click="STOPWATCH_STATE.startStopwatch"
        >
          Start
        </button>
      </div>
      <div
        class="mt-10 flex gap-2"
        v-show="STOPWATCH_STATE.stopwatch.isContinue"
      >
        <button
          @click="STOPWATCH_STATE.continueStopwatch"
          class="mx-auto block rounded-xl bg-green-500 px-5 py-3 font-bold text-white"
        >
          Continue
        </button>
        <button
          class="rounded-xl bg-red-500 px-5 py-3 font-bold text-white"
          @click="STOPWATCH_STATE.resetStopwatch"
        >
          Reset
        </button>
      </div>
      <div
        class="mt-10 flex justify-center gap-5"
        v-show="
          STOPWATCH_STATE.stopwatch.status &&
          !STOPWATCH_STATE.stopwatch.isContinue
        "
      >
        <button
          class="rounded-xl bg-slate-600 px-5 py-3 font-bold text-white"
          @click="STOPWATCH_STATE.stopStopwatch"
        >
          Stop
        </button>
        <button
          class="rounded-xl bg-blue-500 px-5 py-3 font-bold text-white"
          @click="STOPWATCH_STATE.saveTime"
        >
          Save
        </button>
      </div>
    </div>
    <div class="col-span-1 h-full overflow-y-scroll border-l">
      <div
        class="flex justify-center py-1"
        v-for="time in STOPWATCH_STATE.savedTimes"
        :key="time"
      >
        <p>{{ getFormatHour(Math.floor(time / (60 * 60 * 1000))) }}</p>
        :
        <p>{{ getFormatMinute(Math.floor(time / (60 * 1000))) }}</p>
        :
        <p>{{ getFormatSecond(Math.floor((time / 1000) % 60)) }}</p>
        <p class="text-xs">
          {{ getFormatMiliseconds(Math.floor((time % 1000) / 10)) }}
        </p>
      </div>
    </div>
  </div>
</template>
