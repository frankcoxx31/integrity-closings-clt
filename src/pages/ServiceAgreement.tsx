import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { pageMeta } from '../seo/pageMeta';
import { usePageMeta } from '../hooks/usePageMeta';
import { businessConfig } from '../config/business';

export default function ServiceAgreement() {
  usePageMeta(pageMeta['/service-agreement']);

  const mileageRate = businessConfig.pricing.irsMileageRate.toFixed(3).replace(/0+$/, '').replace(/\.$/, '');

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center text-slate-600 hover:text-brand-600 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </Link>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 sm:p-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-8 font-sans">Service Agreement &amp; Fee Disclosure</h1>
          <div className="prose prose-slate max-w-none">
            <p>Last Updated: {new Date().toLocaleDateString()}</p>
            <p>This page discloses the fees charged by {businessConfig.name} for mobile notary services in North Carolina, and sets out the terms that apply to every in-person appointment. It applies to all in-person mobile notarizations — {businessConfig.name} does not perform electronic or remote online notarization.</p>

            <h2 className="text-xl font-bold mt-8 mb-4">Fee Schedule</h2>
            <div className="not-prose overflow-x-auto my-6">
              <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-slate-100 text-left">
                    <th className="px-4 py-3 font-semibold text-slate-900 border-b border-slate-200">Notarial Act</th>
                    <th className="px-4 py-3 font-semibold text-slate-900 border-b border-slate-200">Fee</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="px-4 py-3 text-slate-700 align-top">Acknowledgment, Jurat, Verification, or Proof</td>
                    <td className="px-4 py-3 text-slate-700 align-top">$10.00 per notarized principal signature</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-slate-700 align-top">Oath or Affirmation without a signature</td>
                    <td className="px-4 py-3 text-slate-700 align-top">$10.00 per person</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-slate-700 align-top">Travel reimbursement</td>
                    <td className="px-4 py-3 text-slate-700 align-top">Current IRS federal business mileage rate (${mileageRate}/mile as of this writing) &times; actual round-trip mileage</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-slate-500">Notarial fees are set by North Carolina law. Travel reimbursement is authorized under N.C. Gen. Stat. &sect; 10B-31.</p>

            <h2 className="text-xl font-bold mt-8 mb-4">Travel Fee Consent</h2>
            <p>North Carolina law (N.C. Gen. Stat. &sect; 10B-31) requires a notary to obtain the principal's written agreement to travel reimbursement <em>before</em> traveling to the appointment. Agreeing to the mileage/travel fee terms when you book an appointment with {businessConfig.name} is that written agreement. Travel reimbursement is calculated from the notary's office to your appointment location and back, at the current IRS federal business mileage rate.</p>

            <h2 className="text-xl font-bold mt-8 mb-4">Responsibility for Payment</h2>
            <p>The person who books the appointment ("Client") is responsible for payment in full, including travel reimbursement, even when booking on behalf of a hospitalized, incapacitated, or otherwise unavailable family member or third party. Payment is due at the time of service. An itemized receipt showing the notarial fee and travel reimbursement separately is provided at every appointment.</p>

            <h2 className="text-xl font-bold mt-8 mb-4">If the Notarization Cannot Be Completed</h2>
            <p>No notarial fee is charged for an act that is not performed. However, travel reimbursement remains due when the notary has traveled to the appointment and the notarization cannot be completed for reasons outside the notary's control, including but not limited to:</p>
            <ul>
              <li>The signer does not have acceptable identification.</li>
              <li>The signer cannot demonstrate awareness of the document being signed.</li>
              <li>The signer is sedated, asleep, or otherwise unavailable at the scheduled time.</li>
              <li>The facility denies the notary access to the signer.</li>
              <li>The documents to be notarized are missing or incomplete.</li>
            </ul>
            <p className="text-sm text-slate-500">For hospital, hospice, or care facility appointments: please confirm in advance that the signer will be alert at the scheduled time and either has acceptable photo identification on hand or two credible witnesses available who can personally vouch for the signer's identity. This helps avoid a wasted trip and an unnecessary travel charge.</p>

            <h2 className="text-xl font-bold mt-8 mb-4">Cancellation</h2>
            <p>Cancellations made at least 4 hours before the scheduled appointment time are free of charge. If the notary is already en route to the appointment when it is canceled, travel reimbursement remains due.</p>

            <h2 className="text-xl font-bold mt-8 mb-4">Scope of Services</h2>
            <p>{businessConfig.name} is a notary public and loan signing agent, not an attorney. We cannot give legal advice, and we cannot select, draft, or recommend which notarial certificate or wording applies to your document — that determination is the responsibility of the document's preparer or the signer's attorney.</p>

            <p className="text-sm text-slate-500 mt-12 pt-8 border-t border-slate-200">This page serves as {businessConfig.name}'s fee schedule notice as required under N.C. Gen. Stat. &sect; 10B-32.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
