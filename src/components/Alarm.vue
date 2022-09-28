<script setup lang="ts">
import { reactive, watch } from "vue";
import { useAlarm, useClock, useAudio, useLogicUI } from "@/stores/store";
import type { clockTypes } from "@/types/clock";

const props = defineProps({
  isShow: {
    type: Boolean,
    required: true,
  },
});

const ALARM_STATE = useAlarm();
const CLOCK_STATE = useClock();
const AUDIO_STATE = useAudio();
const LOGIC_UI_STATE = useLogicUI();

const currentAlarm: {
  hours: number;
  minutes: number;
} = reactive({
  hours: 0,
  minutes: 0,
});

function addAlarm(e: any) {
  e.preventDefault();

  if (
    currentAlarm.hours > 23 ||
    currentAlarm.hours < 0 ||
    currentAlarm.minutes > 59 ||
    currentAlarm.minutes < 0
  ) {
    alert("Invalid input");
  } else {
    ALARM_STATE.setAlarm(
      new Date().getTime(),
      currentAlarm.hours,
      currentAlarm.minutes
    );
    currentAlarm.hours = 0;
    currentAlarm.minutes = 0;
  }
}

function selectAlarm(event: any, time: clockTypes) {
  time.status = event.target.checked;
}

function deleteAlarm(index: number) {
  ALARM_STATE.deleteAlarm(index);
}

watch(CLOCK_STATE, async () => {
  let hour = CLOCK_STATE.getHours;
  let minute = CLOCK_STATE.getMinutes;

  ALARM_STATE.alarm.forEach(async (item) => {
    if (item.hour === hour && item.minute == minute && item.status) {
      AUDIO_STATE.startAudio();
      item.status = false;
      ALARM_STATE.isAlarmActive = true;
      LOGIC_UI_STATE.clock.popUp = true;

      setTimeout(() => {
        item.status = true;
        ALARM_STATE.isAlarmActive = false;
        LOGIC_UI_STATE.clock.popUp = false;
        AUDIO_STATE.stopAudio();
      }, 60000);
    }
  });
});
</script>

<template>
  <div v-show="props.isShow" class="grid h-full w-full grid-cols-5">
    <div class="col-span-2 rounded-bl-3xl shadow-inner">
      <div class="flex items-center justify-center gap-2 pt-20">
        <div class="w-16">
          <input
            type="number"
            min="0"
            max="23"
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="0"
            v-model="currentAlarm.hours"
            required
          />
        </div>
        <p>:</p>
        <div class="w-16">
          <input
            type="number"
            min="0"
            max="59"
            placeholder="0"
            v-model="currentAlarm.minutes"
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          />
        </div>
      </div>
      <div class="flex items-center justify-center">
        <button
          class="mt-5 flex items-center justify-center rounded-full bg-slate-100 py-3 px-5 text-3xl font-bold text-blue-900 shadow-md active:bg-slate-200"
          @click="addAlarm"
        >
          <p class="items-center justify-center pb-1">+</p>
        </button>
      </div>
    </div>
    <div
      class="col-span-3 flex w-full flex-col items-center overflow-y-scroll rounded-br-3xl border-l-2"
    >
      <div
        class="flex w-48 items-center justify-center"
        v-for="(time, index) in ALARM_STATE.alarm"
        :key="`${time.hour}${time.minute}`"
      >
        <div class="w-52 p-5">
          <p class="text-center text-base">
            {{ time.hour < 10 ? `0${time.hour}` : `${time.hour}` }} :
            {{ time.minute < 10 ? `0${time.minute}` : `${time.minute}` }}
          </p>
        </div>
        <div class="flex gap-1">
          <label
            :for="time.id?.toString()"
            class="relative inline-flex cursor-pointer items-center"
          >
            <input
              type="checkbox"
              @change="selectAlarm($event, time)"
              :checked="time.status"
              :id="time.id?.toString()"
              class="peer sr-only"
            />
            <div
              class="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"
              bis_skin_checked="1"
            ></div>
          </label>
          <div class="w-6 cursor-pointer" @click="deleteAlarm(index)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="{1.5}"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
