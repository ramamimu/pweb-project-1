<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { useAudio } from "@/stores/store";

// import { ref, type Ref } from "vue";
// import Audios from "@/assets/clock-alarm.mp3";

const AUDIO_STATE = useAudio();

function startAudio() {
  AUDIO_STATE.startAudio();
}

function stopAudio() {
  AUDIO_STATE.stopAudio();
}
</script>

<template>
  <RouterView />
</template>
