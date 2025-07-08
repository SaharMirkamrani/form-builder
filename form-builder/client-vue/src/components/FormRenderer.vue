<template>
  <form>
    <InputField
      v-for="(field, idx) in fields"
      :key="idx"
      v-bind="field"
      :disabled="disabled"
    />
  </form>
</template>

<script setup lang="ts">
import InputField from './InputField.vue';

defineProps<{
  fields: Array<{ type: 'text' | 'checkbox' | 'radio'; label: string }>,
  disabled?: boolean
}>()
</script> 
