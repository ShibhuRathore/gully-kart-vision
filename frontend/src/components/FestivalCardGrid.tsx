// frontend/src/components/FestivalCardGrid.tsx
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

// Festival type definition
type Festival = {
  name: string;
  category: string;
  icon: string;
  color: string;
  date: string;
  weather: string;
};

// Props for click handler
type Props = {
  onFestivalClick: (festival: Festival) => void;
};

// Mock generator with all festivals
const generateMockFestivals = (): Festival[] => {
  const now = new Date();
  const mockFestivals: Festival[] = [
    {
      name: "Diwali",
      category: "Zari Sarees",
      icon: "🪔",
      color: "from-orange-500 to-red-500",
      date: "2025-11-05",
      weather: "Clear",
    },
    {
      name: "Eid",
      category: "White Kurtas",
      icon: "🌙",
      color: "from-teal-500 to-cyan-500",
      date: "2025-10-02",
      weather: "Mild",
    },
    {
      name: "Navratri",
      category: "Lehenga Choli",
      icon: "👗",
      color: "from-orange-400 to-yellow-500",
      date: "2025-10-13",
      weather: "Cool",
    },
    {
      name: "Basant Panchami",
      category: "Yellow Dupattas",
      icon: "🪁",
      color: "from-yellow-400 to-orange-400",
      date: "2025-02-01",
      weather: "Pleasant",
    },
    {
      name: "Holi",
      category: "Multicolor Kurtas",
      icon: "🎨",
      color: "from-pink-400 to-purple-400",
      date: "2026-03-06",
      weather: "Warm",
    },
    {
      name: "Raksha Bandhan",
      category: "Thread Bracelets",
      icon: "🎁",
      color: "from-pink-300 to-pink-500",
      date: "2025-08-10",
      weather: "Humid",
    },
    {
      name: "Independence Day",
      category: "Tricolor Dupattas",
      icon: "🇮🇳",
      color: "from-green-400 to-orange-400",
      date: "2025-08-15",
      weather: "Hot",
    },
    {
      name: "Janmashtami",
      category: "Flute Pendants",
      icon: "🦚",
      color: "from-blue-400 to-indigo-500",
      date: "2025-08-18",
      weather: "Warm",
    },
    {
      name: "Parsi New Year",
      category: "White Sarees",
      icon: "🧿",
      color: "from-gray-300 to-blue-200",
      date: "2025-08-21",
      weather: "Pleasant",
    },
    {
      name: "Ganesh Chaturthi",
      category: "Ganesh T-Shirts",
      icon: "🐘",
      color: "from-yellow-300 to-red-400",
      date: "2025-09-06",
      weather: "Rainy",
    },
    {
      name: "Karva Chauth",
      category: "Red Sarees",
      icon: "🌕",
      color: "from-red-500 to-pink-400",
      date: "2025-10-31",
      weather: "Clear",
    },
  ];

  return mockFestivals
    .filter((f) => new Date(f.date) >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

export default function FestivalCardGrid({ onFestivalClick }: Props) {
  const [festivals, setFestivals] = useState<Festival[]>([]);

  useEffect(() => {
    const data = generateMockFestivals();
    setFestivals(data);
  }, []);

  return (
    <div className="w-full max-w-[100vw] overflow-x-auto">
      <div className="flex space-x-4 pb-4 px-2 hide-scrollbar">
        {festivals.map((festival, idx) => (
          <div
            key={idx}
            onClick={() => onFestivalClick(festival)}
            className={`min-w-[250px] cursor-pointer p-6 bg-gradient-to-br ${festival.color} text-white rounded-xl shadow-md hover:scale-[1.04] transition-transform duration-300`}
          >
            <div className="text-3xl mb-2">{festival.icon}</div>
            <h3 className="text-xl font-bold mb-1">{festival.name}</h3>
            <p className="text-white/90 text-sm mb-2">{festival.category}</p>
            <p className="text-xs opacity-80">📅 {festival.date} | ☁️ {festival.weather}</p>
            <Button
              variant="secondary"
              className="w-full bg-white/20 hover:bg-white/30 text-white mt-4"
            >
              See Insights
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}