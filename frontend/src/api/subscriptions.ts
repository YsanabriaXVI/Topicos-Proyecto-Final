import axios from "axios";

const API_URL = "http://localhost:4000/api/subscriptions";

export const getSubscriptions = () => axios.get(API_URL);

export const createSubscription = (data: any) =>
  axios.post(API_URL, data);

export const updateSubscriptionApi = (id: number, data: any) =>
  axios.put(`${API_URL}/${id}`, data);

export const deleteSubscriptionApi = (id: number) =>
  axios.delete(`${API_URL}/${id}`);

export const getMonthlyTotal = () =>
  axios.get(`${API_URL}/total`);
