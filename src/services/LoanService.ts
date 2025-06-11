import type { LoanRequest, Offer } from "../types/types";
import { LoanApiDelegate } from "./LoanApiDelegate";

export class LoanService {
  static async searchOffers(request: LoanRequest): Promise<Offer[]> {
    return LoanApiDelegate.fetchOffers(request);
  }
}