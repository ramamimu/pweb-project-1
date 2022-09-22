<script setup lang="ts">
import { reactive, onMounted } from "vue";
import { useAlarm } from "@/stores/store";

const props = defineProps({
  isShow: {
    type: Boolean,
    required: true,
  },
});

const ALARM_STATE = useAlarm();

interface Time {
  hours: number[];
  minutes: number[];
}

const time: Time = reactive({
  hours: [],
  minutes: [],
});

const currentAlarm: {
  hours: number;
  minutes: number;
} = reactive({
  hours: 0,
  minutes: 0,
});

function addAlarm(e: any) {
  e.preventDefault();

  ALARM_STATE.setAlarm(currentAlarm.hours, currentAlarm.minutes);
  currentAlarm.hours = 0;
  currentAlarm.minutes = 0;
}

onMounted(() => {
  // for (let i = 0; i < 24; i++) {
  //   i < 10 ? time.hours.push("0" + i.toString()) : time.hours.push(i.toString());
  // }
  // for (let i = 0; i < 60; i++) {
  //   i < 10 ? time.minutes.push("0" + i.toString()) : time.minutes.push(i.toString());
  // }
});
</script>

<template>
  <div v-if="props.isShow" class="grid h-full w-full grid-cols-5">
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
          +
        </button>
      </div>

      <label for="default-toggle" class="relative inline-flex cursor-pointer items-center">
        <input type="checkbox" value="" id="default-toggle" class="peer sr-only" />
        <div
          class="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"
          bis_skin_checked="1"
        ></div>
        <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Toggle me</span>
      </label>
    </div>
    <div class="rounded-br-3xl border-l-2">
      <div v-for="time in ALARM_STATE.alarm" :key="`${time.hour}${time.minute}`">
        <p>{{ time }}</p>
      </div>
    </div>
  </div>
</template>
