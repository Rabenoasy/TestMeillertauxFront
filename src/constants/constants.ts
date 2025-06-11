export const AMOUNTS = [50000, 100000, 200000, 500000];
export const DURATIONS = [15, 20, 25];
export const baseURL = 'http://localhost:8000/api/';

export const FORM_FIELDS = [
  {
    name: 'amount',
    label: 'Montant du prêt',
    type: 'select',
    options: AMOUNTS.map(a => ({ label: `${a.toLocaleString()} €`, value: a })),
  },
  {
    name: 'duration',
    label: 'Durée du prêt (années)',
    type: 'select',
    options: DURATIONS.map(d => ({ label: `${d} ans`, value: d })),
  },
  { name: 'name', label: 'Nom', type: 'text' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'phone', label: 'Téléphone', type: 'tel' },
];
