<script setup lang="ts">
import { useClock } from "@/stores/store";

const CLOCK_STATE = useClock();

const props = defineProps({
  isShow: {
    type: Boolean,
    required: true,
  },
});
</script>

<template>
  <div v-show="props.isShow" class="text-6xl text-slate-700">
    <h1>
      {{
        `${CLOCK_STATE.getHours}:${CLOCK_STATE.getMinutes}:${CLOCK_STATE.getSeconds}`
      }}
    </h1>
    <h3 class="text-center text-xl">
      {{
        CLOCK_STATE.time.getDate() < 10
          ? `0${CLOCK_STATE.time.getDate()}`
          : CLOCK_STATE.time.getDate()
      }}
      /
      {{
        CLOCK_STATE.time.getMonth() + 1 < 10
          ? `0${CLOCK_STATE.time.getMonth() + 1}`
          : CLOCK_STATE.time.getMonth() + 1
      }}
      /
      {{ CLOCK_STATE.time.getFullYear() }}
    </h3>
  </div>
</template>
