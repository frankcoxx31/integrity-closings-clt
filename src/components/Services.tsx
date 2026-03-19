export default function Services() {
  const services = [
    {
      title: 'Mobile Notary Services Charlotte NC',
      description: 'We travel to your home, office, or coffee shop for any notarization needs.',
      image: '/general-notary-work.png',
      link: '/mobile-notary-charlotte-nc'
    },
    {
      title: 'Loan Signing Agent Charlotte NC',
      description: 'Professional loan signing agent services for real estate transactions.',
      image: '/mobile-notary.jpg',
      link: '/services/mobile-loan-closings'
    },
    {
      title: 'Hospital & Nursing Home Notary',
      description: 'Compassionate bedside service for medical directives, POAs, and wills.',
      image: '/hospital.png',
      link: '/hospital-notary-charlotte-nc'
    },
    {
      title: 'Estate Planning & Power of Attorney Notarization',
      description: 'Specialized handling for wills, trusts, and power of attorney documents.',
      image: '/personal-documents.png',
      link: '/estate-planning-notary-charlotte-nc'
    },
    {
      title: 'After Hours Mobile Notary',
      description: 'Available for urgent signings during evenings, weekends, and holidays.',
      image: '/lender-sent-documents.png',
      link: '/services/special-considerations'
    }
  ];

  return (
    <section id="services" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Our Services</h2>
          <p className="mt-4 text-lg text-slate-600">We provide professional mobile notary and loan signing services in Charlotte, NC. Whether you need documents notarized at home, in a hospital, or at a business location, we come to you quickly and reliably.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-100 flex flex-col">
              <div className="mb-6 w-full h-40 rounded-lg overflow-hidden bg-slate-100">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
              <p className="text-slate-600 mb-6 flex-grow">{service.description}</p>
              <a href={service.link} className="text-blue-600 font-medium hover:text-blue-800 inline-flex items-center mt-auto">
                Learn more &rarr;
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
