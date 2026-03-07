import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import React from "react";

function Testimonials({ testimonials, currentTestimonial }) {
  return (
    <>
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
    </>
  );
}

export default Testimonials;
