<script lang="ts" setup>
import { ref, reactive, onMounted, onUpdated, type Ref, watch } from "vue";
import { useAlarm, useLogicUI, useToast } from "@/stores/store";
import Audio1 from "@/assets/clock-alarm.mp3";
import Audio2 from "@/assets/fast-bip.mp3";
import Audio3 from "@/assets/nuclear.mp3";
import Audio4 from "@/assets/panik.mp3";
import Audio5 from "@/assets/slow.mp3";

const props = defineProps({
  indexAlarm: {
    type: Number,
    required: true,
  },
});

const ALARM_STATE = useAlarm();
const LOGIC_UI_STATE = useLogicUI();
const TOAST_STATE = useToast();

const alarm: {
  hours: number | string;
  minutes: number | string;
  title: string;
} = reactive({
  hours: 0,
  minutes: 0,
  title: "",
});

const sound: Ref<Number> = ref(0);

let audio: Ref<HTMLAudioElement | null> = ref(null);

let listAudio: Ref<string[]> = ref([Audio1, Audio2, Audio3, Audio4, Audio5]);

const days = ref([
  {
    name: "sunday",
    status: true,
    index: 0,
  },
  {
    name: "monday",
    status: true,
    index: 1,
  },
  {
    name: "tuesday",
    status: true,
    index: 2,
  },
  {
    name: "wednesday",
    status: true,
    index: 3,
  },
  {
    name: "thursday",
    status: true,
    index: 4,
  },
  {
    name: "friday",
    status: true,
    index: 5,
  },
  {
    name: "saturday",
    status: true,
    index: 6,
  },
]);

watch(sound, async (newVal) => {
  audio.value?.pause();
  audio.value = null;
  audio.value = new Audio(listAudio.value[parseInt(newVal.toString())]);
  await audio.value?.play();
});

onMounted(() => {
  alarm.hours = ALARM_STATE.alarm[props.indexAlarm].hour;
  alarm.minutes = ALARM_STATE.alarm[props.indexAlarm].minute;
  alarm.title = ALARM_STATE.alarm[props.indexAlarm].title;
  for (let i = 0; i < days.value.length; i++) {
    days.value[i].status = ALARM_STATE.alarm[props.indexAlarm].repeat[i];
  }
  sound.value = ALARM_STATE.alarm[props.indexAlarm].sound;
  setTimeout(() => {
    audio.value?.pause();
    audio.value = null;
  }, 25);
});

function saveEdit() {
  // check first
  let numberPickDays = 0;
  let isAlarmSame = false;

  for (let i = 0; i < days.value.length; i++) {
    if (days.value[i].status) {
      numberPickDays++;
    }
  }

  // check if alarm same
  for (let i = 0; i < ALARM_STATE.alarm.length; i++) {
    if (i !== props.indexAlarm) {
      if (
        ALARM_STATE.alarm[i].hour === alarm.hours &&
        ALARM_STATE.alarm[i].minute === alarm.minutes
      ) {
        isAlarmSame = true;
      }
    }
  }

  if (numberPickDays === 0) {
    TOAST_STATE.showToast("You must pick at least one day", false);
  } else if (isAlarmSame) {
    TOAST_STATE.showToast("Alarm already exist", false);
  } else {
    audio.value?.pause();
    audio.value = null;

    // array of days
    for (let i = 0; i < days.value.length; i++) {
      ALARM_STATE.alarm[props.indexAlarm].repeat[i] = days.value[i].status;
    }
    // alarm and title
    ALARM_STATE.alarm[props.indexAlarm].hour = alarm.hours;
    ALARM_STATE.alarm[props.indexAlarm].minute = alarm.minutes;
    ALARM_STATE.alarm[props.indexAlarm].title = alarm.title;
    // sound
    ALARM_STATE.alarm[props.indexAlarm].sound = sound.value;
    // save to localStorage
    localStorage.setItem("alarm", JSON.stringify(ALARM_STATE.alarm));
    // exit props
    LOGIC_UI_STATE.clock.editAlarm = false;
  }
}
</script>

<template>
  <div
    class="fixed z-20 flex h-screen w-screen items-center justify-center bg-black bg-opacity-50"
  >
    <div class="h-[600px] w-[600px] rounded-lg bg-white">
      <div>
        <h2 class="my-5 text-center text-2xl font-extrabold text-slate-700">
          Repeat
        </h2>
        <div class="m-3 flex flex-wrap items-center justify-center gap-5">
          <div
            :class="{
              'cursor-pointer bg-green-600 px-5 py-2 font-semibold text-white hover:bg-green-700': true,
              'bg-red-600 hover:bg-red-700': !day.status,
            }"
            v-for="day in days"
            :key="day.name"
            @click="day.status = !day.status"
          >
            {{ day.name }}
          </div>
        </div>
      </div>
      <div class="col-span-2 rounded-bl-3xl shadow-inner">
        <div class="flex justify-center gap-2 pt-10">
          <div class="w-16">
            <input
              type="number"
              min="0"
              max="23"
              class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="0"
              v-model="alarm.hours"
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
              v-model="alarm.minutes"
            />
          </div>
        </div>
        <div class="mx-auto w-44 pt-2">
          <input
            type="text"
            placeholder="title"
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            v-model="alarm.title"
          />
        </div>
      </div>
      <div class="my-5 text-center">
        <h2 class="font-bold">Select Your Audio</h2>
        <div class="my-3 inline-block">
          <div class="flex items-center">
            <input
              :checked="sound == 0"
              id="default-radio-1"
              type="radio"
              :value="0"
              name="default-radio"
              class="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              v-model="sound"
            />
            <label
              for="default-radio-1"
              class="ml-2 text-sm font-medium text-gray-900"
              >Default</label
            >
          </div>
          <div class="flex items-center">
            <input
              :checked="sound == 1"
              id="default-radio-2"
              type="radio"
              :value="1"
              name="default-radio"
              class="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              v-model="sound"
            />
            <label
              for="default-radio-2"
              class="ml-2 text-sm font-medium text-gray-900"
              >fast net net</label
            >
          </div>
          <div class="flex items-center">
            <input
              :checked="sound == 2"
              id="default-radio-3"
              type="radio"
              :value="2"
              name="default-radio"
              class="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              v-model="sound"
            />
            <label
              for="default-radio-3"
              class="ml-2 text-sm font-medium text-gray-900"
              >danger</label
            >
          </div>
          <div class="flex items-center">
            <input
              :checked="sound == 3"
              id="default-radio-4"
              type="radio"
              :value="3"
              name="default-radio"
              class="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              v-model="sound"
            />
            <label
              for="default-radio-4"
              class="ml-2 text-sm font-medium text-gray-900"
              >nuclear</label
            >
          </div>
          <div class="flex items-center">
            <input
              :checked="sound == 4"
              id="default-radio-5"
              type="radio"
              :value="4"
              name="default-radio"
              class="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              v-model="sound"
            />
            <label
              for="default-radio-5"
              class="ml-2 text-sm font-medium text-gray-900"
              >slow</label
            >
          </div>
        </div>
      </div>
      <div class="text-center">
        <button
          class="bg-green-600 px-5 py-2 font-bold text-white hover:bg-green-700"
          @click="saveEdit()"
        >
          save
        </button>
        <button
          class="ml-5 bg-red-600 px-5 py-2 font-bold text-white hover:bg-red-700"
          @click="
            LOGIC_UI_STATE.clock.editAlarm = false;
            audio?.pause();
            audio = null;
          "
        >
          close
        </button>
      </div>
    </div>
  </div>
</template>
