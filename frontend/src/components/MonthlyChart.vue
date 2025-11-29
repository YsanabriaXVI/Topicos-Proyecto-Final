<template>
  <div class="bg-slate-800 p-4 rounded-xl shadow mt-6">
    <h3 class="text-lg mb-2 font-semibold">Distribución del gasto mensual (HNL)</h3>
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";


import { useSubscriptions } from "@/composables/useSubscriptions";
import type { Subscription } from "@/types/Subscription";


ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const { subscriptions } = useSubscriptions();

const chartData = computed(() => {
  const USD_TO_HNL = 26;
  return {
    labels: subscriptions.value.map((sub: Subscription) => sub.name),
    datasets: [
      {
        label: "Gasto mensual (HNL)",
        data: subscriptions.value.map((sub: Subscription) => {
          const monthly = sub.frequency === "annual" ? sub.price / 12 : sub.price;
          return sub.currency === "USD" ? monthly * USD_TO_HNL : monthly;
        }),
      },
    ],
  };
});

const chartOptions = {
  responsive: true,
  scales: {
    y: { beginAtZero: true },
  },
};
</script>
