<script setup lang="ts">
import {
  useTimer,
  useAlarm,
  useLogicUI,
  useClock,
  useToast,
} from "@/stores/store";

const TIMER_STATE = useTimer();
const ALARM_STATE = useAlarm();
const LOGIC_UI_STATE = useLogicUI();
const CLOCK_STATE = useClock();
const TOAST_STATE = useToast();

function setSnooze() {
  let snoozeMinute = 10;
  LOGIC_UI_STATE.clock.popUp = false;
  TIMER_STATE.stopTimer();
  ALARM_STATE.isAlarmActive = false;

  let distanceSnooze = new Date();
  // set snooze 10 minutes
  distanceSnooze.setTime(distanceSnooze.getTime() + snoozeMinute * 60 * 1000);

  console.log(distanceSnooze.getHours(), ":", distanceSnooze.getMinutes());

  TOAST_STATE.showToast(`Snooze for ${snoozeMinute} minutes`, true);
  ALARM_STATE.setSnooze(distanceSnooze.getHours(), distanceSnooze.getMinutes());
}
</script>
<template>
  <div
    v-if="LOGIC_UI_STATE.clock.popUp"
    class="fixed top-0 z-50 flex h-screen w-full items-center justify-center bg-black bg-opacity-50"
  >
    <div
      class="flex h-80 w-80 max-w-sm flex-col items-center justify-center gap-10 rounded-lg border border-gray-700 bg-gray-800 p-6 shadow-md"
    >
      <div>
        <h5
          class="mb-2 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
          v-if="TIMER_STATE.timer.status"
        >
          Timer( {{ TIMER_STATE.saveTimer.hour }} :
          {{ TIMER_STATE.saveTimer.minute }} :
          {{ TIMER_STATE.saveTimer.second }} )
        </h5>
        <hr />
        <h5
          class="mb-2 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
          v-if="ALARM_STATE.isAlarmActive"
        >
          Alarm( {{ CLOCK_STATE.getHours }} : {{ CLOCK_STATE.getMinutes }} )
          <br />
          event: {{ LOGIC_UI_STATE.popUpAlarmTitle }}
          <br />
          <div
            class="mt-2 cursor-pointer rounded-md bg-slate-700 pb-2 text-white hover:bg-slate-900"
            @click="setSnooze()"
          >
            snozee
          </div>
        </h5>
      </div>
      <button
        @click="
          LOGIC_UI_STATE.clock.popUp = false;
          TIMER_STATE.stopTimer();
          ALARM_STATE.isAlarmActive = false;
          ALARM_STATE.snooze.status = false;
        "
        class="flex h-14 w-14 items-center justify-center rounded-full bg-white pb-3 text-5xl font-bold"
      >
        x
      </button>
    </div>
  </div>
</template>
