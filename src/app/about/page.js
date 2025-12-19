"use client";
import React, { useState } from "react";
import {
  Shield,
  Eye,
  Heart,
  Sparkles,
  Users,
  Target,
  Award,
  TrendingUp,
  Leaf,
  Brain,
  Globe,
  ChevronRight,
  Menu,
  X,
  Sun,
  Moon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const AboutUsPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const teamMembers = [
    {
      name: "Nikhil V Kandhare",
      role: "Founder & CEO",
      image: "NK",
      img: "/nikhil.png",
      bio: "I develop scalable, intelligent applications using Next.js, Firebase, React, and AI tools — blending front-end precision with back-end logic.",
    },
    {
      name: "Saraswati Adkine",
      role: "CTO",
      image: "SA",
      img: "/saraswati.png",
      bio: "Passionate about creating innovative solutions with a growth mindset and dedication to excellence.",
    },
  ];

  const values = [
    {
      icon: Shield,
      title: "Transparency",
      description:
        "We believe in complete transparency about what goes into your food and how our AI works.",
    },
    {
      icon: Heart,
      title: "Health First",
      description:
        "Your wellbeing is our priority. Every feature is designed with your health in mind.",
    },
    {
      icon: Brain,
      title: "AI-Powered",
      description:
        "Cutting-edge artificial intelligence that learns and improves to serve you better.",
    },
    {
      icon: Leaf,
      title: "Sustainability",
      description:
        "Promoting conscious consumption and environmentally friendly food choices.",
    },
  ];

  const milestones = [
    {
      year: "2022",
      title: "Founded",
      description:
        "PratyakshaAI was born from a vision to democratize food transparency",
    },
    {
      year: "2023",
      title: "100K Users",
      description: "Reached our first major milestone with users across India",
    },
    {
      year: "2024",
      title: "AI Evolution",
      description: "Launched advanced ingredient analysis with 95% accuracy",
    },
    {
      year: "2025",
      title: "Going Global",
      description:
        "Expanding to international markets with multilingual support",
    },
  ];

  const stats = [
    { value: "500K+", label: "Active Users" },
    { value: "2M+", label: "Products Scanned" },
    { value: "95%", label: "AI Accuracy" },
    { value: "150+", label: "Health Partners" },
  ];

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
              <Link href={"/"}>
                {" "}
                <Image src={"/cutlogo.png"} alt="logo" width={50} height={50} />
              </Link>
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
              <Link href={"/about"} className="text-[#0EAD69] font-semibold">
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
              <Link
                href="/dashboard"
                className={`${
                  darkMode
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-700 hover:text-gray-900"
                } transition`}
              >
                Dashboard
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

              <button className="hidden md:block bg-[#0EAD69] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#0c9558] transition">
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
              <Link href={"/"} className="block py-2">
                Home
              </Link>
              <Link
                href={"/about"}
                className="block py-2 text-[#0EAD69] font-semibold"
              >
                About Us
              </Link>
              <Link href={"/dashboard"} className="block py-2">
                Dashboard
              </Link>
              <Link href={"/"} className="block py-2">
                Contact
              </Link>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-[#0EAD69]/10 px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-[#0EAD69]" />
              <span className="text-sm font-semibold text-[#0EAD69]">
                About PratyakshaAI
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Empowering You with
              <span className="text-[#0EAD69]"> Food Intelligence</span>
            </h1>

            <p
              className={`text-lg lg:text-xl ${
                darkMode ? "text-gray-400" : "text-gray-600"
              } max-w-3xl mx-auto mb-8`}
            >
              We&#39;re on a mission to transform how people understand and
              interact with their food. Using cutting-edge AI technology, we
              make food transparency accessible to everyone.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-[#0EAD69] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#0c9558] transition flex items-center gap-2">
                Join Our Mission <ChevronRight className="w-5 h-5" />
              </button>
              <button
                className={`${
                  darkMode
                    ? "bg-[#161B22] hover:bg-[#1E2329]"
                    : "bg-gray-100 hover:bg-gray-200"
                } px-8 py-3 rounded-full font-semibold transition`}
              >
                Watch Video
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        className={`${darkMode ? "bg-[#161B22]" : "bg-gray-50"} py-12 lg:py-16`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-[#0EAD69] mb-2">
                  {stat.value}
                </div>
                <div
                  className={`text-sm lg:text-base ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-lg">
                <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
                  PratyakshaAI was founded in 2022 with a simple yet powerful
                  vision: to give everyone the power to make informed decisions
                  about their food.
                </p>
                <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
                  What started as a small team of passionate technologists and
                  nutritionists has grown into a movement. We&#39;ve helped over
                  500,000 people understand what&#39;s really in their food,
                  detect harmful ingredients, and make healthier choices.
                </p>
                <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
                  Our AI-powered platform analyzes millions of products,
                  providing instant insights into ingredients, nutritional
                  value, and personalized health recommendations. We believe
                  that food transparency shouldn&#39;t be a privilege—it should
                  be a right.
                </p>
              </div>
            </div>

            <div className="relative">
              <div
                className={`${
                  darkMode
                    ? "bg-[#161B22]"
                    : "bg-linear-to-br from-emerald-50 to-teal-50"
                } rounded-2xl p-8 lg:p-12`}
              >
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-[#0EAD69]/20 rounded-lg">
                      <Eye className="w-6 h-6 text-[#0EAD69]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">Vision</h3>
                      <p
                        className={`text-sm ${
                          darkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        A world where everyone has instant access to complete
                        food transparency
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-[#0EAD69]/20 rounded-lg">
                      <Target className="w-6 h-6 text-[#0EAD69]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">Mission</h3>
                      <p
                        className={`text-sm ${
                          darkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        Empower individuals with AI-driven insights to make
                        healthier food choices
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-[#0EAD69]/20 rounded-lg">
                      <Award className="w-6 h-6 text-[#0EAD69]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">Impact</h3>
                      <p
                        className={`text-sm ${
                          darkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        Helping millions lead healthier lives through informed
                        food decisions
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section
        className={`${darkMode ? "bg-[#161B22]" : "bg-gray-50"} py-16 lg:py-24`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Our Core Values
            </h2>
            <p
              className={`text-lg ${
                darkMode ? "text-gray-400" : "text-gray-600"
              } max-w-2xl mx-auto`}
            >
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className={`${
                    darkMode ? "bg-[#0D1117]" : "bg-white"
                  } rounded-xl p-6 border ${
                    darkMode ? "border-[#2D3748]" : "border-gray-200"
                  } hover:shadow-lg transition`}
                >
                  <div className="p-3 bg-[#0EAD69]/10 rounded-lg inline-block mb-4">
                    <Icon className="w-8 h-8 text-[#0EAD69]" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Our Journey</h2>
            <p
              className={`text-lg ${
                darkMode ? "text-gray-400" : "text-gray-600"
              } max-w-2xl mx-auto`}
            >
              Key milestones in our mission to revolutionize food transparency
            </p>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-[#0EAD69]/20" />

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`relative grid lg:grid-cols-2 gap-8 ${
                    index % 2 === 0 ? "" : "lg:flex-row-reverse"
                  }`}
                >
                  <div
                    className={`${
                      index % 2 === 0 ? "lg:text-right" : "lg:col-start-2"
                    }`}
                  >
                    <div
                      className={`${
                        darkMode ? "bg-[#161B22]" : "bg-white"
                      } rounded-xl p-6 border ${
                        darkMode ? "border-[#2D3748]" : "border-gray-200"
                      } inline-block`}
                    >
                      <div className="text-[#0EAD69] font-bold text-2xl mb-2">
                        {milestone.year}
                      </div>
                      <h3 className="text-xl font-bold mb-2">
                        {milestone.title}
                      </h3>
                      <p
                        className={darkMode ? "text-gray-400" : "text-gray-600"}
                      >
                        {milestone.description}
                      </p>
                    </div>
                  </div>

                  <div className="hidden lg:flex absolute left-1/2 top-8 transform -translate-x-1/2 w-4 h-4 bg-[#0EAD69] rounded-full border-4 border-white dark:border-[#0D1117]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section
        className={`${darkMode ? "bg-[#161B22]" : "bg-gray-50"} py-16 lg:py-24`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Meet Our Team
            </h2>
            <p
              className={`text-lg ${
                darkMode ? "text-gray-400" : "text-gray-600"
              } max-w-2xl mx-auto`}
            >
              Passionate experts dedicated to your health and wellbeing
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className={`${
                  darkMode ? "bg-[#0D1117]" : "bg-white"
                } rounded-xl p-6 border ${
                  darkMode ? "border-[#2D3748]" : "border-gray-200"
                } text-center hover:shadow-lg transition`}
              >
                <div className="w-24 h-24 rounded-full bg-linear-to-br from-emerald-400 to-teal-500 mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                  <Image
                    src={member.img}
                    alt={member.name}
                    width={100}
                    height={100}
                    className="w-24 h-24 rounded-full "
                  />
                </div>
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-[#0EAD69] font-semibold mb-3">
                  {member.role}
                </p>
                <p
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className={`${
              darkMode
                ? "bg-linear-to-br from-[#0EAD69]/20 to-teal-500/20"
                : "bg-linear-to-br from-emerald-50 to-teal-50"
            } rounded-2xl p-8 lg:p-12`}
          >
            <Globe className="w-16 h-16 text-[#0EAD69] mx-auto mb-6" />
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Join Our Mission
            </h2>
            <p
              className={`text-lg ${
                darkMode ? "text-gray-400" : "text-gray-600"
              } mb-8 max-w-2xl mx-auto`}
            >
              Be part of the food transparency revolution. Download PratyakshaAI
              today and start making informed, healthier choices.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-[#0EAD69] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#0c9558] transition">
                Download App
              </button>
              <button
                className={`${
                  darkMode
                    ? "bg-[#161B22] hover:bg-[#1E2329]"
                    : "bg-white hover:bg-gray-50"
                } px-8 py-3 rounded-full font-semibold transition border ${
                  darkMode ? "border-[#2D3748]" : "border-gray-200"
                }`}
              >
                Contact Us
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
                  <Link href={"/"} className="hover:text-white transition">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href={"/"} className="hover:text-white transition">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href={"/"} className="hover:text-white transition">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href={"/"} className="hover:text-white transition">
                    API
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href={"/"} className="hover:text-white transition">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href={"/"} className="hover:text-white transition">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href={"/"} className="hover:text-white transition">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href={"/"} className="hover:text-white transition">
                    Press
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href={"/"} className="hover:text-white transition">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href={"/"} className="hover:text-white transition">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href={"/"} className="hover:text-white transition">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href={"/"} className="hover:text-white transition">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>© 2025 PratyakshaAI. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href={"/"} className="hover:text-white transition">
                Twitter
              </Link>
              <Link href={"/"} className="hover:text-white transition">
                LinkedIn
              </Link>
              <Link href={"/"} className="hover:text-white transition">
                Instagram
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutUsPage;
