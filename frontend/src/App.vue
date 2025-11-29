<template>
  <main class="min-h-screen bg-slate-900 text-slate-100">
    <div class="mx-auto max-w-5xl px-4 py-8">
      <header class="mb-6 flex items-center gap-3">
        <div>
          <h1 class="text-3xl font-bold">SubTracker</h1>
          <p class="text-sm text-slate-400 mt-1">
            Controla tus suscripciones y cuánto gastas cada mes.
          </p>
        </div>

        <button
          class="ml-auto rounded-lg px-3 py-2 text-sm bg-slate-700 hover:bg-slate-600"
          @click="setTheme(theme === 'dark' ? 'light' : 'dark')"
        >
          {{ theme === "dark" ? "🌙 Dark" : "☀️ Light" }}
        </button>
      </header>

      <section
        class="flex flex-col md:flex-row md:items-center md:justify-between gap-3 rounded-xl bg-slate-800 p-4 shadow"
      >
        <div>
          <h2 class="text-sm text-slate-400">Gasto mensual estimado</h2>
          <p class="text-2xl font-semibold">
            L {{ totalMonthlyHNL.toFixed(2) }}
          </p>
          <p class="text-xs text-slate-500 mt-1">
            (USD convertidos a HNL a tasa fija de 26)
          </p>
        </div>
      </section>

      <section
        v-if="upcomingPayments.length"
        class="bg-yellow-600/20 border border-yellow-500 text-yellow-300 p-4 rounded-xl mt-4"
      >
        <strong>⚠️ Aviso:</strong>
        Tienes {{ upcomingPayments.length }} suscripción(es) con pago próximo (≤ 3 días).
      </section>

      <SubscriptionList />

      <MonthlyChart />
    </div>
  </main>
</template>

<script setup lang="ts">
import SubscriptionList from "./components/SubscriptionList.vue";
import MonthlyChart from "./components/MonthlyChart.vue";
import { useSubscriptions } from "./composables/useSubscriptions";
import { useTheme } from "./composables/useTheme";

const { totalMonthlyHNL, upcomingPayments } = useSubscriptions();
const { theme, setTheme } = useTheme();
</script>
