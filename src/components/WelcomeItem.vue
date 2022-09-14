<script setup lang="ts">
import { useCounterStore } from "@/stores/store";
import { ref, computed, reactive } from "vue";

const counterStore = useCounterStore();
const localRef = ref(10);

const objectRef = ref({
  a: 10,
  b: 21,
});

const objectReactive = reactive({
  a: 11,
  b: 22,
});

function customLocalRec(value: number) {
  objectReactive.a += value;
}

function addLocalRec() {
  objectReactive.a += 1;
}

function removeLocalRec() {
  objectReactive.a -= 1;
}

function customLocalRef(value: number) {
  localRef.value += value;
}

function addLocalRef() {
  localRef.value += 1;
}

function removeLocalRef() {
  localRef.value -= 1;
}
</script>

<template>
  <div class="item">
    <h2>Hello world</h2>
    <p>This from Pinia</p>
    <p>{{ counterStore.count }}</p>

    <p>This one from local state</p>
    <p>{{ localRef }}</p>
    <div @click="addLocalRef" class="bg-yellow-50 p-2">button -</div>
    <div @click="removeLocalRef" class="bg-pink-50 p-2">button +</div>
    <div @click="customLocalRef(20)" class="bg-blue-50 p-2">
      button custom add 20
    </div>

    <br />
    <div>this is object ref</div>
    <p>{{ objectRef.a }}</p>
    <p>{{ objectRef.b }}</p>

    <div>REACTIVE</div>
    <p>{{ objectReactive.a }} || {{ objectReactive.b }}</p>
    <div @click="addLocalRec" class="bg-yellow-50 p-2">button -</div>
    <div @click="removeLocalRec" class="bg-pink-50 p-2">button +</div>
    <div @click="customLocalRec(20)" class="bg-blue-50 p-2">
      button custom add 20
    </div>
  </div>
</template>
