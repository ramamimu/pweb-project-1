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
  </div>
</template>
