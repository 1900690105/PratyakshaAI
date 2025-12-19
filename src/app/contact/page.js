"use client";
import React, { useState } from "react";
import {
  Shield,
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  HelpCircle,
  Briefcase,
  Users,
  Menu,
  X,
  Sun,
  Moon,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";

const ContactPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      details: "nikhilkandhare22@gmail.com",
      subtext: "We'll respond within 24 hours",
      color: "emerald",
    },
    {
      icon: Phone,
      title: "Call Us",
      details: "+91 9112430021",
      subtext: "Mon-Fri from 9am to 6pm IST",
      color: "blue",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: "Shivaji Nager,Pune, Maharashtra",
      subtext: "India - 411005",
      color: "purple",
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: "Mon - Fri: 9am - 6pm",
      subtext: "Weekend support available",
      color: "amber",
    },
  ];

  const departments = [
    {
      icon: HelpCircle,
      title: "General Support",
      description: "Get help with app features and account issues",
      email: "nikhilkandhare22@gmail.com",
    },
    {
      icon: Briefcase,
      title: "Business Inquiries",
      description: "Partnership and enterprise solutions",
      email: "nikhilkandhare22@gmail.com",
    },
    {
      icon: MessageSquare,
      title: "Media & Press",
      description: "Press releases and media inquiries",
      email: "nikhilkandhare22@gmail.com",
    },
    {
      icon: Users,
      title: "Careers",
      description: "Join our team and make an impact",
      email: "nikhilkandhare22@gmail.com",
    },
  ];

  const faqs = [
    {
      question: "How accurate is the food scanning?",
      answer:
        "Our AI has 95% accuracy in identifying ingredients and analyzing nutritional content.",
    },
    {
      question: "Is PratyakshaAI free to use?",
      answer:
        "Yes! We offer a free tier with basic features. Premium plans unlock advanced analytics.",
    },
    {
      question: "What types of food can I scan?",
      answer:
        "You can scan packaged foods, restaurant menus, and even handwritten ingredient lists.",
    },
    {
      question: "How do I report an incorrect scan?",
      answer:
        "Use the feedback button in the app after each scan to help us improve accuracy.",
    },
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-[#0D1117] text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Navigation */}
      <nav
        className={`sticky top-0 z-50 ${
          darkMode
            ? "bg-[#161B22] border-[#2D3748]"
            : "bg-white border-gray-200"
        } border-b`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Shield className="w-8 h-8 text-[#0EAD69]" />
              <span className="text-xl font-bold">PratyakshaAI</span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <Link
                href="/"
                className={`${
                  darkMode
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-700 hover:text-gray-900"
                } transition`}
              >
                Home
              </Link>
              <Link
                href="/about"
                className={`${
                  darkMode
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-700 hover:text-gray-900"
                } transition`}
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className={`${
                  darkMode
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-700 hover:text-gray-900"
                } transition`}
              >
                Contact Us
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg ${
                  darkMode ? "hover:bg-[#1E2329]" : "hover:bg-gray-100"
                }`}
              >
                {darkMode ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>

              <button
                onClick={() => {
                  window.location.href = `/auth/login`;
                }}
                className="hidden md:block bg-[#0EAD69] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#0c9558] transition"
              >
                Get Started
              </button>

              <button
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            className={`md:hidden ${
              darkMode ? "bg-[#1E2329]" : "bg-gray-50"
            } border-t ${darkMode ? "border-[#2D3748]" : "border-gray-200"}`}
          >
            <div className="px-4 py-4 space-y-3">
              <a href="#" className="block py-2">
                Home
              </a>
              <a href="#" className="block py-2">
                About Us
              </a>
              <a href="#" className="block py-2">
                Features
              </a>
              <a href="#" className="block py-2 text-[#0EAD69] font-semibold">
                Contact
              </a>
              <button className="w-full bg-[#0EAD69] text-white px-6 py-2 rounded-full font-semibold mt-4">
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-[#0EAD69]/10 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 relative">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Get in <span className="text-[#0EAD69]">Touch</span>
            </h1>
            <p
              className={`text-lg lg:text-xl ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Have questions? We&#39;d love to hear from you. Send us a message
              and we&#39;ll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div
                  key={index}
                  className={`${
                    darkMode
                      ? "bg-[#161B22] border-[#2D3748]"
                      : "bg-white border-gray-200"
                  } rounded-xl p-6 border hover:shadow-lg transition`}
                >
                  <div className="p-3 bg-[#0EAD69]/10 rounded-lg inline-block mb-4">
                    <Icon className="w-6 h-6 text-[#0EAD69]" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{info.title}</h3>
                  <p className="text-[#0EAD69] font-semibold mb-1">
                    {info.details}
                  </p>
                  <p
                    className={`text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {info.subtext}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Contact Form Section */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
              <p
                className={`mb-8 ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Fill out the form below and our team will get back to you within
                24 hours.
              </p>

              {submitted ? (
                <div
                  className={`${
                    darkMode
                      ? "bg-green-500/10 border-green-500/30"
                      : "bg-green-50 border-green-200"
                  } border rounded-xl p-6 text-center`}
                >
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                  <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
                    Thank you for contacting us. We&#39;ll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 rounded-lg border ${
                        darkMode
                          ? "bg-[#161B22] border-[#2D3748] text-white"
                          : "bg-white border-gray-300"
                      } focus:outline-none focus:ring-2 focus:ring-[#0EAD69]`}
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className={`w-full px-4 py-3 rounded-lg border ${
                          darkMode
                            ? "bg-[#161B22] border-[#2D3748] text-white"
                            : "bg-white border-gray-300"
                        } focus:outline-none focus:ring-2 focus:ring-[#0EAD69]`}
                        placeholder="john@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          darkMode
                            ? "bg-[#161B22] border-[#2D3748] text-white"
                            : "bg-white border-gray-300"
                        } focus:outline-none focus:ring-2 focus:ring-[#0EAD69]`}
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Subject *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 rounded-lg border ${
                        darkMode
                          ? "bg-[#161B22] border-[#2D3748] text-white"
                          : "bg-white border-gray-300"
                      } focus:outline-none focus:ring-2 focus:ring-[#0EAD69]`}
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="business">Business Partnership</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows="6"
                      className={`w-full px-4 py-3 rounded-lg border ${
                        darkMode
                          ? "bg-[#161B22] border-[#2D3748] text-white"
                          : "bg-white border-gray-300"
                      } focus:outline-none focus:ring-2 focus:ring-[#0EAD69] resize-none`}
                      placeholder="Tell us how we can help you..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#0EAD69] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#0c9558] transition flex items-center justify-center gap-2"
                  >
                    Send Message <Send className="w-5 h-5" />
                  </button>
                </form>
              )}
            </div>

            {/* Departments */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Contact Departments</h2>
              <p
                className={`mb-8 ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Reach out to the right team for faster assistance.
              </p>

              <div className="space-y-4">
                {departments.map((dept, index) => {
                  const Icon = dept.icon;
                  return (
                    <div
                      key={index}
                      className={`${
                        darkMode
                          ? "bg-[#161B22] border-[#2D3748]"
                          : "bg-white border-gray-200"
                      } rounded-xl p-6 border hover:shadow-lg transition`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-[#0EAD69]/10 rounded-lg">
                          <Icon className="w-6 h-6 text-[#0EAD69]" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-lg mb-1">
                            {dept.title}
                          </h3>
                          <p
                            className={`text-sm mb-2 ${
                              darkMode ? "text-gray-400" : "text-gray-600"
                            }`}
                          >
                            {dept.description}
                          </p>
                          <a
                            href={`mailto:${dept.email}`}
                            className="text-[#0EAD69] text-sm font-semibold hover:underline"
                          >
                            {dept.email}
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        className={`${darkMode ? "bg-[#161B22]" : "bg-gray-50"} py-16 lg:py-20`}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p
              className={`text-lg ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Quick answers to common questions
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`${
                  darkMode
                    ? "bg-[#0D1117] border-[#2D3748]"
                    : "bg-white border-gray-200"
                } rounded-xl p-6 border`}
              >
                <h3 className="font-bold text-lg mb-2">{faq.question}</h3>
                <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
              Can&#39;t find what you&#39;re looking for?{" "}
              <a
                href="#"
                className="text-[#0EAD69] font-semibold hover:underline"
              >
                Visit our Help Center
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Visit Our Office</h2>
            <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
              We&#39;d love to meet you in person
            </p>
          </div>

          <div
            className={`${
              darkMode
                ? "bg-[#161B22] border-[#2D3748]"
                : "bg-gray-100 border-gray-200"
            } rounded-xl border overflow-hidden h-96 flex items-center justify-center`}
          >
            <div className="text-center">
              <MapPin className="w-16 h-16 text-[#0EAD69] mx-auto mb-4" />
              <p
                className={`text-lg font-semibold mb-2 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                PratyakshaAI Headquarters
              </p>
              <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
                Shivaji Nager, Pune,Maharashtra, India - 411005
              </p>
              <button
                onClick={() => {
                  window.location.href = `https://maps.app.goo.gl/csGoikBLStsUGWv58`;
                }}
                className="mt-4 text-[#0EAD69] font-semibold hover:underline"
              >
                Open in Google Maps →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`${
          darkMode
            ? "bg-[#161B22] border-[#2D3748]"
            : "bg-gray-900 border-gray-800"
        } text-white border-t py-12`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-8 h-8 text-[#0EAD69]" />
                <span className="text-xl font-bold">PratyakshaAI</span>
              </div>
              <p className="text-gray-400 text-sm">
                Empowering healthier choices through AI-powered food
                intelligence.
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    API
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Press
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>© 2025 PratyakshaAI. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition">
                Twitter
              </a>
              <a href="#" className="hover:text-white transition">
                LinkedIn
              </a>
              <a href="#" className="hover:text-white transition">
                Instagram
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ContactPage;
