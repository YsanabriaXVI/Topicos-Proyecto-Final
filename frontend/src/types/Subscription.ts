export type Currency = 'HNL' | 'USD';
export type Frequency = 'monthly' | 'annual';

export interface Subscription {
  id: number;
  name: string;
  price: number;         //* precio en la moneda indicada
  currency: Currency;    //* HNL o USD
  frequency: Frequency;  //* mensual o anual
  payDay: string;        //* fecha de pago (YYYY-MM-DD)
}
