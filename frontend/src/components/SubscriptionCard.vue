<template>
  <div class="rounded-xl bg-slate-800 dark:bg-slate-800 p-4 shadow hover:shadow-lg transition">
    <div class="flex items-start justify-between gap-2">
      <div>
        <h3 class="text-lg font-semibold">{{ subscription.name }}</h3>
        <p class="text-sm text-slate-400">
          {{ subscription.frequency === "monthly" ? "Mensual" : "Anual" }} ·
          {{ subscription.currency }} {{ subscription.price.toFixed(2) }}
        </p>
        <p class="text-xs text-slate-500 mt-1">
          Día de pago: {{ subscription.payDay }}
        </p>
      </div>
      <div class="flex flex-col gap-2">
        <button
          class="rounded-lg px-3 py-1 text-xs bg-blue-600 hover:bg-blue-500"
          @click="$emit('edit', subscription)"
        >
          Editar
        </button>
        <button
          class="rounded-lg px-3 py-1 text-xs bg-red-600 hover:bg-red-500"
          @click="$emit('delete', subscription.id)"
        >
          Eliminar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Subscription } from "../types/Subscription";

defineProps<{
  subscription: Subscription;
}>();

defineEmits<{
  (e: "edit", sub: Subscription): void;
  (e: "delete", id: number): void;
}>();
</script>
