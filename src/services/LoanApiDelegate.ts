import type { LoanRequest, Offer } from '../types/types';
import { httpClient } from './httpClient';

export const LoanApiDelegate = {
  async fetchOffers(request: LoanRequest): Promise<Offer[]> {
    const res = await httpClient.post('/offers', request);

    if (res.status === 204) return [];

    return res.data;
  },
};