import { Clock, Phone, MessageSquare } from 'lucide-react';

/**
 * 24/7 emergency-availability banner for the hospital and nursing-home pages.
 *
 * Bedside documents — pre-surgery powers of attorney, healthcare directives,
 * hospice paperwork — are frequently time-critical, so facility signings are
 * offered around the clock even though the general business hours are not.
 * Kept in one component so both facility pages state the same promise.
 */
export default function EmergencyAvailability({
  facilityType = 'hospital and nursing home',
}: {
  facilityType?: string;
}) {
  return (
    <section className="mb-12 rounded-xl border border-brand-200 bg-brand-50 overflow-hidden">
      <div className="flex items-center gap-3 bg-brand-600 px-6 py-4">
        <Clock className="w-6 h-6 text-white flex-shrink-0" />
        <h2 className="text-lg sm:text-xl font-bold text-white">
          24/7 Emergency Availability
        </h2>
      </div>
      <div className="p-6">
        <p className="text-slate-700 leading-relaxed mb-4">
          We know {facilityType} documents can't always wait for business hours. A power of
          attorney needed before an early-morning surgery, a healthcare directive during an
          overnight admission, hospice paperwork on a weekend — Integrity Closings CLT is
          available <strong>24 hours a day, 7 days a week</strong> for emergency bedside
          notarizations at hospitals, hospice, nursing homes, and assisted living facilities
          across the Charlotte metro.
        </p>
        <p className="text-sm text-slate-500 mb-6">
          Call or text any time. For overnight and holiday requests, calling reaches us fastest.
          Please confirm the facility permits the visit at the scheduled time.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="tel:9805058050"
            className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-md text-white bg-brand-600 hover:bg-brand-700 transition-colors shadow-sm"
          >
            <Phone className="w-5 h-5 mr-2" />
            Call 24/7: 980-505-8050
          </a>
          <a
            href="sms:9805058050"
            className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-md text-brand-600 bg-white hover:bg-brand-100 transition-colors border border-brand-200"
          >
            <MessageSquare className="w-5 h-5 mr-2" />
            Text 980-505-8050
          </a>
        </div>
      </div>
    </section>
  );
}
