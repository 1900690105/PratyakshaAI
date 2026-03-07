import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";

function FinalCTA() {
  return (
    <>
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
    </>
  );
}

export default FinalCTA;
