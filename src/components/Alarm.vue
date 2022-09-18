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

const time: { hours: string[]; minutes: string[] } = reactive({
  hours: [],
  minutes: [],
});

const currentAlarm: {
  hours: string;
  minutes: string;
} = reactive({
  hours: "00",
  minutes: "00",
});

function addAlarm(e: any) {
  e.preventDefault();

  ALARM_STATE.setAlarm(currentAlarm.hours, currentAlarm.minutes);
}

onMounted(() => {
  for (let i = 0; i < 24; i++) {
    i < 10
      ? time.hours.push("0" + i.toString())
      : time.hours.push(i.toString());
  }
  for (let i = 0; i < 60; i++) {
    i < 10
      ? time.minutes.push("0" + i.toString())
      : time.minutes.push(i.toString());
  }
});
</script>

<template>
  <div v-if="props.isShow" class="grid h-full w-full grid-cols-2 border">
    <div class="border-2 border-black">
      <h2>Set Alarm</h2>
      <form class="flex items-start" @submit="addAlarm">
        <select
          v-model="currentAlarm.hours"
          onfocus="this.size=10;"
          onblur="this.size=1;"
          onchange="this.size=1; this.blur();"
        >
          <option v-for="item in time.hours" :key="item" :value="item">
            {{ item }}
          </option>
        </select>
        :
        <select
          v-model="currentAlarm.minutes"
          onfocus="this.size=10;"
          onblur="this.size=1;"
          onchange="this.size=1; this.blur();"
        >
          <option v-for="item in time.minutes" :key="item" :value="item">
            {{ item }}
          </option>
        </select>
        <button type="submit">ini buttonnya</button>
      </form>
    </div>
    <div class="border-2 border-black">
      <h2>grid ke 2</h2>
      <div
        v-for="time in ALARM_STATE.alarm"
        :key="`${time.hour}${time.minute}`"
      >
        <p>{{ time }}</p>
      </div>
    </div>
  </div>
</template>
