import React from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';

function ContactPage() {
  return (
    <div className="bg-white py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <FaEnvelope className="text-6xl text-red-600 mx-auto mb-4" />
          <h1 className="text-5xl font-bold text-gray-800 tracking-tight">
            Get In Touch
          </h1>
          <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions, feedback, or partnership inquiries? We'd love to hear from you. Reach out using the form below or through our contact details.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-16">
          <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Send Us a Message</h2>
            <form className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none text-sm"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none  text-sm"
                  placeholder="e.g., Ticket Inquiry"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows="5"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none text-sm"
                  placeholder="Write your message here..."
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className={"w-full flex justify-center items-center gap-2 px-6 py-3 border rounded-md font-medium text-white  bg-red-600 hover:bg-red-700"}> 
                      <FaPaperPlane className="mr-2" /> Send Message
                </button>
              </div>
            </form>
          </div>
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h2>
              <div className="space-y-4 text-sm text-gray-700">
                <div className="flex items-start gap-3">
                  <FaMapMarkerAlt className="text-red-500 mt-1 flex-shrink-0" size="1.1em" />
                  <div>
                    <h3 className="font-medium text-gray-800">Address</h3>
                    <p>123 Football Lane, Soccer City, SC 12345</p> 
                    <p>United Kingdom</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaPhone className="text-red-500 mt-1 flex-shrink-0" size="1.1em" />
                  <div>
                    <h3 className="font-medium text-gray-800">Phone</h3>
                    <span className="text-red-600 hover:text-red-800">+44 123 456 7890</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaEnvelope className="text-red-500 mt-1 flex-shrink-0" size="1.1em" />
                  <div>
                    <h3 className="font-medium text-gray-800">Email</h3>
                    <span className="text-red-600 hover:text-red-800">support@footyapp.example</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
               <h2 className="text-xl font-semibold text-gray-800 mb-4">Our Location</h2>
               <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.319095750351!2d-0.127758!3d51.507351!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604ce3cadd533%3A0x8e619ac2a87d36e!2sLondon%2C%20UK!5e0!3m2!1sen!2sus!4v16..."
                    width="100%"
                    height="300"
               ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;