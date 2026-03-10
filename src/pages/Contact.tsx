import { Mail, MapPin, Phone } from "lucide-react";

export default function Contact() {
  return (
    <div className="bg-white pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <h1 className="text-4xl font-bold mb-6">Get in touch</h1>
            <p className="text-xl text-neutral-600 mb-12">
              Our team is ready to help you build your financial infrastructure.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Email us</h3>
                  <p className="text-neutral-600 mb-1">For general inquiries:</p>
                  <a href="mailto:hello@upfrica.africa" className="text-indigo-600 font-medium">hello@upfrica.africa</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Office</h3>
                  <p className="text-neutral-600">
                    123 Innovation Drive<br />
                    Lagos, Nigeria
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Call us</h3>
                  <p className="text-neutral-600">
                    Mon-Fri from 8am to 5pm.
                  </p>
                  <a href="tel:+2341234567890" className="text-indigo-600 font-medium">+234 123 456 7890</a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-neutral-50 p-8 rounded-2xl border border-neutral-200">
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Full Name</label>
                <input type="text" className="w-full rounded-lg border-neutral-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border" />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Email Address</label>
                <input type="email" className="w-full rounded-lg border-neutral-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border" />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Message</label>
                <textarea rows={4} className="w-full rounded-lg border-neutral-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border"></textarea>
              </div>
              <button type="submit" className="w-full py-3 px-4 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
