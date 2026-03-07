import { Camera } from "lucide-react";
import React from "react";

function DemoPreview() {
  return (
    <>
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
    </>
  );
}

export default DemoPreview;
