import { Link } from 'react-router-dom';
export default function Charlotte() {
  return (
    <div className="font-sans text-[#333] leading-relaxed bg-white">
      <header className="bg-[#2c3e50] text-white py-10 px-4 text-center">
        <h1 className="text-4xl font-bold mb-2 text-white">Mobile Notary Charlotte, NC</h1>
        <p className="text-lg mb-6">Professional Notary Services Delivered to Your Location</p>
        <a 
          href="tel:9803724103" 
          className="inline-block px-10 py-4 bg-[#e67e22] hover:bg-[#d35400] text-white font-bold rounded transition-colors mt-6"
        >
          Call (980) 372-4103
        </a>
      </header>

      <div className="max-w-[900px] mx-auto my-8 px-6">
        <section>
          <h2 className="text-2xl font-bold text-[#2c3e50] mb-4">Your Local Queen City Notary Partner</h2>
          <p>
            Skip the trip to the bank and avoid the Charlotte traffic. Whether you're finalizing a corporate contract in <strong>Uptown</strong> or signing medical directives near <strong>Atrium Health</strong>, we provide reliable, professional mobile notary services tailored to your schedule.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
          <div className="bg-[#f9f9f9] p-6 border-l-[5px] border-[#2c3e50] rounded">
            <h4 className="font-bold text-lg mb-2 text-[#2c3e50]">Real Estate & Loans</h4>
            <p>Certified signing agent for refinances, HELOCs, and title transfers.</p>
          </div>
          <div className="bg-[#f9f9f9] p-6 border-l-[5px] border-[#2c3e50] rounded">
            <h4 className="font-bold text-lg mb-2 text-[#2c3e50]">Wills & Trusts</h4>
            <p>Secure notarization for power of attorney and estate planning.</p>
          </div>
          <div className="bg-[#f9f9f9] p-6 border-l-[5px] border-[#2c3e50] rounded">
            <h4 className="font-bold text-lg mb-2 text-[#2c3e50]">General Notary</h4>
            <p>Quick service for affidavits, I-9 verifications, and minor travel consents.</p>
          </div>
        </div>

        <hr className="border-0 h-px bg-[#eee] my-12" />

        <section className="bg-[#ecf0f1] p-8 rounded-lg mt-12">
          <h3 className="text-xl font-bold text-[#2c3e50] mb-4">Areas & Landmarks We Serve</h3>
          <p className="mb-6">We travel throughout Mecklenburg County and the surrounding Charlotte metro area, including:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <strong className="block mb-2 text-[#333]">Neighborhoods:</strong>
              <ul className="list-disc pl-5 space-y-1">
                <li>Ballantyne & Piper Glen</li>
                <li>South End & Dilworth</li>
                <li>NoDa & Plaza Midwood</li>
                <li>University City & Steele Creek</li>
                <li>Myers Park & SouthPark</li>
              </ul>
            </div>
            <div>
              <strong className="block mb-2 text-[#333]">Landmarks We Meet At:</strong>
              <ul className="list-disc pl-5 space-y-1">
                <li>Uptown Corporate Offices</li>
                <li>Charlotte Douglas Airport (CLT)</li>
                <li>Bank of America Stadium Area</li>
                <li>The Arboretum Shopping Center</li>
                <li>Birkdale Village (Huntersville)</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <span className="inline-block bg-white px-3 py-1 rounded-[20px] text-[0.9rem] border border-[#bdc3c7] text-[#7f8c8d]">Matthews</span>
            <span className="inline-block bg-white px-3 py-1 rounded-[20px] text-[0.9rem] border border-[#bdc3c7] text-[#7f8c8d]">Mint Hill</span>
            <span className="inline-block bg-white px-3 py-1 rounded-[20px] text-[0.9rem] border border-[#bdc3c7] text-[#7f8c8d]">Pineville</span>
            <span className="inline-block bg-white px-3 py-1 rounded-[20px] text-[0.9rem] border border-[#bdc3c7] text-[#7f8c8d]">Davidson</span>
            <span className="inline-block bg-white px-3 py-1 rounded-[20px] text-[0.9rem] border border-[#bdc3c7] text-[#7f8c8d]">Cornelius</span>
          </div>
        </section>

        <hr className="border-0 h-px bg-[#eee] my-12" />

        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-[#2c3e50] mb-4">Ready to Secure Your Notarization?</h2>
          <p className="mb-8">Schedule your appointment online in seconds. Fast, secure, and professional.</p>
          <a href="/booking" className="inline-block px-6 py-3 bg-[#3498db] text-white no-underline font-bold rounded-[5px] hover:bg-[#2980b9] transition-colors">Book Your Appointment Online</a>
        </div>
      </div>

      <footer className="bg-[#2c3e50] text-white text-center p-8 mt-16">
        <p>&copy; 2026 Mobile Notary Charlotte NC</p>
        <p><small>Providing 100% Mobile Services in Charlotte, NC & Surrounding Areas</small></p>
      </footer>
    </div>
  );
}
