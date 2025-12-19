"use client";
import { Button } from "@/components/ui/button";
import { Camera, Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

function Navbar({ scrolled, mobileMenuOpen, setMobileMenuOpen }) {
  const router = useRouter();
  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-linear-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                PratyakshaAI
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="#home"
                className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              >
                Home
              </Link>
              <Link
                href="#features"
                className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              >
                Features
              </Link>
              <Link
                href="#how-it-works"
                className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              >
                How It Works
              </Link>
              <Button
                onClick={() => {
                  router.push(`/auth/login`);
                }}
                className="bg-linear-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl"
              >
                Login / Sign Up
              </Button>
            </div>

            {/* Mobile Menu Button */}
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

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-800">
            <div className="px-4 py-4 space-y-4">
              <a
                href="#home"
                className="block text-gray-700 dark:text-gray-300 hover:text-green-600"
              >
                Home
              </a>
              <a
                href="#features"
                className="block text-gray-700 dark:text-gray-300 hover:text-green-600"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="block text-gray-700 dark:text-gray-300 hover:text-green-600"
              >
                How It Works
              </a>
              <Button
                onClick={() => {
                  router.push(`auth/login`);
                }}
                className="w-full bg-linear-to-r from-green-500 to-emerald-600 text-white rounded-xl"
              >
                Login / Sign Up
              </Button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;
