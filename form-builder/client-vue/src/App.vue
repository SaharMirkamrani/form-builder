<script setup lang="ts">
import FormBuilderClient from './components/FormBuilderClient.vue'
</script>

<template>
  <main class="p-8 bg-white text-gray-900 min-h-screen">
    <h2 class="text-lg font-semibold mb-5">Form Builder (Vue)</h2>
    <FormBuilderClient />
  </main>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
