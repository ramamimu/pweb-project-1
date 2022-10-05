<script setup lang="ts">
import { useTimer, useAlarm, useLogicUI, useClock } from "@/stores/store";

const TIMER_STATE = useTimer();
const ALARM_STATE = useAlarm();
const LOGIC_UI_STATE = useLogicUI();
const CLOCK_STATE = useClock();
</script>
<template>
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
        <h5
          class="mb-2 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white"
          v-if="ALARM_STATE.isAlarmActive"
        >
          Alarm( {{ CLOCK_STATE.getHours }} : {{ CLOCK_STATE.getMinutes }} )
          <br />
          event: {{ LOGIC_UI_STATE.popUpAlarmTitle }}
          <br />
        </h5>
      </div>
      <button
        @click="
          LOGIC_UI_STATE.clock.popUp = false;
          TIMER_STATE.stopTimer();
          ALARM_STATE.isAlarmActive = false;
        "
        class="flex h-14 w-14 items-center justify-center rounded-full bg-white pb-3 text-5xl font-bold"
      >
        x
      </button>
    </div>
  </div>
</template>
