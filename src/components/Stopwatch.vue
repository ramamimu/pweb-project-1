<script setup lang="ts">
import { useStopwatch } from "@/stores/store";

const props = defineProps({
  isShow: {
    type: Boolean,
    required: true,
  },
});

const STOPWATCH_STATE = useStopwatch();
</script>
<template>
  <div v-if="props.isShow" class="overflow-scroll">
    this is stopwatch
    <p>{{ STOPWATCH_STATE.stopwatch.current }}</p>
    <p>{{ STOPWATCH_STATE.getHours }}</p>
    <p>{{ STOPWATCH_STATE.getMinutes }}</p>
    <p>{{ STOPWATCH_STATE.getSeconds }}</p>
    <p>{{ STOPWATCH_STATE.getMiliseconds }}</p>
    <button @click="STOPWATCH_STATE.startStopwatch">I am start</button>
    <br />
    <button @click="STOPWATCH_STATE.stopStopwatch">stop me</button>
    <br />
    <button @click="STOPWATCH_STATE.saveTime">save me</button>
    <div v-for="time in STOPWATCH_STATE.savedTimes" :key="time">
      <p>{{ time }}</p>
    </div>
  </div>
</template>
