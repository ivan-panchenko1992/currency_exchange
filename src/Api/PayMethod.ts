import { request } from './request';

const BASE_URL = 'https://involve.software/test_front/api';

export const getPayMethods = () => request(`${BASE_URL}/payMethods`);
