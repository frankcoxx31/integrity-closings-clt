import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar as CalendarIcon, Clock, MapPin, CheckCircle, ChevronLeft, ChevronRight, User, Phone, Mail, FileText } from 'lucide-react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday, addDays, startOfWeek, endOfWeek } from 'date-fns';

type Service = {
  id: string;
  name: string;
  duration: number;
  price: string;
  description: string;
};

const SERVICES: Service[] = [
  {
    id: 'general',
    name: 'General Notary Work',
    duration: 30,
    price: '$10 per signature + travel',
    description: 'Standard notarization for personal, business, or legal documents.'
  },
  {
    id: 'loan',
    name: 'Real Estate / Loan Signing',
    duration: 60,
    price: 'Custom Quote',
    description: 'Full loan package closings for buyers, sellers, and refinances.'
  },
  {
    id: 'hospital',
    name: 'Hospital / Facility Notary',
    duration: 45,
    price: '$10 per signature + travel',
    description: 'Specialized mobile service to hospitals, nursing homes, or assisted living.'
  },
  {
    id: 'other',
    name: 'Other / Not Sure',
    duration: 30,
    price: 'Varies',
    description: 'Select this if you are unsure what type of notarization you need.'
  }
];

// Generate available time slots (9 AM to 5 PM)
const generateTimeSlots = () => {
  const slots = [];
  for (let i = 9; i <= 17; i++) {
    const hour = i > 12 ? i - 12 : i;
    const ampm = i >= 12 ? 'PM' : 'AM';
    slots.push(`${hour}:00 ${ampm}`);
    if (i !== 17) {
      slots.push(`${hour}:30 ${ampm}`);
    }
  }
  return slots;
};

const TIME_SLOTS = generateTimeSlots();

export default function Booking() {
  const [step, setStep] = useState(1);
  
  // Form State
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    notes: ''
  });

  // Calendar State
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const handleNext = () => setStep(s => Math.min(s + 1, 4));
  const handleBack = () => setStep(s => Math.max(s - 1, 1));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send data to a backend
    console.log('Booking submitted:', { selectedService, selectedDate, selectedTime, formData });
    handleNext(); // Move to confirmation step
  };

  // Calendar Logic
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const dateFormat = "MMMM yyyy";
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const isDateDisabled = (date: Date) => {
    // Disable past dates and Sundays
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today || date.getDay() === 0;
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center text-slate-600 hover:text-blue-600 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </Link>
        
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
          {/* Header */}
          <div className="bg-blue-950 p-6 sm:p-8 text-white flex items-center gap-4">
            <div className="bg-blue-800 p-3 rounded-xl">
              <CalendarIcon className="w-8 h-8 text-blue-200" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold font-serif">Book an Appointment</h1>
              <p className="text-blue-200 mt-1">Schedule your mobile notary service online.</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-slate-50 border-b border-slate-200 px-6 py-4">
            <div className="flex items-center justify-between max-w-2xl mx-auto relative">
              {[
                { num: 1, label: 'Service' },
                { num: 2, label: 'Date & Time' },
                { num: 3, label: 'Details' },
                { num: 4, label: 'Done' }
              ].map((s, i) => (
                <div key={s.num} className="flex flex-col items-center relative z-10">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                    step >= s.num ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'
                  }`}>
                    {step > s.num ? <CheckCircle className="w-5 h-5" /> : s.num}
                  </div>
                  <span className={`text-xs mt-2 font-medium ${step >= s.num ? 'text-blue-900' : 'text-slate-500'}`}>
                    {s.label}
                  </span>
                </div>
              ))}
              {/* Connecting Lines */}
              <div className="absolute left-0 top-4 -translate-y-1/2 w-full h-1 bg-slate-200 -z-0 hidden sm:block"></div>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            {/* STEP 1: Select Service */}
            {step === 1 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <h2 className="text-xl font-bold text-slate-900 mb-6">What type of service do you need?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {SERVICES.map(service => (
                    <div 
                      key={service.id}
                      onClick={() => setSelectedService(service.id)}
                      className={`p-5 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedService === service.id 
                          ? 'border-blue-600 bg-blue-50' 
                          : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-slate-900">{service.name}</h3>
                        <span className="text-sm font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded">{service.duration} min</span>
                      </div>
                      <p className="text-sm text-slate-600 mb-3">{service.description}</p>
                      <p className="text-sm font-medium text-slate-900">{service.price}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex justify-end">
                  <button 
                    onClick={handleNext}
                    disabled={!selectedService}
                    className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Date & Time */}
            {step === 2 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <h2 className="text-xl font-bold text-slate-900 mb-6">Choose a Date & Time</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Calendar */}
                  <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                      <button onClick={prevMonth} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                        <ChevronLeft className="w-5 h-5 text-slate-600" />
                      </button>
                      <h3 className="font-bold text-lg text-slate-900">{format(currentMonth, dateFormat)}</h3>
                      <button onClick={nextMonth} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                        <ChevronRight className="w-5 h-5 text-slate-600" />
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                        <div key={day} className="text-center text-xs font-semibold text-slate-500 py-2">
                          {day}
                        </div>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-7 gap-1">
                      {days.map((day, i) => {
                        const disabled = isDateDisabled(day);
                        const isSelected = selectedDate && isSameDay(day, selectedDate);
                        const isCurrentMonth = isSameMonth(day, monthStart);
                        
                        return (
                          <button
                            key={i}
                            disabled={disabled}
                            onClick={() => {
                              setSelectedDate(day);
                              setSelectedTime(null); // Reset time when date changes
                            }}
                            className={`
                              aspect-square flex items-center justify-center rounded-full text-sm transition-all
                              ${!isCurrentMonth ? 'text-slate-300' : ''}
                              ${disabled ? 'text-slate-300 cursor-not-allowed bg-slate-50' : 'hover:bg-blue-100 text-slate-700'}
                              ${isSelected ? 'bg-blue-600 text-white hover:bg-blue-700 font-bold shadow-md' : ''}
                              ${isToday(day) && !isSelected ? 'border border-blue-600 text-blue-600 font-bold' : ''}
                            `}
                          >
                            {format(day, 'd')}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Time Slots */}
                  <div>
                    <h3 className="font-bold text-slate-900 mb-4 flex items-center">
                      <Clock className="w-5 h-5 mr-2 text-blue-600" />
                      {selectedDate ? format(selectedDate, 'EEEE, MMMM d') : 'Select a date first'}
                    </h3>
                    
                    {selectedDate ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-3 max-h-[320px] overflow-y-auto pr-2 custom-scrollbar">
                        {TIME_SLOTS.map(time => (
                          <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={`py-2 px-3 rounded-lg border text-sm font-medium transition-all ${
                              selectedTime === time 
                                ? 'border-blue-600 bg-blue-600 text-white shadow-md' 
                                : 'border-slate-200 text-slate-700 hover:border-blue-400 hover:bg-blue-50'
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="h-[320px] flex items-center justify-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50">
                        <p className="text-slate-500 text-center px-6">Please select a date from the calendar to view available times.</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-8 flex justify-between">
                  <button 
                    onClick={handleBack}
                    className="px-6 py-3 text-slate-600 font-bold rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    Back
                  </button>
                  <button 
                    onClick={handleNext}
                    disabled={!selectedDate || !selectedTime}
                    className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Details */}
            {step === 3 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <h2 className="text-xl font-bold text-slate-900 mb-6">Your Details</h2>
                
                <div className="bg-blue-50 rounded-xl p-4 mb-8 flex flex-col sm:flex-row gap-4 sm:items-center justify-between border border-blue-100">
                  <div>
                    <p className="text-sm text-blue-800 font-medium">Selected Appointment:</p>
                    <p className="font-bold text-blue-950">
                      {SERVICES.find(s => s.id === selectedService)?.name}
                    </p>
                    <p className="text-sm text-blue-900">
                      {selectedDate && format(selectedDate, 'MMMM d, yyyy')} at {selectedTime}
                    </p>
                  </div>
                  <button onClick={() => setStep(2)} className="text-sm text-blue-600 hover:underline font-medium">
                    Change
                  </button>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-semibold text-slate-700 mb-2">First Name *</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-slate-400" />
                        </div>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          required
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="pl-10 w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors"
                          placeholder="John"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-semibold text-slate-700 mb-2">Last Name *</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors"
                        placeholder="Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">Email Address *</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-slate-400" />
                        </div>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="pl-10 w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-2">Phone Number *</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="h-5 w-5 text-slate-400" />
                        </div>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="pl-10 w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors"
                          placeholder="(555) 123-4567"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="address" className="block text-sm font-semibold text-slate-700 mb-2">Meeting Address *</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <MapPin className="h-5 w-5 text-slate-400" />
                        </div>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          required
                          value={formData.address}
                          onChange={handleInputChange}
                          className="pl-10 w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors"
                          placeholder="123 Main St, Charlotte, NC 28202"
                        />
                      </div>
                      <p className="text-xs text-slate-500 mt-1">Where should the notary meet you?</p>
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="notes" className="block text-sm font-semibold text-slate-700 mb-2">Additional Notes (Optional)</label>
                      <div className="relative">
                        <div className="absolute top-3 left-3 pointer-events-none">
                          <FileText className="h-5 w-5 text-slate-400" />
                        </div>
                        <textarea
                          id="notes"
                          name="notes"
                          rows={3}
                          value={formData.notes}
                          onChange={handleInputChange}
                          className="pl-10 w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors"
                          placeholder="Any special instructions or details about the documents?"
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-between">
                    <button 
                      type="button"
                      onClick={handleBack}
                      className="px-6 py-3 text-slate-600 font-bold rounded-lg hover:bg-slate-100 transition-colors"
                    >
                      Back
                    </button>
                    <button 
                      type="submit"
                      className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Confirm Booking
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* STEP 4: Confirmation */}
            {step === 4 && (
              <div className="animate-in zoom-in-95 duration-500 text-center py-8">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold font-serif text-slate-900 mb-4">Booking Request Received!</h2>
                <p className="text-lg text-slate-600 mb-8 max-w-lg mx-auto">
                  Thank you, {formData.firstName}. We have received your appointment request for <strong>{selectedDate && format(selectedDate, 'MMMM d, yyyy')} at {selectedTime}</strong>.
                </p>
                <div className="bg-slate-50 rounded-xl p-6 max-w-md mx-auto text-left border border-slate-200 mb-8">
                  <h3 className="font-bold text-slate-900 mb-4 border-b pb-2">What happens next?</h3>
                  <ul className="space-y-3 text-sm text-slate-700">
                    <li className="flex items-start">
                      <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold mr-3 shrink-0">1</span>
                      We will review your request and calculate any applicable travel fees based on your address.
                    </li>
                    <li className="flex items-start">
                      <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold mr-3 shrink-0">2</span>
                      You will receive a confirmation email or text message shortly.
                    </li>
                    <li className="flex items-start">
                      <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold mr-3 shrink-0">3</span>
                      Our notary will meet you at your specified location at the scheduled time.
                    </li>
                  </ul>
                </div>
                <Link 
                  to="/"
                  className="inline-flex items-center justify-center px-8 py-3 bg-blue-950 text-white font-bold rounded-lg hover:bg-blue-900 transition-colors"
                >
                  Return to Home
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
