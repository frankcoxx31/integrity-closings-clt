import CityPageLayout from '../../components/CityPageLayout';
import { FileSignature, FileText, Laptop } from 'lucide-react';

export default function Concord() {
  return (
    <CityPageLayout
      city="Concord"
      image="/concord.jpg"
      introText={
        <>
          At <strong>Integrity Closings CLT</strong>, we bring professional notary services directly to you throughout the Concord community. Whether you are at a local coffee shop in <strong>Historic Downtown Concord</strong>, a business near <strong>Concord Mills</strong>, or your own front door, we ensure your documents are handled with integrity.
        </>
      }
      services={[
        {
          title: "Loan Signing Services",
          description: <>Expert handling of mortgages, refinances, HELOCs, and seller packages. We serve homeowners in neighborhoods like <strong>Afton Village, Beverly Hills, and Poplar Woods</strong>.</>,
          icon: <FileSignature className="w-6 h-6 text-blue-600" />
        },
        {
          title: "General Notary Work",
          description: <>Power of Attorney (POA), Wills, and Trusts. We are happy to meet at local landmarks such as <strong>Cabarrus Brewing Company</strong> or the <strong>Concord Library</strong> for your convenience.</>,
          icon: <FileText className="w-6 h-6 text-blue-600" />
        },
        {
          title: "Remote Online Notary (RON)",
          description: <>Secure virtual notarization available for residents in <strong>Coddle Creek, Roberta Mill</strong>, and across the Concord area who prefer digital signing.</>,
          icon: <Laptop className="w-6 h-6 text-blue-600" />
        }
      ]}
      hospitalsIntro="Legal matters don't stop for medical emergencies. We provide compassionate, mobile notary services to patients and families at the primary healthcare hubs in the area:"
      hospitals={[
        {
          name: "Atrium Health Cabarrus",
          location: "Concord, NC",
          description: <>We provide bedside notary services for medical POAs, living wills, and other urgent documents for patients at Atrium Health near <strong>Carolina Mall</strong>.</>
        },
        {
          name: "Gateway Surgery Center",
          location: "Concord, NC",
          description: <>Conveniently serving the surgical center and surrounding medical offices. We offer flexible scheduling to meet you or your loved ones when it matters most.</>
        }
      ]}
      additionalLocations={[
        "Charlotte Motor Speedway",
        "Great Wolf Lodge",
        "Frank Liske Park",
        "Historic Cabarrus County Courthouse",
        "Zmax Dragway",
        "Concord Regional Airport"
      ]}
    />
  );
}
