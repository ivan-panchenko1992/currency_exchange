import { request } from './request';

const BASE_URL = 'https://involve.software/test_front/api';
const calculate = '/payMethods/calculate?base=';
export const getPayMethods = () => request(`${BASE_URL}/payMethods`);

export const getValueInvoise = (
  idInvoice: number, base:string, idWithdraw: number, amount: number,
) => (
  request(`${BASE_URL}${calculate}${base}&amount=${amount}&invoicePayMethod=${idInvoice}&withdrawPayMethod=${idWithdraw}`)

);
