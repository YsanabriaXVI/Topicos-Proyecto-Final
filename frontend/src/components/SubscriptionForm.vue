<template>
  <div class="rounded-xl bg-slate-800 p-4 shadow mt-4">
    <h2 class="text-lg font-semibold mb-3">
      {{ formTitle }}
    </h2>

    <form @submit.prevent="handleSubmit" class="grid gap-3 md:grid-cols-2">
      <div class="md:col-span-2">
        <label class="block text-sm mb-1">Nombre</label>
        <input
          v-model="localForm.name"
          type="text"
          required
          class="w-full rounded-lg bg-slate-900 px-3 py-2 text-sm outline-none border border-slate-700 focus:border-blue-500"
          placeholder="Netflix, Spotify, Gimnasio..."
        />
      </div>

      <div>
        <label class="block text-sm mb-1">Precio</label>
        <input
          v-model.number="localForm.price"
          type="number"
          min="0"
          step="0.01"
          required
          class="w-full rounded-lg bg-slate-900 px-3 py-2 text-sm outline-none border border-slate-700 focus:border-blue-500"
        />
      </div>

      <div>
        <label class="block text-sm mb-1">Moneda</label>
        <select
          v-model="localForm.currency"
          class="w-full rounded-lg bg-slate-900 px-3 py-2 text-sm outline-none border border-slate-700 focus:border-blue-500"
        >
          <option value="HNL">HNL (Lempiras)</option>
          <option value="USD">USD (Dólares)</option>
        </select>
      </div>

      <div>
        <label class="block text-sm mb-1">Frecuencia</label>
        <select
          v-model="localForm.frequency"
          class="w-full rounded-lg bg-slate-900 px-3 py-2 text-sm outline-none border border-slate-700 focus:border-blue-500"
        >
          <option value="monthly">Mensual</option>
          <option value="annual">Anual</option>
        </select>
      </div>

      <div>
        <label class="block text-sm mb-1">Fecha de pago</label>
        <input
          v-model="localForm.payDay"
          type="date"
          required
          class="w-full rounded-lg bg-slate-900 px-3 py-2 text-sm outline-none border border-slate-700 focus:border-blue-500"
        />
      </div>

      <div class="md:col-span-2 flex gap-2 justify-end mt-2">
        <button
          type="button"
          class="rounded-lg px-4 py-2 text-sm bg-slate-700 hover:bg-slate-600"
          @click="$emit('cancel')"
        >
          Cancelar
        </button>
        <button
          type="submit"
          class="rounded-lg px-4 py-2 text-sm bg-green-600 hover:bg-green-500"
        >
          {{ submitLabel }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, watch } from "vue";
import type { Subscription } from "../types/Subscription";

const props = defineProps<{
  modelValue: Subscription | null;
}>();

const emit = defineEmits<{
  (e: "save", payload: { id?: number } & Omit<Subscription, "id">): void;
  (e: "cancel"): void;
  (e: "update:modelValue", value: Subscription | null): void;
}>();

const localForm = reactive<Omit<Subscription, "id">>({
  name: "",
  price: 0,
  currency: "HNL",
  frequency: "monthly",
  payDay: new Date().toISOString().slice(0, 10),
});

watch(
  () => props.modelValue,
  (value) => {
    if (value) {
      localForm.name = value.name;
      localForm.price = value.price;
      localForm.currency = value.currency;
      localForm.frequency = value.frequency;
      localForm.payDay = value.payDay;
    } else {
      localForm.name = "";
      localForm.price = 0;
      localForm.currency = "HNL";
      localForm.frequency = "monthly";
      localForm.payDay = new Date().toISOString().slice(0, 10);
    }
  },
  { immediate: true }
);

const isEditing = computed(() => !!props.modelValue);
const formTitle = computed(() =>
  isEditing.value ? "Editar suscripción" : "Nueva suscripción"
);
const submitLabel = computed(() =>
  isEditing.value ? "Actualizar" : "Agregar"
);

function handleSubmit() {
  if (!localForm.name || !localForm.payDay) return;

  const payload: any = { ...localForm };

  if (props.modelValue?.id) {
    payload.id = props.modelValue.id;
  }

  emit("save", payload);
}
</script>
