import CityPageLayout from '../../components/CityPageLayout';
import { FileSignature, FileText, Laptop } from 'lucide-react';

export default function Monroe() {
  return (
    <CityPageLayout
      city="Monroe"
      image="/monroe-1.jpg"
      introText={
        <>
          At <strong>Integrity Closings CLT</strong>, we bring professional notary services directly to you throughout the Monroe community. Whether you are at a local coffee shop in <strong>Downtown Monroe</strong>, a business near <strong>Highway 74</strong>, or your own front door, we ensure your documents are handled with integrity.
        </>
      }
      services={[
        {
          title: "Loan Signing Services",
          description: <>Expert handling of mortgages, refinances, HELOCs, and seller packages. We serve homeowners in neighborhoods like <strong>Rolling Hills, South Monroe, and Benton Heights</strong>.</>,
          icon: <FileSignature className="w-6 h-6 text-blue-600" />
        },
        {
          title: "General Notary Work",
          description: <>Power of Attorney (POA), Wills, and Trusts. We are happy to meet at local landmarks such as <strong>Treehouse Vineyards</strong> or the <strong>Union County Library</strong> for your convenience.</>,
          icon: <FileText className="w-6 h-6 text-blue-600" />
        },
        {
          title: "Remote Online Notary (RON)",
          description: <>Secure virtual notarization available for residents across the Monroe area who prefer digital signing.</>,
          icon: <Laptop className="w-6 h-6 text-blue-600" />
        }
      ]}
      hospitalsIntro="Legal matters don't stop for medical emergencies. We provide compassionate, mobile notary services to patients and families at the primary healthcare hubs in the area:"
      hospitals={[
        {
          name: "Atrium Health Union",
          location: "Monroe, NC",
          description: <>We provide bedside notary services for medical POAs, living wills, and other urgent documents for patients at Atrium Health near <strong>Highway 74</strong>.</>
        },
        {
          name: "Monroe Rehabilitation Center",
          location: "Monroe, NC",
          description: <>Conveniently serving rehabilitation and nursing facilities. We offer flexible scheduling to meet you or your loved ones to handle important legal paperwork.</>
        }
      ]}
      additionalLocations={[
        "Sweet Union Flea Market",
        "Aw Shucks! Corn Maze",
        "Monroe Aquatics and Fitness Center",
        "Historic Union County Courthouse",
        "Charlotte-Monroe Executive Airport",
        "Belk Tonawanda Park"
      ]}
    />
  );
}
