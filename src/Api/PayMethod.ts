import { request, postRequest } from './request';

const BASE_URL = 'https://involve.software/test_front/api';
const calculate = '/payMethods/calculate?base=';
export const getPayMethods = () => request(`${BASE_URL}/payMethods`);

export const getResultValue = (
  idInvoice: number, base:string, idWithdraw: number, amount: string,
) => (
  request(`${BASE_URL}${calculate}${base}&amount=${amount}&invoicePayMethod=${idInvoice}&withdrawPayMethod=${idWithdraw}`)
);

export const getSuccess = (
  amount: string, base: string, sellPayMethod: number, buyPayMethod: number,
) => {
  const prepearedQuerry = {
    amount,
    base,
    invoicePayMethod: sellPayMethod,
    withdrawPayMethod: buyPayMethod,
  };

  return postRequest(BASE_URL, prepearedQuerry);
};
