"use client";

import React, { useState } from "react";
import {
  Camera,
  FileText,
  ListChecks,
  BarChart3,
  User,
  Sparkles,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";

export function UserFlowSection() {
  const [activeStep, setActiveStep] = useState(0);

  const flowSteps = [
    {
      id: 1,
      title: "Barcode Scanner",
      description:
        "Simply point your camera at any product barcode. Our AI instantly recognizes and fetches complete product information.",
      icon: <Camera className="w-6 h-6" />,
      color: "from-green-500 to-emerald-600",
      bglinear: "from-gray-900 to-gray-800",
      img: "/img1.png",
    },
    {
      id: 2,
      title: "Ingredient OCR Scan",
      description:
        "Can't find a barcode? No problem! Snap a photo of the ingredient list and our OCR technology extracts all the text.",
      icon: <FileText className="w-6 h-6" />,
      color: "from-blue-500 to-indigo-600",
      bglinear: "from-blue-900 to-indigo-900",
      img: "/img2.png",
    },
    {
      id: 3,
      title: "Extracted Ingredients",
      description:
        "All ingredients are neatly extracted and organized. Harmful additives are automatically highlighted for your attention.",
      icon: <ListChecks className="w-6 h-6" />,
      color: "from-purple-500 to-pink-600",
      bglinear: "from-purple-900 to-pink-900",
      img: "/img3.png",
    },
    {
      id: 4,
      title: "Health Score Analysis",
      description:
        "Get an instant health score from 0-100 based on nutritional value, ingredient quality, and processing level.",
      icon: <BarChart3 className="w-6 h-6" />,
      color: "from-green-500 to-teal-600",
      bglinear: "from-green-900 to-teal-900",
      img: "/img4.png",
    },
    {
      id: 5,
      title: "Personalized AI Analysis",
      description:
        "Based on your health profile, dietary restrictions, and preferences, get customized insights tailored just for you.",
      icon: <User className="w-6 h-6" />,
      color: "from-indigo-500 to-purple-600",
      bglinear: "from-indigo-900 to-purple-900",
      img: "/img5.png",
    },
    {
      id: 6,
      title: "Healthy Alternatives",
      description:
        "Don't settle for unhealthy options. Discover better alternatives that match your health goals and taste preferences.",
      icon: <Sparkles className="w-6 h-6" />,
      color: "from-emerald-500 to-green-600",
      bglinear: "from-emerald-900 to-green-900",
      img: "/img6.png",
    },
    {
      id: 7,
      title: "Complete Feature Showcase",
      description:
        "All features working together to give you the most comprehensive food health analysis available.",
      icon: <CheckCircle className="w-6 h-6" />,
      color: "from-orange-500 to-red-600",
      bglinear: "from-gray-900 to-slate-900",
      img: "/img7.png",
    },
  ];

  const nextStep = () => {
    setActiveStep((prev) => (prev + 1) % flowSteps.length);
  };

  const prevStep = () => {
    setActiveStep((prev) => (prev - 1 + flowSteps.length) % flowSteps.length);
  };

  // ⬇️ RENDER FUNCTION GIVEN BY YOU — COMPLETED
  const renderStepContent = (stepId) => {
    switch (stepId) {
      case 1 /* YOUR BARCODE UI */:
        return (
          <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden mx-auto">
            <Image
              src={`${flowSteps[stepId - 1].img}`}
              alt="ok"
              width={500}
              height={500}
            />
          </div>
        );

      case 2 /* OCR SCAN */:
        return (
          <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden mx-auto">
            <Image
              src={`${flowSteps[stepId - 1].img}`}
              alt="ok"
              width={500}
              height={500}
            />
          </div>
        );

      case 3 /* Extracted Ingredients UI */:
        return (
          <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden mx-auto">
            <Image
              src={`${flowSteps[stepId - 1].img}`}
              alt="ok"
              width={500}
              height={500}
            />
          </div>
        );

      case 4 /* HEALTH SCORE */:
        return (
          <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden mx-auto">
            <Image
              src={`${flowSteps[stepId - 1].img}`}
              alt="ok"
              width={500}
              height={500}
            />
          </div>
        );

      case 5 /* PERSONALIZED AI */:
        return (
          <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden mx-auto">
            <Image
              src={`${flowSteps[stepId - 1].img}`}
              alt="ok"
              width={500}
              height={500}
            />
          </div>
        );

      case 6 /* BETTER ALTERNATIVES */:
        return (
          <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden mx-auto">
            <Image
              src={`${flowSteps[stepId - 1].img}`}
              alt="ok"
              width={500}
              height={500}
            />
          </div>
        );

      case 7 /* SUMMARY */:
        return (
          <div className="w-full max-w-sm bg-linear-to-br from-gray-900 to-slate-900 rounded-3xl shadow-2xl overflow-hidden mx-auto text-white p-12">
            <Image
              src={`${flowSteps[stepId - 1].img}`}
              alt="ok"
              width={500}
              height={500}
            />
          </div>
        );

      default:
        return null;
    }
  };

  // ⬇️ Final return
  return (
    <section className="py-20 bg-gray-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight">How the App Works</h2>
        <p className="text-gray-600 mt-2">
          A step-by-step preview of your food scanning journey
        </p>
      </div>

      {/* Main content */}
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-8">
        {/* Step Title */}
        <div className="text-center">
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r ${flowSteps[activeStep].color} text-white rounded-full shadow`}
          >
            {flowSteps[activeStep].icon}
            <span>{flowSteps[activeStep].title}</span>
          </div>
          <p className="mt-3 text-gray-700 max-w-md">
            {flowSteps[activeStep].description}
          </p>
        </div>

        {/* Animated Phone UI */}
        <div className="w-full flex justify-center">
          <div className="transition-all duration-500 ease-in-out">
            {renderStepContent(flowSteps[activeStep].id)}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-6 mt-6">
          <button
            onClick={prevStep}
            className="px-6 py-3 rounded-xl bg-gray-200 hover:bg-gray-300 transition flex items-center gap-2"
          >
            <ChevronLeft className="w-5 h-5" /> Prev
          </button>

          <button
            onClick={nextStep}
            className="px-6 py-3 rounded-xl bg-black text-white hover:bg-gray-800 transition flex items-center gap-2"
          >
            Next <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
