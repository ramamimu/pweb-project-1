<script setup lang="ts">
import { useClock, useTimer } from "@/stores/store";
import { reactive } from "vue";

const props = defineProps({
  isShow: {
    type: Boolean,
    required: true,
  },
});

const CLOCK_STATE = useClock();
const TIMER_STATE = useTimer();
</script>
<template>
  <div v-if="props.isShow">
    <h2>this is timer</h2>
    <div></div>
    <h2>{{ CLOCK_STATE.time.getTime() }}</h2>
    <h2>{{ TIMER_STATE.timer.status }}</h2>
    <h2>{{ TIMER_STATE.timer.timerEnd }}</h2>
    <h2>
      {{
        CLOCK_STATE.time.getTime() > TIMER_STATE.timer.timerEnd
          ? "i am pass"
          : "not yet"
      }}
    </h2>
    <button @click="TIMER_STATE.setTimer">active timmer</button>
  </div>
</template>
