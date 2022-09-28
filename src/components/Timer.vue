<script setup lang="ts">
import { useTimer, useAudio, useLogicUI } from "@/stores/store";
import { watch } from "vue";

const props = defineProps({
  isShow: {
    type: Boolean,
    required: true,
  },
});

const TIMER_STATE = useTimer();
const AUDIO_STATE = useAudio();
const LOGIC_UI_STATE = useLogicUI();

watch(TIMER_STATE.timer, (newVal) => {
  let now = new Date().getTime();
  let distance = TIMER_STATE.msTimer;

  if (now > distance && TIMER_STATE.timer.status) {
    AUDIO_STATE.startAudio();
    LOGIC_UI_STATE.clock.popUp = true;
  }
});
</script>
<template>
  <div v-show="props.isShow">
    <div class="flex items-center justify-center gap-2">
      <div class="w-16">
        <input
          type="number"
          min="0"
          max="23"
          class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="0"
          required
          v-model="TIMER_STATE.timer.hours"
          :readonly="TIMER_STATE.timer.status"
        />
      </div>
      <p>:</p>
      <div class="w-16">
        <input
          type="number"
          min="0"
          max="59"
          placeholder="0"
          class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          v-model="TIMER_STATE.timer.minutes"
          :readonly="TIMER_STATE.timer.status"
        />
      </div>
      <p>:</p>
      <div class="w-16">
        <input
          type="number"
          min="0"
          max="59"
          placeholder="0"
          class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          v-model="TIMER_STATE.timer.seconds"
          :readonly="TIMER_STATE.timer.status"
        />
      </div>
    </div>
    <button
      @click="TIMER_STATE.startTimer"
      class="mx-auto my-4 block rounded-xl bg-green-500 px-5 py-3 font-bold text-white hover:bg-green-600"
      v-if="!TIMER_STATE.timer.status"
    >
      Start
    </button>
    <button
      @click="TIMER_STATE.stopTimer"
      class="mx-auto my-4 block rounded-xl bg-red-500 px-5 py-3 font-bold text-white"
      v-if="TIMER_STATE.timer.status"
    >
      Stop
    </button>
  </div>
</template>
