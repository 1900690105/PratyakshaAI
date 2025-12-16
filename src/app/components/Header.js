import { User } from "lucide-react";
import React from "react";

function Header() {
  return (
    <>
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg px-5 h-[70px] flex items-center border-b border-[#EAEAEA]">
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-linear-to-br from-[#2E7D32] to-[#4CAF50] rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg">
              🍏
            </div>
            <div>
              <span className="text-xl font-bold text-[#1A1A1A] block leading-none">
                HealthyScan
              </span>
              <span className="text-xs text-[#8A8A8A]">
                Your health companion
              </span>
            </div>
          </div>
          <div className="w-11 h-11 bg-linear-to-br from-[#2E7D32]/10 to-[#4CAF50]/10 rounded-full flex items-center justify-center border-2 border-[#2E7D32]/20 cursor-pointer hover:scale-110 transition-transform duration-300">
            <User className="w-5 h-5 text-[#2E7D32]" />
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
