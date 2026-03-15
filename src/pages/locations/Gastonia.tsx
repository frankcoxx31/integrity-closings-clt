import CityPageLayout from '../../components/CityPageLayout';
import { FileSignature, FileText, Laptop } from 'lucide-react';

export default function Gastonia() {
  return (
    <CityPageLayout
      city="Gastonia"
      image="/gastiona.png"
      introText={
        <>
          At <strong>Integrity Closings CLT</strong>, we bring professional notary services directly to you throughout the Gastonia community. Whether you are at a local coffee shop in the <strong>Historic District</strong>, a business near <strong>Franklin Square</strong>, or your own front door, we ensure your documents are handled with integrity.
        </>
      }
      services={[
        {
          title: "Loan Signing Services",
          description: <>Expert handling of mortgages, refinances, HELOCs, and seller packages. We serve homeowners in neighborhoods like <strong>Loray Mill, Boogertown, and Ranlo</strong>.</>,
          icon: <FileSignature className="w-6 h-6 text-blue-600" />
        },
        {
          title: "General Notary Work",
          description: <>Power of Attorney (POA), Wills, and Trusts. We are happy to meet at local landmarks such as <strong>Schiele Museum</strong> or the <strong>Gaston County Public Library</strong> for your convenience.</>,
          icon: <FileText className="w-6 h-6 text-blue-600" />
        },
        {
          title: "Remote Online Notary (RON)",
          description: <>Secure virtual notarization available for residents near <strong>Crowders Mountain</strong> and across the Gastonia area who prefer digital signing.</>,
          icon: <Laptop className="w-6 h-6 text-blue-600" />
        }
      ]}
      hospitalsIntro="Legal matters don't stop for medical emergencies. We provide compassionate, mobile notary services to patients and families at the primary healthcare hubs in the area:"
      hospitals={[
        {
          name: "CaroMont Regional Medical Center",
          location: "Gastonia, NC",
          description: <>We provide bedside notary services for medical POAs, living wills, and other urgent documents for patients at CaroMont near <strong>Court Drive</strong>.</>
        },
        {
          name: "Peak Resources Gastonia",
          location: "Gastonia, NC",
          description: <>Conveniently serving rehabilitation and nursing facilities. We offer flexible scheduling to meet you or your loved ones to handle important legal paperwork.</>
        }
      ]}
      additionalLocations={[
        "Crowders Mountain State Park",
        "Daniel Stowe Botanical Garden",
        "Rankin Lake Park",
        "Eastridge Mall",
        "FUSE District",
        "Spencer Mountain"
      ]}
    />
  );
}
