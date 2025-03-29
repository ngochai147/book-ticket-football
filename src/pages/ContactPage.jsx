// src/components/ContactPage.js
import React, { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';

function ContactPage() {
  // State for form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  // State for submission status
  const [submissionStatus, setSubmissionStatus] = useState({
    submitted: false,
    error: false,
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default browser submission
    setIsSubmitting(true);
    setSubmissionStatus({ submitted: false, error: false, message: '' }); // Reset status

    // --- Simulate API Call ---
    // In a real app, replace this with your actual form submission logic
    // (e.g., sending data to your backend or a service like Formspree/Netlify Forms)
    console.log('Form Data Submitted:', formData);
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay

    // --- Handle Response (Example) ---
    const success = Math.random() > 0.2; // Simulate 80% success rate

    if (success) {
      setSubmissionStatus({
        submitted: true,
        error: false,
        message: 'Thank you for your message! We\'ll get back to you soon.',
      });
      // Clear the form
      setFormData({ name: '', email: '', subject: '', message: '' });
    } else {
      setSubmissionStatus({
        submitted: true,
        error: true,
        message: 'Sorry, there was an error sending your message. Please try again later.',
      });
    }
    setIsSubmitting(false);
    // --- End Simulation ---
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <FaEnvelope className="text-5xl md:text-6xl text-red-600 mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 tracking-tight">
            Get In Touch
          </h1>
          <p className="mt-3 text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions, feedback, or partnership inquiries? We'd love to hear from you. Reach out using the form below or through our contact details.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">

          {/* Contact Form Section */}
          <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Input */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition text-sm"
                  placeholder="John Doe"
                />
              </div>

              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition text-sm"
                  placeholder="you@example.com"
                />
              </div>

              {/* Subject Input */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition text-sm"
                  placeholder="e.g., Ticket Inquiry"
                />
              </div>

              {/* Message Textarea */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition text-sm resize-none"
                  placeholder="Write your message here..."
                ></textarea>
              </div>

              {/* Submission Feedback */}
               {submissionStatus.submitted && (
                    <div className={`text-sm p-3 rounded-md ${
                        submissionStatus.error
                            ? 'bg-red-100 text-red-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                    >
                       {submissionStatus.message}
                    </div>
                )}

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex justify-center items-center gap-2 px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-red-600 hover:bg-red-700'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="mr-2" /> Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Contact Information Section */}
          <div className="space-y-8">
            {/* Contact Details Card */}
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h2>
              <div className="space-y-4 text-sm text-gray-700">
                <div className="flex items-start gap-3">
                  <FaMapMarkerAlt className="text-red-500 mt-1 flex-shrink-0" size="1.1em" />
                  <div>
                    <h3 className="font-medium text-gray-800">Address</h3>
                    <p>123 Football Lane, Soccer City, SC 12345</p> {/* Replace with actual address */}
                    <p>United Kingdom</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaPhone className="text-red-500 mt-1 flex-shrink-0" size="1.1em" />
                  <div>
                    <h3 className="font-medium text-gray-800">Phone</h3>
                    <a href="tel:+441234567890" className="text-red-600 hover:text-red-800 transition-colors">+44 123 456 7890</a> {/* Replace */}
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaEnvelope className="text-red-500 mt-1 flex-shrink-0" size="1.1em" />
                  <div>
                    <h3 className="font-medium text-gray-800">Email</h3>
                    <a href="mailto:support@footyapp.example" className="text-red-600 hover:text-red-800 transition-colors">support@footyapp.example</a> {/* Replace */}
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder Card */}
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
               <h2 className="text-xl font-semibold text-gray-800 mb-4">Our Location</h2>
               {/* --- Map Integration Placeholder --- */}
               {/* Replace this div with your actual map embed code or React map component */}
               {/* Example using Google Maps Embed API: */}
               {/* <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.319095750351!2d-0.127758!3d51.507351!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604ce3cadd533%3A0x8e619ac2a87d36e!2sLondon%2C%20UK!5e0!3m2!1sen!2sus!4v16..."
                    width="100%"
                    height="300"
                    style={{ border:0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Location Map"
               ></iframe> */}
               <div className="aspect-video bg-gray-200 rounded flex items-center justify-center text-gray-500">
                   Map Placeholder - Integrate Google Maps or similar here
               </div>
               {/* --- End Map Placeholder --- */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;