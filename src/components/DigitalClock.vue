<script setup lang="ts">
import { useClock } from "@/stores/store";
const CLOCK_STATE = useClock();
</script>

<template>
  <div class="border bg-green-200">
    <h1>
      {{
        `${CLOCK_STATE.getHours}:${CLOCK_STATE.getMinutes}:${CLOCK_STATE.getSeconds}`
      }}
    </h1>
  </div>
</template>
