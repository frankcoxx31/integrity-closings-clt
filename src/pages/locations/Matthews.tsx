import CityPageLayout from '../../components/CityPageLayout';
import { FileSignature, FileText, Laptop, Clock, HeartPulse, ShieldCheck } from 'lucide-react';

export default function Matthews() {
  return (
    <CityPageLayout
      city="Matthews"
      image="https://images.unsplash.com/photo-1580655653885-65763b2597d0?auto=format&fit=crop&q=80&w=1920"
      introText={
        <>
          Need a <strong>mobile notary in Matthews, NC</strong>? Integrity Closings CLT provides professional, on-demand notary services throughout the Matthews and Stallings area. Whether you are at a local coffee shop in <strong>Historic Downtown Matthews</strong>, a business near <strong>Windsor Square</strong>, or your own front door, we bring the notary office to you. We are committed to providing Matthews residents with secure, accurate, and stress-free notarizations for all their legal and financial documents.
        </>
      }
      services={[
        {
          title: "Loan Signing Services",
          description: <>Expert handling of mortgages, refinances, HELOCs, and seller packages. We serve homeowners in neighborhoods like <strong>Brightmoor, Sardis Forest, and Providence Woods</strong>.</>,
          icon: <FileSignature className="w-6 h-6 text-blue-600" />,
          link: "/loan-signing-agent-charlotte-nc"
        },
        {
          title: "Estate Planning Notary",
          description: <>Secure notarization for Power of Attorney (POA), Wills, and Trusts. We are happy to meet at local landmarks such as <strong>Brakeman’s Coffee</strong> or the <strong>Matthews Library</strong>.</>,
          icon: <FileText className="w-6 h-6 text-blue-600" />,
          link: "/estate-notary-charlotte-nc"
        },
        {
          title: "Hospital & Nursing Home",
          description: <>Compassionate bedside notary services for medical POAs and living wills for patients at <strong>Novant Health Matthews</strong> and <strong>Atrium Health Union West</strong>.</>,
          icon: <HeartPulse className="w-6 h-6 text-blue-600" />,
          link: "/hospital-notary-charlotte-nc"
        },
        {
          title: "After Hours Notary",
          description: <>Available for late-night and weekend signings in <strong>Cresswind, Fairhaven</strong>, and across the 28105 area when standard offices are closed.</>,
          icon: <Clock className="w-6 h-6 text-blue-600" />,
          link: "/after-hours-mobile-notary-charlotte-nc"
        },
        {
          title: "General Notary Services",
          description: <>Fast and reliable notarization for affidavits, vehicle titles, and school forms. We meet you at any <strong>Matthews</strong> location for your convenience.</>,
          icon: <ShieldCheck className="w-6 h-6 text-blue-600" />,
          link: "/general-notary-charlotte-nc"
        },
        {
          title: "Business & Corporate",
          description: <>Professional notary support for corporate contracts and employment documents. Serving businesses in <strong>Windsor Square</strong> and the <strong>Matthews</strong> area.</>,
          icon: <Laptop className="w-6 h-6 text-blue-600" />,
          link: "/services/business-documents"
        }
      ]}
      hospitalsIntro="Legal matters don't stop for medical emergencies. We provide compassionate, mobile notary services to patients and families at the primary healthcare hubs in the Matthews area:"
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
        "Olde Creek",
        "Stumptown Park",
        "Matthews Heritage Museum",
        "Windsor Square Shopping Center",
        "Sardis Plantation"
      ]}
      faqs={[
        {
          question: "Can you meet me at Brakeman's Coffee in Matthews?",
          answer: "Yes! We frequently meet clients at local favorites like Brakeman's Coffee, Carolina Beer Temple, and the Matthews Library for convenient signings."
        },
        {
          question: "Do you offer mobile notary services at Novant Health Matthews?",
          answer: "Absolutely. We provide prompt bedside notary services at Novant Health Matthews for medical directives, powers of attorney, and other urgent legal documents."
        },
        {
          question: "Are you available for after-hours notary in Matthews?",
          answer: "Yes, we offer 24/7 mobile notary services by appointment in Matthews, including evenings, weekends, and holidays."
        },
        {
          question: "How do I book a mobile notary in Matthews?",
          answer: "You can book directly through our website's booking tool or call/text us at 980-372-4103 for immediate assistance."
        }
      ]}
      mapEmbedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52125.41904712348!2d-80.71333335136719!3d35.12263590000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x885404566735661d%3A0x884650e6bfde5145!2sMatthews%2C%20NC!5e0!3m2!1sen!2sus!4v1712874600000!5m2!1sen!2sus"
    />
  );
}
