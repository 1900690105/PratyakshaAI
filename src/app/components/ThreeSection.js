import {
  Heart,
  History,
  Lightbulb,
  RefreshCw,
  Shield,
  Sparkles,
  TrendingUp,
  User,
} from "lucide-react";
import React from "react";
import { BenefitItem, QuickAccessCard } from "../page";

function ThreeSection() {
  return (
    <>
      {/* Quick Access Section with Modern Cards */}
      <section className="pt-12 pb-10 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-[#1A1A1A]">Quick Access</h2>
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-[#2E7D32] rounded-full"></div>
            <div className="w-2 h-2 bg-[#4CAF50] rounded-full"></div>
            <div className="w-2 h-2 bg-[#EAEAEA] rounded-full"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <QuickAccessCard
            icon={<User className="w-6 h-6" />}
            title="View My Profile"
            description="Manage preferences"
            linear="from-blue-50 to-blue-100/50"
          />
          <QuickAccessCard
            icon={<History className="w-6 h-6" />}
            title="Scan History"
            description="Past scans & reports"
            linear="from-purple-50 to-purple-100/50"
          />
          <QuickAccessCard
            icon={<Lightbulb className="w-6 h-6" />}
            title="Healthy Tips"
            description="Expert advice"
            linear="from-amber-50 to-amber-100/50"
          />
          <QuickAccessCard
            icon={<RefreshCw className="w-6 h-6" />}
            title="Alternatives"
            description="Better options"
            linear="from-green-50 to-green-100/50"
          />
        </div>
      </section>

      {/* Benefits Section with Icons */}
      <section className="py-12 bg-linear-to-br from-white via-[#F7F7F7] to-white rounded-3xl shadow-inner -mx-5 px-5 md:px-12 max-w-5xl md:mx-auto border border-[#EAEAEA]">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-3">
            Why choose HealthyScan?
          </h2>
          <p className="text-[#8A8A8A] text-sm">
            Everything you need for healthier choices
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <BenefitItem
            icon={<Shield className="w-5 h-5" />}
            text="Know ingredient risks"
            description="Identify harmful additives instantly"
          />
          <BenefitItem
            icon={<TrendingUp className="w-5 h-5" />}
            text="Instant health score"
            description="See nutrition rating at a glance"
          />
          <BenefitItem
            icon={<Heart className="w-5 h-5" />}
            text="Personalized recommendations"
            description="Based on your dietary needs"
          />
          <BenefitItem
            icon={<Sparkles className="w-5 h-5" />}
            text="Diet-friendly alternatives"
            description="Discover better product options"
          />
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-8 max-w-4xl mx-auto">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-4 rounded-xl bg-linear-to-br from-green-50 to-transparent">
            <div className="text-2xl font-bold text-[#2E7D32]">10K+</div>
            <div className="text-xs text-[#8A8A8A] mt-1">Active Users</div>
          </div>
          <div className="p-4 rounded-xl bg-linear-to-br from-blue-50 to-transparent">
            <div className="text-2xl font-bold text-[#2E7D32]">50K+</div>
            <div className="text-xs text-[#8A8A8A] mt-1">Products Scanned</div>
          </div>
          <div className="p-4 rounded-xl bg-linear-to-br from-amber-50 to-transparent">
            <div className="text-2xl font-bold text-[#2E7D32]">99%</div>
            <div className="text-xs text-[#8A8A8A] mt-1">Accuracy Rate</div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ThreeSection;
