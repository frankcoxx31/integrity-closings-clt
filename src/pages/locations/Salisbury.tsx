import CityPageLayout from '../../components/CityPageLayout';
import { FileSignature, FileText, Laptop } from 'lucide-react';

export default function Salisbury() {
  return (
    <CityPageLayout
      city="Salisbury"
      image="/salisbury-nc.jpg"
      introText={
        <>
          At <strong>Integrity Closings CLT</strong>, we bring professional notary services directly to you throughout the Salisbury community. Whether you are at a local coffee shop in the <strong>Historic District</strong>, a business near <strong>Innes Street</strong>, or your own front door, we ensure your documents are handled with integrity.
        </>
      }
      services={[
        {
          title: "Loan Signing Services",
          description: <>Expert handling of mortgages, refinances, HELOCs, and seller packages. We serve homeowners in neighborhoods like <strong>Fulton Heights, Brooklyn South Square, and Country Club</strong>.</>,
          icon: <FileSignature className="w-6 h-6 text-blue-600" />
        },
        {
          title: "General Notary Work",
          description: <>Power of Attorney (POA), Wills, and Trusts. We are happy to meet at local landmarks such as <strong>Bell Tower Green</strong> or the <strong>Rowan Public Library</strong> for your convenience.</>,
          icon: <FileText className="w-6 h-6 text-blue-600" />
        },
        {
          title: "Remote Online Notary (RON)",
          description: <>Secure virtual notarization available for residents in <strong>West Square</strong> and across the Salisbury area who prefer digital signing.</>,
          icon: <Laptop className="w-6 h-6 text-blue-600" />
        }
      ]}
      hospitalsIntro="Legal matters don't stop for medical emergencies. We provide compassionate, mobile notary services to patients and families at the primary healthcare hubs in the area:"
      hospitals={[
        {
          name: "Novant Health Rowan Medical Center",
          location: "Salisbury, NC",
          description: <>We provide bedside notary services for medical POAs, living wills, and other urgent documents for patients at Novant Health near <strong>Mocksville Ave</strong>.</>
        },
        {
          name: "W.G. (Bill) Hefner VA Medical Center",
          location: "Salisbury, NC",
          description: <>Conveniently serving our veterans and their families. We offer flexible scheduling to meet you or your loved ones at the VA Medical Center.</>
        }
      ]}
      additionalLocations={[
        "NC Transportation Museum",
        "Dan Nicholas Park",
        "Dr. Josephus Hall House",
        "Salisbury National Cemetery",
        "Catawba College",
        "Livingstone College"
      ]}
    />
  );
}
