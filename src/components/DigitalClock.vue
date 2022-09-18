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
  <div v-if="props.isShow" class="border bg-green-200">
    <h1>
      {{
        `${CLOCK_STATE.getHours}:${CLOCK_STATE.getMinutes}:${CLOCK_STATE.getSeconds}`
      }}
    </h1>
  </div>
</template>
