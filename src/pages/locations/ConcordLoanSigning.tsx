import LoanSigningCityLayout from '../../components/LoanSigningCityLayout';

export default function ConcordLoanSigning() {
  return (
    <LoanSigningCityLayout
      location="Concord"
      h1="Concord Loan Signing Agent"
      image="/concord-nc-hero.webp"
      heroText="Mobile loan signing services in the City of Concord, NC — the Cabarrus County seat. Professional mortgage document facilitation for refinances, purchases, and residential closings, recorded right at the county Register of Deeds downtown."
      overviewText={
        <>
          <p>Securing a dependable <strong>loan signing agent in Concord, NC</strong> is a critical component of any successful real estate transaction. As the <strong>Cabarrus County seat</strong>, Concord is where deeds and deeds of trust are recorded — the <strong>Cabarrus County Register of Deeds</strong> sits in the Governmental Center on Church Street downtown, so a clean, correctly executed package here keeps your recording on schedule.</p>
          <p>I cover the City of Concord end to end: from <strong>Historic Downtown Concord</strong> and <strong>Afton Village</strong> to the newer subdivisions along Poplar Tent and George W. Liles Parkway, and the neighborhoods around <strong>Atrium Health Cabarrus</strong> and <strong>Concord Mills</strong>. For county-wide coverage beyond the city — Kannapolis, Harrisburg, Midland, and Mount Pleasant — see my <a href="/locations/cabarrus-county-loan-signing-agent" className="text-brand-600 font-bold hover:underline">Cabarrus County loan signing</a> page.</p>
        </>
      }
      coverageAreas={[
        "Historic Downtown Concord",
        "Afton Village",
        "Concord Mills",
        "Poplar Tent",
        "George W. Liles Pkwy",
        "Atrium Health Cabarrus area",
        "Rocky River",
        "Coddle Creek"
      ]}
      nearbyAreas={[
        { name: "Cabarrus County (county-wide)", link: "/locations/cabarrus-county-loan-signing-agent" },
        { name: "Concord (general notary)", link: "/locations/concord" },
        { name: "Charlotte", link: "/locations/charlotte" },
        { name: "Salisbury", link: "/locations/salisbury" }
      ]}
      faqs={[
        {
          question: "Where are Concord deeds recorded after a closing?",
          answer: "Deeds and deeds of trust for property in Concord are recorded at the Cabarrus County Register of Deeds, located in the Governmental Center on Church Street in downtown Concord. That is why flawless execution at the signing matters — a rejected page delays recording at the county office."
        },
        {
          question: "Can you meet at a borrower's workplace in downtown Concord?",
          answer: "Yes, I often meet borrowers at their offices or workplaces in downtown Concord and the Concord Mills business parks to make the signing process as convenient as possible during business hours."
        },
        {
          question: "How long does a typical loan signing in Concord take?",
          answer: "A standard purchase or refinance signing usually takes 45 to 60 minutes, depending on the complexity of the loan package and the number of signers."
        }
      ]}
      mapEmbedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d208532.4014165584!2d-80.579!3d35.408!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8854045f2dc85e4d%3A0xedc9d23315a676f!2sConcord%2C%20NC!5e0!3m2!1sen!2sus!4v1712874200000!5m2!1sen!2sus"
      metaDescription="Mobile loan signing agent in the City of Concord, NC — refinance, purchase, and seller signings recorded at the Cabarrus County Register of Deeds downtown."
    />
  );
}
