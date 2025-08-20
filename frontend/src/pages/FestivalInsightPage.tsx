// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { useParams } from "react-router-dom";
// import { Flame, MapPin, Search } from "lucide-react";

// const insightData: Record<string, any> = {
//   diwali: {
//     topProducts: ["Zari Sarees", "Anarkali Suits"],
//     regions: ["Lucknow", "Delhi", "Ahmedabad"],
//     keywords: ["Ethnic wear", "Diwali outfits", "Festive sari"],
//     emoji: "🪔",
//     color: "bg-orange-100",
//     theme: "text-orange-600",
//   },
//   eid: {
//     topProducts: ["White Kurtas", "Pathani Suits"],
//     regions: ["Hyderabad", "Bhopal", "Lucknow"],
//     keywords: ["Eid dresses", "Kurta pajama", "Traditional wear"],
//     emoji: "🌙",
//     color: "bg-teal-100",
//     theme: "text-teal-600",
//   },
// };

// const FestivalInsightPage = () => {
//   const { festival } = useParams();
//   const insight = insightData[festival?.toLowerCase() || ""];

//   if (!insight) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <h1 className="text-2xl font-bold text-destructive">Festival not found</h1>
//       </div>
//     );
//   }

//   return (
//     <div className={`min-h-screen px-6 py-12 ${insight.color}`}>
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <div className="mb-10 text-center">
//           <h1 className={`text-4xl font-extrabold ${insight.theme}`}>
//             {insight.emoji} {festival?.charAt(0).toUpperCase() + festival?.slice(1)} Insights
//           </h1>
//           <p className="text-muted-foreground text-md mt-2">Hyperlocal market analysis powered by AI</p>
//         </div>

//         {/* Cards Section */}
//         <div className="grid md:grid-cols-3 gap-6 mb-10">
//           {/* Top Products */}
//           <Card className="bg-white shadow-md p-6 space-y-4">
//             <div className="flex items-center gap-2 text-lg font-semibold text-orange-600">
//               <Flame size={20} /> Top Products
//             </div>
//             <ul className="list-disc list-inside text-sm">
//               {insight.topProducts.map((item: string, idx: number) => (
//                 <li key={idx}>{item}</li>
//               ))}
//             </ul>
//           </Card>

//           {/* Regions */}
//           <Card className="bg-white shadow-md p-6 space-y-4">
//             <div className="flex items-center gap-2 text-lg font-semibold text-blue-600">
//               <MapPin size={20} /> High-Demand Regions
//             </div>
//             <ul className="list-disc list-inside text-sm">
//               {insight.regions.map((item: string, idx: number) => (
//                 <li key={idx}>{item}</li>
//               ))}
//             </ul>
//           </Card>

//           {/* Keywords */}
//           <Card className="bg-white shadow-md p-6 space-y-4">
//             <div className="flex items-center gap-2 text-lg font-semibold text-green-600">
//               <Search size={20} /> Keyword Trends
//             </div>
//             <ul className="list-disc list-inside text-sm">
//               {insight.keywords.map((item: string, idx: number) => (
//                 <li key={idx}>{item}</li>
//               ))}
//             </ul>
//           </Card>
//         </div>

//         {/* CTA Button */}
//         <div className="text-center mt-10">
//           <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full text-lg">
//             🚀 Generate Campaign
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FestivalInsightPage;
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useParams } from "react-router-dom";
import { Flame, MapPin, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const insightData: Record<string, any> = {
  diwali: {
    topProducts: ["Zari Sarees", "Anarkali Suits"],
    regions: ["Lucknow", "Delhi", "Ahmedabad"],
    keywords: ["Ethnic wear", "Diwali outfits", "Festive sari"],
    emoji: "🪔",
    color: "bg-gradient-to-br from-orange-50 to-yellow-50",
    theme: "text-orange-700",
    gradient: "from-orange-300 via-yellow-200 to-orange-100"
  },
  eid: {
    topProducts: ["White Kurtas", "Pathani Suits"],
    regions: ["Hyderabad", "Bhopal", "Lucknow"],
    keywords: ["Eid dresses", "Kurta pajama", "Traditional wear"],
    emoji: "🌙",
    color: "bg-gradient-to-br from-cyan-50 to-green-50",
    theme: "text-teal-700",
    gradient: "from-teal-300 via-cyan-200 to-teal-100"
  },
};

const FestivalInsightPage = () => {
  const { festival } = useParams();
  const insight = insightData[festival?.toLowerCase() || ""];

  if (!insight) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold text-destructive">Festival not found</h1>
      </div>
    );
  }

  return (
    <div className={`min-h-screen px-6 py-12 ${insight.color}`}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center animate-fadeInUp">
          <h1 className={`text-5xl font-extrabold ${insight.theme} drop-shadow-md`}>
            {insight.emoji} {festival?.charAt(0).toUpperCase() + festival?.slice(1)} Insights
          </h1>
          <p className="text-muted-foreground text-lg mt-2">Hyperlocal market analysis powered by AI</p>
        </div>

        {/* Cards Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {/* Top Products */}
          <Card className={`transition-transform duration-300 hover:scale-105 bg-gradient-to-br ${insight.gradient} shadow-xl p-6 space-y-4 rounded-xl`}>
            <div className="flex items-center gap-2 text-lg font-semibold text-orange-700">
              <Flame size={20} /> Top Products
            </div>
            <ul className="list-disc list-inside text-base text-orange-900">
              {insight.topProducts.map((item: string, idx: number) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </Card>

          {/* Regions */}
          <Card className="transition-transform duration-300 hover:scale-105 bg-gradient-to-br from-blue-200 via-indigo-100 to-blue-100 shadow-xl p-6 space-y-4 rounded-xl">
            <div className="flex items-center gap-2 text-lg font-semibold text-blue-700">
              <MapPin size={20} /> High-Demand Regions
            </div>
            <ul className="list-disc list-inside text-base text-blue-900">
              {insight.regions.map((item: string, idx: number) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </Card>

          {/* Keywords */}
          <Card className="transition-transform duration-300 hover:scale-105 bg-gradient-to-br from-green-200 via-lime-100 to-green-100 shadow-xl p-6 space-y-4 rounded-xl">
            <div className="flex items-center gap-2 text-lg font-semibold text-green-700">
              <Search size={20} /> Keyword Trends
            </div>
            <ul className="list-disc list-inside text-base text-green-900">
              {insight.keywords.map((item: string, idx: number) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </Card>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-10 animate-fadeInUp">
          <Button className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 hover:from-orange-500 hover:to-purple-700 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-lg transform transition-transform hover:scale-105">
            🚀 Generate Campaign
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FestivalInsightPage;