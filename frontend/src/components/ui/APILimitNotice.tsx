// components/ui/APILimitNotice.tsx
import { useState, useEffect } from "react";
import { AlertTriangle, X } from "lucide-react";

export default function APILimitNotice() {
  const [visible, setVisible] = useState(true);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setAnimateIn(true), 50); // entrance delay
    return () => clearTimeout(timeout);
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`w-full px-4 py-4 border border-pink-300 rounded-xl shadow-lg flex items-start justify-between space-x-4 mb-6 transition-all duration-500 ease-out transform
        ${
          animateIn
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-2"
        }
        bg-gradient-to-r from-[#ffe6f0] to-[#fff9e6] relative overflow-hidden`}
    >
      {/* Soft background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100/40 to-yellow-100/30 blur-[20px] opacity-40 -z-10"></div>

      <div className="flex items-start space-x-3 text-sm text-pink-900 leading-snug">
        <AlertTriangle className="w-5 h-5 mt-1 text-pink-600 flex-shrink-0" />
        <div>
          <strong className="block font-semibold text-pink-700 mb-1 tracking-wide">⚠️ Limited API Notice</strong>
          <span>
            Currently, <strong>GullyKart Vision</strong> supports image generation for <strong>women’s clothing only</strong> due to limited free model tokens. We’re actively working to support <strong>men’s fashion</strong> soon. Stay tuned 💖
          </span>
        </div>
      </div>

      <button
        onClick={() => setVisible(false)}
        className="ml-auto text-pink-700 hover:text-pink-900 transition"
        aria-label="Dismiss"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}

