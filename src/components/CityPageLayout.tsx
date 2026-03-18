import { Link } from 'react-router-dom';
import { MapPin, Phone } from 'lucide-react';
import React from 'react';

interface ServiceCard {
  title: string;
  description: React.ReactNode;
  icon: React.ReactNode;
}

interface HospitalCard {
  name: string;
  location: string;
  description: React.ReactNode;
}

interface CityPageLayoutProps {
  city: string;
  image: string;
  introText: React.ReactNode;
  services: ServiceCard[];
  hospitalsIntro: string;
  hospitals: HospitalCard[];
  additionalLocations: string[];
}

export default function CityPageLayout({ 
  city, 
  image, 
  introText, 
  services, 
  hospitalsIntro, 
  hospitals, 
  additionalLocations 
}: CityPageLayoutProps) {
  return (
    <div className="bg-white">
      {/* Header Section */}
      <div className="bg-blue-950 text-white py-16 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={image} alt={city} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-blue-950 mix-blend-multiply"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Integrity Closings CLT</h1>
          <p className="text-xl md:text-2xl text-blue-100">
            Professional Mobile Notary & Loan Signing Services in <span className="text-yellow-500 font-bold">{city}, NC</span>
          </p>
        </div>
      </div>

      {/* Intro & Services Section */}
      <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-blue-950 mb-6">Reliable Mobile Notary in {city}</h2>
          <p className="text-lg text-slate-700 leading-relaxed">
            {introText}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-md border-l-4 border-yellow-500 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-6">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-blue-950 mb-4">{service.title}</h3>
              <p className="text-slate-600 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Hospitals Section */}
      <div className="bg-slate-50 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-blue-950 mb-6">Serving Local Healthcare Facilities</h2>
            <p className="text-lg text-slate-700">
              {hospitalsIntro}
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6 mb-16">
            {hospitals.map((hospital, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
                <h3 className="text-xl font-bold text-blue-950 mb-1">{index + 1}. {hospital.name}</h3>
                <p className="text-slate-500 italic mb-4">Located in {hospital.location}</p>
                <p className="text-slate-700">{hospital.description}</p>
              </div>
            ))}
          </div>

          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-blue-950 mb-6 text-center">Additional Neighborhoods & Landmarks We Serve:</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-0 md:pl-8">
              {additionalLocations.map((location, index) => (
                <li key={index} className="flex items-center text-slate-700">
                  <MapPin className="w-5 h-5 text-yellow-500 mr-3 flex-shrink-0" />
                  {location}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 text-center px-4">
        <h2 className="text-3xl font-bold text-blue-950 mb-4">Ready to Schedule in {city}?</h2>
        <p className="text-lg text-slate-600 mb-2">Mobile and after-hours appointments are available to fit your busy schedule.</p>
        <div className="flex items-center justify-center gap-2 text-xl font-bold text-slate-800 mb-8">
          <Phone className="w-6 h-6 text-blue-600" />
          <span>Call or Text: 980-372-4103</span>
        </div>
        <a href="/booking" className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors">Book Appointment Now</a>
      </div>
    </div>
  );
}
