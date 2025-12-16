"use client";
import React, { useState, useEffect } from "react";
import {
  Camera,
  Brain,
  Shield,
  Zap,
  Bell,
  Heart,
  Star,
  Menu,
  X,
  ChevronRight,
  Sparkles,
  BarChart3,
  History,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { UserFlowSection } from "./components/UserFlowSection";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

export default function FoodScannerLanding() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Ingredient Breakdown",
      description:
        "Get detailed analysis of every ingredient in plain language you can understand.",
    },
    {
      icon: <Bell className="w-8 h-8" />,
      title: "Additive Risk Detection",
      description:
        "Instant alerts for harmful additives, preservatives, and artificial ingredients.",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Personalized Warnings",
      description:
        "Custom alerts based on your health conditions, allergies, and dietary preferences.",
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Health Score (0-100)",
      description:
        "See at a glance how healthy any food product is with our comprehensive scoring.",
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Healthy Alternatives",
      description:
        "Discover better options when a product doesn't meet your health standards.",
    },
    {
      icon: <History className="w-8 h-8" />,
      title: "Scan History & Favorites",
      description:
        "Track your scans and save your favorite healthy products for easy reference.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Health Enthusiast",
      image: "SJ",
      quote:
        "Finally an app that explains ingredients in simple language. No more googling every chemical name!",
    },
    {
      name: "Michael Chen",
      role: "Diabetes Patient",
      image: "MC",
      quote:
        "I love how it warns me about sugar due to my diabetes. It's like having a nutritionist in my pocket.",
    },
    {
      name: "Emma Rodriguez",
      role: "Busy Mom",
      image: "ER",
      quote:
        "Clean, fast, and very accurate. Helps me make better choices for my family. Highly recommended!",
    },
  ];

  const handleStartScan = () => {
    // Read all cookies
    const cookieString = document.cookie;

    // Look for auth_token
    const hasAuth = cookieString.includes("auth_token=");

    if (hasAuth) {
      // User logged in → Go to dashboard
      window.location.href = "/dashboard";
    } else {
      // Not logged in → Go to login
      window.location.href = "/auth/login";
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-green-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 transition-colors duration-300">
      {/* Navbar */}
      <Navbar
        scrolled={scrolled}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="inline-block px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-semibold">
                🌟 AI-Powered Food Intelligence
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
                Scan Food.
                <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-green-500 to-emerald-600">
                  Know the Truth.
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Instant health insights for any packaged food — powered by AI +
                real data.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => {
                    handleStartScan();
                  }}
                  className="bg-linear-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-lg px-8 py-6 rounded-xl hover:scale-105 transition-transform"
                >
                  Start Scanning <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  className="text-lg px-8 py-6 rounded-xl border-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  Try a Demo
                </Button>
              </div>
            </div>

            {/* Phone Mockup */}
            <div className="relative">
              <Image src={"/hero.png"} alt="lpgo" width={500} height={500} />
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-300/30 dark:bg-green-600/20 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Three simple steps to healthier eating
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-green-500 dark:hover:border-green-600 transition-all hover:shadow-xl rounded-xl group">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-linear-to-br from-green-500 to-emerald-600 rounded-2xl mx-auto flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Camera className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Step 1 — Scan
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Scan the barcode or ingredient list with your camera.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-green-500 dark:hover:border-green-600 transition-all hover:shadow-xl rounded-xl group">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-indigo-600 rounded-2xl mx-auto flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Step 2 — Analyze
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  AI checks ingredients, additives, and nutrition instantly.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-green-500 dark:hover:border-green-600 transition-all hover:shadow-xl rounded-xl group">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-linear-to-br from-purple-500 to-pink-600 rounded-2xl mx-auto flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Step 3 — Get Insights
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Know if it&#39;s Safe, Moderate, or Avoid — instantly.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Everything You Need to Make Safe Food Choices
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Powerful features to help you eat healthier
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-2 hover:border-green-500 dark:hover:border-green-600 transition-all hover:shadow-xl rounded-xl group cursor-pointer"
              >
                <CardContent className="p-8 space-y-4">
                  <div className="w-16 h-16 bg-linear-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-2xl flex items-center justify-center text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <UserFlowSection />

      {/* Demo Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-green-500 to-emerald-600 dark:from-green-900 dark:to-emerald-900">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              See It In Action
            </h2>
            <p className="text-xl text-white/90">
              Try scanning any packaged food — see the truth in seconds.
            </p>
          </div>

          <div className="relative mx-auto w-72 h-[600px] bg-gray-900 rounded-[3rem] p-4 shadow-2xl">
            <div className="w-full h-full bg-white rounded-[2rem] overflow-hidden">
              <div className="h-full flex flex-col">
                <div className="flex-1 bg-linear-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <Camera className="w-24 h-24 text-gray-400 animate-pulse" />
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-700">
                      Health Score
                    </span>
                    <span className="text-2xl font-bold text-green-600">
                      85/100
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-green-200 rounded-full overflow-hidden">
                      <div className="h-full w-4/5 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1 h-2 bg-green-300 rounded-full"></div>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full"></div>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Trusted by Health-Conscious Shoppers
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className={`border-2 rounded-xl transition-all duration-500 ${
                  currentTestimonial === index
                    ? "border-green-500 shadow-xl scale-105"
                    : "border-gray-200 dark:border-gray-800"
                }`}
              >
                <CardContent className="p-8 space-y-4">
                  <div className="flex text-yellow-400 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 italic">
                    &#34;{testimonial.quote}&#34;
                  </p>
                  <div className="flex items-center space-x-4 pt-4">
                    <div className="w-12 h-12 bg-linear-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold">
                      {testimonial.image}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 dark:text-white">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 bg-linear-to-br from-green-500 to-emerald-600 rounded-3xl overflow-hidden shadow-2xl">
            <CardContent className="p-12 text-center space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Scan Healthier. Shop Smarter.
              </h2>
              <p className="text-xl text-white/90">
                Join thousands of users making informed food decisions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-6 rounded-xl hover:scale-105 transition-transform">
                  Start Scanning
                </Button>
                <Button
                  variant="outline"
                  className="border-2 border-white text-black hover:bg-white/10 text-lg px-8 py-6 rounded-xl transition-colors"
                >
                  Create Free Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
