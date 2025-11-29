import { ref, computed, onMounted } from "vue";
import type { Subscription } from "../types/Subscription";
import {
  getSubscriptions,
  createSubscription,
  updateSubscriptionApi,
  deleteSubscriptionApi,
  getMonthlyTotal,
} from "../api/subscriptions";

const subscriptions = ref<Subscription[]>([]);
const editingSubscription = ref<Subscription | null>(null);
const totalMonthlyHNL = ref(0);

const USD_TO_HNL = 26;

function normalizeToMonthly(sub: Subscription): number {
  const base = sub.frequency === "annual" ? sub.price / 12 : sub.price;
  return base;
}

function convertToHNL(amount: number, currency: Subscription["currency"]): number {
  return currency === "USD" ? amount * USD_TO_HNL : amount;
}

function daysTo(dateString: string): number {
  const today = new Date();
  const target = new Date(dateString);
  const diff = target.getTime() - today.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

const upcomingPayments = computed(() =>
  subscriptions.value.filter((sub) => {
    const d = daysTo(sub.payDay);
    return d >= 0 && d <= 3;
  })
);

async function loadSubscriptions() {
  const res = await getSubscriptions();
  subscriptions.value = res.data;
}

async function loadTotal() {
  try {
    const res = await getMonthlyTotal();
    totalMonthlyHNL.value = res.data.totalHNL;
  } catch {
    totalMonthlyHNL.value = subscriptions.value.reduce((acc, s) => {
      const monthly = normalizeToMonthly(s);
      return acc + convertToHNL(monthly, s.currency);
    }, 0);
  }
}

async function refreshAll() {
  await loadSubscriptions();
  await loadTotal();
}

async function addSubscription(data: Omit<Subscription, "id">) {
  const res = await createSubscription(data);
  subscriptions.value.unshift(res.data);
  await loadTotal();
}

async function updateSubscription(id: number, data: Omit<Subscription, "id">) {
  const res = await updateSubscriptionApi(id, data);
  const idx = subscriptions.value.findIndex((s) => s.id === id);
  if (idx !== -1) {
    subscriptions.value[idx] = res.data;
  }
  await loadTotal();
}

async function deleteSubscription(id: number) {
  await deleteSubscriptionApi(id);
  subscriptions.value = subscriptions.value.filter((s) => s.id !== id);
  await loadTotal();
}

function setEditingSubscription(sub: Subscription | null) {
  editingSubscription.value = sub ? { ...sub } : null;
}

onMounted(async () => {
  await refreshAll();
});

export function useSubscriptions() {
  return {
    subscriptions,
    editingSubscription,
    totalMonthlyHNL,
    upcomingPayments,
    addSubscription,
    updateSubscription,
    deleteSubscription,
    setEditingSubscription,
  };
}
