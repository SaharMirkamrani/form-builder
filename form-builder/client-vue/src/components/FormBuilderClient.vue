<template>
  <div>
    <div class="flex flex-row items-center mb-4">
      <v-btn class="mr-6" color="secondary" @click="preview = !preview" variant="flat">
        {{ preview ? 'Switch to Builder Mode' : 'Switch to Preview Mode' }}
      </v-btn>
      <v-btn color="primary" @click="handleSave" :disabled="preview || loading" variant="flat">
        {{ loading ? 'Saving...' : 'Save' }}
      </v-btn>
    </div>

    <div v-if="!preview" class="mb-6 rounded-md p-4">
      <h2 class="text-lg font-semibold mb-2">Add Field</h2>
      <div class="flex gap-2 items-center">
        <v-select
          v-model="newType"
          :items="fieldTypes"
          label="Type"
          class="w-32"
          variant="outlined"
          density="comfortable"
        />
        <v-text-field
          v-model="newLabel"
          placeholder="Field label"
          class="flex-1"
          variant="outlined"
          density="comfortable"
        />
        <v-btn color="primary" @click="handleAddField" :disabled="!newLabel.trim()" variant="flat">Add</v-btn>
      </div>
    </div>

    <div v-if="!preview" class="mb-6">
      <h2 class="text-lg font-semibold mb-2">Fields</h2>
      <div v-if="fields.length === 0" class="text-gray-400">No fields added yet.</div>
      <draggable v-model="fields" item-key="id" handle=".drag-handle" class="p-0" :animation="200">
        <template #item="{ element, index }">
          <v-sheet
            class="flex items-center gap-3 mb-3 rounded-lg shadow-sm px-4 py-2 bg-white border border-gray-200"
            elevation="1"
          >
            <v-icon class="drag-handle cursor-grab text-gray-400 mr-2" size="22">mdi-drag</v-icon>
            <span class="font-medium text-base">{{ element.label }}</span>
            <span class="text-caption text-grey-lighten-1 capitalize ml-4">{{ element.type }}</span>
            <v-btn
              color="red"
              variant="flat"
              size="small"
              class="ml-2"
              style="min-width: 32px; width: 32px; height: 32px; line-height: 1;"
              @click="handleRemoveField(index)"
            >X</v-btn>
          </v-sheet>
        </template>
      </draggable>
    </div>

    <FormRenderer v-if="preview" :fields="fields" :disabled="false" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import FormRenderer from './FormRenderer.vue';
import { useToast } from 'vue-toastification';
import draggable from 'vuedraggable';

interface Field {
  type: 'text' | 'checkbox' | 'radio';
  label: string;
  id: string;
}

const fields = ref<Field[]>([]);
const newType = ref<'text' | 'checkbox' | 'radio'>('text');
const newLabel = ref('');
const preview = ref(false);
const loading = ref(false);
const toast = useToast();
const fieldTypes = [
  { title: 'Text', value: 'text' },
  { title: 'Checkbox', value: 'checkbox' },
  { title: 'Radio', value: 'radio' },
];

function handleAddField() {
  if (!newLabel.value.trim()) return;
  fields.value.push({ type: newType.value, label: newLabel.value, id: `${newLabel.value}-${Date.now()}` });
  newLabel.value = '';
}

function handleRemoveField(idx: number) {
  fields.value.splice(idx, 1);
}

async function handleSave() {
  loading.value = true;
  try {
    const res = await fetch('http://localhost:3001/forms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fields.value),
    });
    if (!res.ok) throw new Error('Failed to save');
    toast.success('Saved!');
  } catch (err: any) {
    toast.error(err.message || 'Error saving');
  } finally {
    loading.value = false;
  }
}

async function handleLoad() {
  loading.value = true;
  try {
    const res = await fetch('http://localhost:3001/forms');
    if (!res.ok) throw new Error('Failed to load');
    const data = await res.json();
    if (Array.isArray(data)) {
      fields.value = data.map((f: any, i: number) => ({ ...f, id: f.id || `${f.label}-${i}` }));
      toast.success('Loaded!');
    } else if (data && typeof data === 'object' && Object.keys(data).length === 0) {
      fields.value = [];
      toast.success('Loaded!');
    } else if (!data) {
      fields.value = [];
      toast.success('Loaded!');
    } else {
      toast.error('Invalid schema loaded');
    }
  } catch (err: any) {
    toast.error(err.message || 'Error loading');
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  handleLoad();
});
</script>

<style scoped>
.btn {
  @apply px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50;
}
.btn-secondary {
  @apply bg-gray-200 text-gray-800 hover:bg-gray-300;
}
.btn-danger {
  @apply bg-red-600 text-white hover:bg-red-700;
}
.btn-sm {
  @apply px-2 py-0.5 text-xs;
}
</style> 
