import type { Offer } from "../../types/types";

type Props = {
  offers: Offer[];
};

export default function OfferList({ offers }: Props) {
  if (!offers.length) return <p className="text-muted fst-italic">Aucune offre disponible.</p>;

  return (
    <div className="card shadow-sm mt-4">
      <div className="card-body">
        <h3 className="card-title fw-bold mb-3 text-primary">Offres partenaires</h3>
        <div className="table-responsive">
          <table className="table table-hover table-striped align-middle">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Banque</th>
                <th>Taux (%)</th>
                <th>Montant (€)</th>
                <th>Durée (ans)</th>
              </tr>
            </thead>
            <tbody>
              {offers.map((offer, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td className="fw-semibold">{offer.bank}</td>
                  <td>{offer.rate.toFixed(2)}%</td>
                  <td>{offer.amount.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</td>
                  <td>{offer.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
