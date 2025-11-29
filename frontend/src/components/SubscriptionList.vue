<template>
  <section class="mt-6">
    <div class="flex items-center justify-between mb-3 gap-2">
      <h2 class="text-xl font-semibold">Suscripciones</h2>
      <button
        class="rounded-lg px-4 py-2 text-sm bg-blue-600 hover:bg-blue-500"
        @click="onCreate"
      >
        + Nueva suscripción
      </button>
    </div>

    <!-- Filtros -->
    <div class="flex flex-wrap gap-3 mb-4">
      <input
        v-model="search"
        type="text"
        placeholder="Buscar..."
        class="rounded-lg px-3 py-2 bg-slate-900 border border-slate-700 text-sm"
      />

      <select
        v-model="filterCurrency"
        class="rounded-lg px-3 py-2 bg-slate-900 border border-slate-700 text-sm"
      >
        <option value="">Moneda (todas)</option>
        <option value="HNL">HNL</option>
        <option value="USD">USD</option>
      </select>

      <select
        v-model="filterFrequency"
        class="rounded-lg px-3 py-2 bg-slate-900 border border-slate-700 text-sm"
      >
        <option value="">Frecuencia (todas)</option>
        <option value="monthly">Mensual</option>
        <option value="annual">Anual</option>
      </select>
    </div>

    <div v-if="filteredSubscriptions.length === 0" class="text-sm text-slate-400">
      No tienes suscripciones registradas todavía.
    </div>

    <div v-else class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <SubscriptionCard
        v-for="sub in filteredSubscriptions"
        :key="sub.id"
        :subscription="sub"
        @edit="onEdit"
        @delete="onDelete"
      />
    </div>

    <SubscriptionForm
      v-if="showForm"
      v-model="editingSubscriptionLocal"
      @save="onSave"
      @cancel="onCancel"
    />
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import SubscriptionCard from "./SubscriptionCard.vue";
import SubscriptionForm from "./SubscriptionForm.vue";
import { useSubscriptions } from "@/composables/useSubscriptions";
import type { Subscription } from "../types/Subscription";

const {
  subscriptions,
  editingSubscription,
  addSubscription,
  updateSubscription,
  deleteSubscription,
  setEditingSubscription,
} = useSubscriptions();

const showForm = ref(false);

const editingSubscriptionLocal = computed({
  get: () => editingSubscription.value,
  set: (val) => setEditingSubscription(val),
});

const search = ref("");
const filterCurrency = ref("");
const filterFrequency = ref("");

const filteredSubscriptions = computed(() =>
  subscriptions.value.filter((sub) => {
    const matchesName = sub.name
      .toLowerCase()
      .includes(search.value.toLowerCase());
    const matchesCurrency =
      filterCurrency.value === "" || sub.currency === filterCurrency.value;
    const matchesFrequency =
      filterFrequency.value === "" || sub.frequency === filterFrequency.value;

    return matchesName && matchesCurrency && matchesFrequency;
  })
);

function onCreate() {
  setEditingSubscription(null);
  showForm.value = true;
}

function onEdit(sub: Subscription) {
  setEditingSubscription(sub);
  showForm.value = true;
}

async function onDelete(id: number) {
  if (confirm("¿Eliminar esta suscripción?")) {
    await deleteSubscription(id);
  }
}

async function onSave(payload: { id?: number } & Omit<Subscription, "id">) {
  if (payload.id) {
    const { id, ...rest } = payload;
    await updateSubscription(id!, rest);
  } else {
    const { id, ...rest } = payload;
    await addSubscription(rest);
  }
  showForm.value = false;
  setEditingSubscription(null);
}

function onCancel() {
  showForm.value = false;
  setEditingSubscription(null);
}
</script>
