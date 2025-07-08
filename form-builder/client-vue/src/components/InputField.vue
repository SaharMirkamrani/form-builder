<template>
  <div class="mb-4">
    <label class="mb-1 font-medium text-left w-full block">{{ label }}</label>
    <template v-if="type === 'radio'">
      <v-radio-group :disabled="disabled" v-model="radioValue">
        <v-radio label="Option 1" value="option1" :disabled="disabled" />
        <v-radio label="Option 2" value="option2" :disabled="disabled" />
      </v-radio-group>
    </template>
    <template v-else-if="type === 'checkbox'">
      <v-checkbox :disabled="disabled" v-model="checkboxValue" />
    </template>
    <template v-else>
      <v-text-field
        placeholder="Enter text..."
        :disabled="disabled"
        variant="outlined"
        density="comfortable"
        v-model="textValue"
        hide-details
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
  type: 'text' | 'checkbox' | 'radio',
  label: string,
  disabled?: boolean
}>()

const textValue = ref('');
const checkboxValue = ref(false);
const radioValue = ref('option1');
</script> 
