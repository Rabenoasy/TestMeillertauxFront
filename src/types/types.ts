export interface LoanRequest {
  amount: number;
  duration: number;
  name: string;
  email: string;
  phone: string;
}

export interface Offer {
  bank: string;
  amount: number;
  duration: number;
  rate: number;
}

export interface FormField {
  name: keyof LoanRequest;
  label: string;
  type: 'text' | 'email' | 'tel' | 'select';
  options?: { value: number; label: string }[];
}
