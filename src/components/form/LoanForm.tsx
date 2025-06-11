import { useState } from 'react';
import { FORM_FIELDS } from '../../constants/constants';
import { LoanService } from '../../services/LoanService';
import type { LoanRequest, Offer } from '../../types/types';
import OfferList from '../offer/OfferList';

const initialForm: LoanRequest = {
  amount: 0,
  duration: 0,
  name: '',
  email: '',
  phone: '',
};

type FormField = {
  name: keyof LoanRequest;
  label: string;
  type: 'text' | 'number' | 'email' | 'tel' | 'select';
  options?: { value: string; label: string }[];
};

export default function LoanForm() {
  const [form, setForm] = useState<LoanRequest>(initialForm);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'amount' || name === 'duration' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const results = await LoanService.searchOffers(form);
      setOffers(results);
      setError(null);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'Une erreur inattendue est survenue';
      setError(errorMessage);
      setOffers([]);
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center" style={{ background: 'rgba(255, 255, 255, 0.85)' }}>
      <div className="bg-white p-4 p-md-5 rounded shadow w-100" style={{ maxWidth: '700px' }}>
        <h2 className="mb-4 fw-bold text-center">
          Formulaire de comparaison de taux pour des crédits à la consommation
        </h2>

        <form onSubmit={handleSubmit}>
          <fieldset className="border p-3">
            <legend className="w-auto px-2">Informations</legend>

            {FORM_FIELDS.map((field: FormField) => (
              <div className="row mb-3" key={field.name}>
                <label htmlFor={field.name} className="col-sm-4 col-form-label">
                  {field.label}
                </label>
                <div className="col-sm-8">
                  {field.type === 'select' ? (
                    <select
                      id={field.name}
                      name={field.name}
                      value={form[field.name]}
                      onChange={handleChange}
                      required
                      className="form-select"
                    >
                      <option value="">-- Choisir --</option>
                      {field.options?.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      id={field.name}
                      name={field.name}
                      value={form[field.name]}
                      onChange={handleChange}
                      required
                      className="form-control"
                    />
                  )}
                </div>
              </div>
            ))}

            <div className="text-center">
              <button type="submit" className="btn btn-primary btn-lg w-100">
                Rechercher
              </button>
            </div>

            {error && (
              <div className="mt-3 text-danger text-center">{error}</div>
            )}
          </fieldset>
        </form>

        <div className="mt-4">
          <OfferList offers={offers} />
        </div>
      </div>
    </div>
  );
}
