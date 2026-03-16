import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, User, Mail, Phone, FileText, CheckCircle, ChevronRight, ChevronLeft } from 'lucide-react';

const services = [
  { id: 'general', name: 'General Notary Work', duration: '30 min', price: 'Varies' },
  { id: 'real-estate', name: 'Real Estate Closing', duration: '60 min', price: 'Varies' },
  { id: 'hospital', name: 'Hospital/Nursing Home', duration: '45 min', price: 'Varies' },
  { id: 'estate', name: 'Estate Planning Documents', duration: '45 min', price: 'Varies' },
];

const timeSlots = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
  '04:00 PM', '04:30 PM', '05:00 PM'
];

export default function Booking() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    service: '',
    date: '',
    time: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    notes: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceSelect = (serviceId: string) => {
    setFormData(prev => ({ ...prev, service: serviceId }));
    setStep(2);
  };

  const handleTimeSelect = (time: string) => {
    setFormData(prev => ({ ...prev, time }));
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
    }, 1000);
  };

  // Generate next 14 days for calendar
  const getNextDays = () => {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      // Skip Sundays (0)
      if (date.getDay() !== 0) {
        days.push(date);
      }
    }
    return days;
  };

  const availableDays = getNextDays();

  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-24 pb-12 bg-slate-50 flex items-center justify-center">
        <div className="max-w-md w-full mx-auto p-8 bg-white rounded-2xl shadow-sm border border-slate-100 text-center">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-emerald-600" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Booking Confirmed!</h2>
          <p className="text-slate-600 mb-8">
            Thank you for scheduling with Integrity Closings. We have received your request and will contact you shortly to confirm the details.
          </p>
          <button 
            onClick={() => window.location.href = '/'}
            className="w-full bg-blue-950 text-white font-bold py-3 px-6 rounded-xl hover:bg-blue-900 transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Schedule an Appointment</h1>
          <p className="text-lg text-slate-600">Book a mobile notary service at your convenience.</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 rounded-full -z-10"></div>
            <div 
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-blue-600 rounded-full -z-10 transition-all duration-300"
              style={{ width: `${((step - 1) / 2) * 100}%` }}
            ></div>
            
            {[1, 2, 3].map((num) => (
              <div 
                key={num}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-4 transition-colors ${
                  step >= num 
                    ? 'bg-blue-600 border-blue-100 text-white' 
                    : 'bg-white border-slate-200 text-slate-400'
                }`}
              >
                {num}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm font-medium text-slate-500 px-1">
            <span>Service</span>
            <span>Date & Time</span>
            <span>Details</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          
          {/* Step 1: Select Service */}
          {step === 1 && (
            <div className="p-6 sm:p-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Select a Service</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => handleServiceSelect(service.id)}
                    className={`p-6 rounded-xl border-2 text-left transition-all ${
                      formData.service === service.id 
                        ? 'border-blue-600 bg-blue-50' 
                        : 'border-slate-100 hover:border-blue-200 hover:bg-slate-50'
                    }`}
                  >
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{service.name}</h3>
                    <div className="flex items-center text-slate-500 text-sm space-x-4">
                      <span className="flex items-center"><Clock className="w-4 h-4 mr-1" /> {service.duration}</span>
                      <span className="flex items-center"><FileText className="w-4 h-4 mr-1" /> {service.price}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Select Date & Time */}
          {step === 2 && (
            <div className="p-6 sm:p-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Select Date & Time</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                {/* Date Selection */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                    <CalendarIcon className="w-5 h-5 mr-2 text-blue-600" /> Choose a Date
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    {availableDays.map((date, i) => {
                      const dateString = date.toISOString().split('T')[0];
                      const isSelected = formData.date === dateString;
                      return (
                        <button
                          key={i}
                          onClick={() => setFormData(prev => ({ ...prev, date: dateString }))}
                          className={`p-3 rounded-lg border text-center transition-colors ${
                            isSelected 
                              ? 'bg-blue-600 border-blue-600 text-white' 
                              : 'border-slate-200 hover:border-blue-300 text-slate-700'
                          }`}
                        >
                          <div className="text-xs uppercase font-semibold opacity-80">
                            {date.toLocaleDateString('en-US', { weekday: 'short' })}
                          </div>
                          <div className="text-lg font-bold">
                            {date.getDate()}
                          </div>
                          <div className="text-xs opacity-80">
                            {date.toLocaleDateString('en-US', { month: 'short' })}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Time Selection */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-blue-600" /> Choose a Time
                  </h3>
                  {formData.date ? (
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((time, i) => (
                        <button
                          key={i}
                          onClick={() => handleTimeSelect(time)}
                          className={`p-3 rounded-lg border text-center text-sm font-medium transition-colors ${
                            formData.time === time 
                              ? 'bg-blue-600 border-blue-600 text-white' 
                              : 'border-slate-200 hover:border-blue-300 text-slate-700'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center p-8 border-2 border-dashed border-slate-200 rounded-xl text-slate-500 text-center">
                      Please select a date first to see available times.
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between">
                <button 
                  onClick={prevStep}
                  className="px-6 py-2.5 rounded-xl font-medium text-slate-600 hover:bg-slate-100 transition-colors flex items-center"
                >
                  <ChevronLeft className="w-5 h-5 mr-1" /> Back
                </button>
                <button 
                  onClick={nextStep}
                  disabled={!formData.date || !formData.time}
                  className="px-6 py-2.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  Continue <ChevronRight className="w-5 h-5 ml-1" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Your Details */}
          {step === 3 && (
            <div className="p-6 sm:p-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Your Details</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="grid sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">First Name *</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-slate-400" />
                      </div>
                      <input
                        type="text"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="pl-10 w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                        placeholder="John"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Last Name *</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-slate-400" />
                      </div>
                      <input
                        type="text"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="pl-10 w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Email Address *</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-slate-400" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="pl-10 w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number *</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-slate-400" />
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="pl-10 w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Meeting Address *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 pt-3 pointer-events-none">
                      <MapPin className="h-5 w-5 text-slate-400" />
                    </div>
                    <textarea
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      rows={2}
                      className="pl-10 w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                      placeholder="Enter the full address where you'd like to meet..."
                    ></textarea>
                  </div>
                </div>

                <div className="mb-8">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Additional Notes (Optional)</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                    placeholder="Any special instructions or details about the documents..."
                  ></textarea>
                </div>

                {/* Summary Box */}
                <div className="bg-slate-50 p-6 rounded-xl mb-8 border border-slate-100">
                  <h3 className="font-bold text-slate-900 mb-4">Appointment Summary</h3>
                  <div className="space-y-2 text-sm text-slate-600">
                    <p><span className="font-semibold text-slate-800">Service:</span> {services.find(s => s.id === formData.service)?.name}</p>
                    <p><span className="font-semibold text-slate-800">Date:</span> {formData.date}</p>
                    <p><span className="font-semibold text-slate-800">Time:</span> {formData.time}</p>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
                  <button 
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-2.5 rounded-xl font-medium text-slate-600 hover:bg-slate-100 transition-colors flex items-center"
                  >
                    <ChevronLeft className="w-5 h-5 mr-1" /> Back
                  </button>
                  <button 
                    type="submit"
                    className="px-8 py-3 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
                  >
                    Confirm Booking
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
