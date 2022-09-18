<script setup lang="ts">
import DigitalClock from "@/components/DigitalClock.vue";
import Alarm from "@/components/Alarm.vue";
import Timer from "@/components/Timer.vue";
import Stopwatch from "@/components/Stopwatch.vue";

import { useClock, useLogicUI } from "@/stores/store";
import { onMounted } from "vue";

const CLOCK_STATE = useClock();
const LOGIC_UI_STATE = useLogicUI();

onMounted(() => {
  CLOCK_STATE.startClock();
});
</script>

<template>
  <div class="h-screen">
    <div
      class="container mx-auto flex h-full flex-col items-center justify-center border"
    >
      <div class="w-[600px] border bg-slate-100">
        <div class="flex w-full justify-between gap-20 border pl-10">
          <ul class="flex gap-10">
            <li
              class="m-2 cursor-pointer rounded-xl border bg-white px-4 py-1 shadow-sm transition-all hover:translate-x-[1px] hover:translate-y-[-0.5px] hover:shadow-md active:translate-x-[1px] active:translate-y-[2px]"
              @click="LOGIC_UI_STATE.changeView('alarm')"
            >
              Alarm
            </li>
            <li @click="LOGIC_UI_STATE.changeView('timer')">timer</li>
            <li @click="LOGIC_UI_STATE.changeView('stopwatch')">stopwatch</li>
          </ul>
          <div class="mr-10" @click="LOGIC_UI_STATE.changeView('digitalClock')">
            {{
              `${CLOCK_STATE.getHours}:${CLOCK_STATE.getMinutes}:${CLOCK_STATE.getSeconds}`
            }}
          </div>
        </div>
        <div
          class="flex h-72 w-full flex-col items-center justify-center border bg-blue-100"
        >
          <DigitalClock :isShow="LOGIC_UI_STATE.clock.digitalClock" />
          <Alarm :isShow="LOGIC_UI_STATE.clock.alarm" />
          <Stopwatch :isShow="LOGIC_UI_STATE.clock.stopwatch" />
          <Timer :isShow="LOGIC_UI_STATE.clock.timer" />
        </div>
      </div>
    </div>
  </div>
</template>
