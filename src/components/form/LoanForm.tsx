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
    <div
      className="container-fluid min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: 'linear-gradient(135deg, #4e73df, #224abe)',
      }}
    >
      <div
        className="bg-white p-4 p-md-5 rounded-3 shadow-lg w-100"
        style={{
          maxWidth: '700px',
          transition: 'transform 0.3s ease',
        }}
      >
        <h2 className="mb-4 fw-bold text-center text-primary">
          Comparaison de taux pour crédits à la consommation
        </h2>

        <form onSubmit={handleSubmit}>
          <fieldset className="border p-4 rounded-2">
            <legend className="w-auto px-3 fs-5 fw-semibold text-primary"></legend>

            {FORM_FIELDS.map((field: FormField) => (
              <div className="row mb-4" key={field.name}>
                <div className="col-12">
                  <div className="form-floating">
                    {field.type === 'select' ? (
                      <select
                        id={field.name}
                        name={field.name}
                        value={form[field.name]}
                        onChange={handleChange}
                        required
                        className="form-select"
                        style={{
                          height: '3.5rem',
                          paddingTop: '1.5rem',
                          paddingBottom: '0.75rem',
                        }}
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
                        style={{
                          height: '3.5rem',
                          paddingTop: '1.5rem',
                          paddingBottom: '0.75rem',
                        }}
                        placeholder=" "
                      />
                    )}
                    <label htmlFor={field.name} className="form-label text-primary">
                      {field.label}
                    </label>
                  </div>
                </div>
              </div>
            ))}

            <div className="text-center mt-4">
              <button
                type="submit"
                className="btn btn-primary btn-lg w-100"
                style={{
                  background: 'linear-gradient(90deg, #4e73df, #224abe)',
                  border: 'none',
                  borderRadius: '0.5rem',
                  padding: '0.75rem',
                  transition: 'all 0.3s ease',
                }}
              >
                Rechercher
              </button>
            </div>

            {error && (
              <div
                className="mt-3 text-center p-3 rounded"
                style={{ background: 'rgba(220, 53, 69, 0.1)', color: '#dc3545' }}
              >
                {error}
              </div>
            )}
          </fieldset>
        </form>

        <div className="mt-4">
          <OfferList offers={offers} />
        </div>
      </div>

      <style jsx>{`
        .form-container:hover {
          transform: translateY(-5px);
        }
        .form-floating > .form-control:focus ~ label,
        .form-floating > .form-control:not(:placeholder-shown) ~ label,
        .form-floating > .form-select ~ label {
          transform: scale(0.85) translateY(-1.5rem) translateX(0.15rem);
          background: white;
          padding: 0 0.5rem;
          color: #4e73df;
          opacity: 1;
        }
        .form-floating > .form-control,
        .form-floating > .form-select {
          border-color: #ced4da;
          border-radius: 0.5rem;
        }
        .form-floating > label {
          transition: all 0.2s ease;
          transform-origin: top left;
          color: #6c757d;
        }
        .form-floating > .form-control:focus,
        .form-floating > .form-select:focus {
          border-color: #4e73df;
          box-shadow: 0 0 0 0.2rem rgba(78, 115, 223, 0.25);
        }
        .btn-primary:hover {
          background: linear-gradient(90deg, #224abe, #1a3a9e);
          transform: translateY(-2px);
        }
        @media (max-width: 576px) {
          .p-4 {
            padding: 1.5rem !important;
          }
          h2 {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
