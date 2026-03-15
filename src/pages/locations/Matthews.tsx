import CityPageLayout from '../../components/CityPageLayout';
import { FileSignature, FileText, Laptop } from 'lucide-react';

export default function Matthews() {
  return (
    <CityPageLayout
      city="Matthews"
      image="/matthews 1.jpg"
      introText={
        <>
          At <strong>Integrity Closings CLT</strong>, we bring professional notary services directly to you throughout the Matthews community. Whether you are at a local coffee shop in <strong>Historic Downtown Matthews</strong>, a business near <strong>Windsor Square</strong>, or your own front door, we ensure your documents are handled with integrity.
        </>
      }
      services={[
        {
          title: "Loan Signing Services",
          description: <>Expert handling of mortgages, refinances, HELOCs, and seller packages. We serve homeowners in neighborhoods like <strong>Brightmoor, Sardis Forest, and Providence Woods</strong>.</>,
          icon: <FileSignature className="w-6 h-6 text-blue-600" />
        },
        {
          title: "General Notary Work",
          description: <>Power of Attorney (POA), Wills, and Trusts. We are happy to meet at local landmarks such as <strong>Brakeman’s Coffee</strong> or the <strong>Matthews Library</strong> for your convenience.</>,
          icon: <FileText className="w-6 h-6 text-blue-600" />
        },
        {
          title: "Remote Online Notary (RON)",
          description: <>Secure virtual notarization available for residents in <strong>Cresswind, Fairhaven</strong>, and across the 28105 area who prefer digital signing.</>,
          icon: <Laptop className="w-6 h-6 text-blue-600" />
        }
      ]}
      hospitalsIntro="Legal matters don't stop for medical emergencies. We provide compassionate, mobile notary services to patients and families at the primary healthcare hubs in the area:"
      hospitals={[
        {
          name: "Novant Health Matthews Medical Center",
          location: "Matthews, NC",
          description: <>We provide bedside notary services for medical POAs, living wills, and other urgent documents for patients at Novant Health near <strong>Matthews Township Pkwy</strong>.</>
        },
        {
          name: "Atrium Health Union West",
          location: "Stallings / Matthews, NC",
          description: <>Conveniently serving the new facility on the border of Stallings. We offer flexible scheduling to meet you or your loved ones near <strong>Stumptown Park</strong> and the surrounding medical offices.</>
        }
      ]}
      additionalLocations={[
        "Matthews Community Farmers’ Market",
        "Sportsplex at Matthews",
        "Matthews Estates",
        "Chestnut Place",
        "Renfrow Hardware Area",
        "Olde Creek"
      ]}
    />
  );
}
