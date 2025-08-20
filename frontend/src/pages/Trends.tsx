
// export default Trends;
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TrendingUp, MapPin, Calendar, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";  // ✅ Updated import
import { toast } from "@/components/ui/use-toast";
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from "@react-google-maps/api";
import { useState } from "react";

import FestivalModal from "@/components/ui/FestivalModal";
import FestivalCardGrid from "@/components/FestivalCardGrid";

const center = { lat: 23.5937, lng: 80.9629 }; // Center of India

const cityCoords: Record<string, { lat: number; lng: number }> = {
  Lucknow: { lat: 26.8467, lng: 80.9462 },
  Jaipur: { lat: 26.9124, lng: 75.7873 },
  Kolkata: { lat: 22.5726, lng: 88.3639 },
};

const cityTrendMap: Record<string, { trend: string }> = {
  Lucknow: { trend: "Embroidered Dupattas" },
  Kolkata: { trend: "Cotton Sarees" },
  Jaipur: { trend: "Block Print Suits" },
};

const Trends = () => {
  const [activeCity, setActiveCity] = useState<string | null>(null);
  const navigate = useNavigate();  // ✅ Hook for routing

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_KEY,
  });
  const [selectedFestival, setSelectedFestival] = useState<{
    name: string;
    category: string;
    icon: string;
  } | null>(null);

  const festivals = [
    {
      name: "Diwali",
      category: "Zari Sarees",
      color: "from-orange-500 to-red-500",
      icon: "🪔",
    },
    {
      name: "Eid",
      category: "White Kurtas",
      color: "from-teal-500 to-cyan-500",
      icon: "🌙",
    },
    {
      name: "Navratri",
      category: "Lehenga Choli",
      color: "from-orange-400 to-yellow-500",
      icon: "👗",
    },
    {
      name: "Basant",
      category: "Yellow Dupattas",
      color: "from-yellow-400 to-orange-400",
      icon: "🪁",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-gradient-to-b from-primary to-secondary p-6 min-h-screen">
          <div className="text-white mb-8">
            <h2 className="text-xl font-bold">GullyKart</h2>
            <p className="text-sm opacity-90">Vision</p>
          </div>

          <nav className="space-y-2">
            <Link to="/" className="flex items-center gap-3 p-3 rounded-lg text-white/80 hover:bg-white/10 transition-colors">
              <MapPin size={20} />
              <span>Home</span>
            </Link>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-pink-500 text-white">
              <TrendingUp size={20} />
              <span>Forecasts</span>
            </div>
            <Link to="/campaigns" className="flex items-center gap-3 p-3 rounded-lg text-white/80 hover:bg-white/10 transition-colors">
              <Sparkles size={20} />
              <span>Campaign Generator</span>
            </Link>
            <Link to="/dashboard" className="flex items-center gap-3 p-3 rounded-lg text-white/80 hover:bg-white/10 transition-colors">
              <Calendar size={20} />
              <span>Account</span>
            </Link>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* Festival Forecast */}
          <div id="festival-forecast" className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-foreground">Festival Forecast</h1>
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-muted rounded-full"></div>
                <div className="w-3 h-3 bg-muted rounded-full"></div>
              </div>
            </div>

           <FestivalCardGrid onFestivalClick={(festival) => setSelectedFestival(festival)} />


{/* 🔥 Festival Insights Modal – Visible when a card is clicked */}
{selectedFestival && (
  <FestivalModal
    open={true} // ✅ required by FestivalModalProps
    festival={selectedFestival}
    onClose={() => setSelectedFestival(null)}
  />
)}

          </div>

          {/* Regional Trend Heatmap with Google Maps */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">Regional Trend Heatmap</h2>

            {isLoaded ? (
              <div className="w-full h-[500px] rounded-xl overflow-hidden">
                <GoogleMap
                  zoom={5}
                  center={center}
                  mapContainerStyle={{ width: "100%", height: "100%" }}
                >
                  {Object.entries(cityCoords).map(([city, coords]) => (
                    <Marker
                      key={city}
                      position={coords}
                      onClick={() => setActiveCity(city)}
                    />
                  ))}

                  {activeCity && (
                    <InfoWindow
                      position={cityCoords[activeCity]}
                      onCloseClick={() => setActiveCity(null)}
                    >
                      <div>
                        <h3 className="font-semibold">{activeCity}</h3>
                        <p>{cityTrendMap[activeCity].trend}</p>
                      </div>
                    </InfoWindow>
                  )}
                </GoogleMap>
              </div>
            ) : (
              <p>Loading map...</p>
            )}

            <div className="mt-6">
            <Button
  className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full"
  onClick={() => {
    const sellerProducts = [
      {
        product_id: "s-001",
        product_name: "Royal Red Banarasi Silk Saree",
        product_category: "Saree",
        tags: ["banarasi", "zari", "wedding"],
        description: "Elegant red saree with golden zari border, perfect for weddings.",
      },
      {
        product_id: "s-002",
        product_name: "Pastel Organza Saree",
        product_category: "Saree",
        tags: ["pastel", "organza", "lightweight"],
        description: "Flowy organza in lavender, ideal for festive daywear.",
      },
      {
        product_id: "s-003",
        product_name: "Mint Green Anarkali",
        product_category: "Suit",
        tags: ["anarkali", "chikankari", "pastel"],
        description: "Full-length pastel suit with chikankari embroidery.",
      },
      {
        product_id: "s-004",
        product_name: "Block Print Cotton Kurti",
        product_category: "Kurti",
        tags: ["cotton", "block print", "summer"],
        description: "Cotton kurti with Rajasthani block prints for daily wear.",
      },
      {
        product_id: "s-005",
        product_name: "Sky Blue Festive Kurta Set",
        product_category: "Suit",
        tags: ["sky blue", "kurta", "monsoon"],
        description: "Light cotton kurta with floral accents, trending this monsoon.",
      },
      {
        product_id: "s-006",
        product_name: "Zari Lehenga Choli",
        product_category: "Lehenga",
        tags: ["lehenga", "zari", "navratri"],
        description: "Traditional lehenga with detailed zari embroidery.",
      },
      {
        product_id: "s-007",
        product_name: "Yellow Dupatta with Gota",
        product_category: "Dupatta",
        tags: ["yellow", "gota", "basant"],
        description: "Bright dupatta with gota-patti, popular in Basant Panchami.",
      },
      {
        product_id: "s-008",
        product_name: "White Eid Kurta",
        product_category: "Kurta",
        tags: ["white", "eid", "muslim"],
        description: "Classic white cotton kurta with minimal embroidery.",
      },
      {
        product_id: "s-009",
        product_name: "Peach Georgette Saree",
        product_category: "Saree",
        tags: ["peach", "georgette", "soft"],
        description: "Soft georgette saree for brunches and family functions.",
      },
      {
        product_id: "s-010",
        product_name: "Pink Sharara Set",
        product_category: "Sharara",
        tags: ["sharara", "pink", "mehndi"],
        description: "Trendy sharara set perfect for mehndi ceremonies.",
      },
      {
        product_id: "s-011",
        product_name: "Lavender Slub Cotton Suit",
        product_category: "Suit",
        tags: ["lavender", "slub", "cotton"],
        description: "Comfortable cotton suit in pastel lavender shade.",
      },
      {
        product_id: "s-012",
        product_name: "Maroon Velvet Lehenga",
        product_category: "Lehenga",
        tags: ["maroon", "velvet", "winter"],
        description: "Heavy winter lehenga in rich velvet maroon fabric.",
      },
      {
        product_id: "s-013",
        product_name: "Black Embroidered Saree",
        product_category: "Saree",
        tags: ["black", "embroidery", "party"],
        description: "Saree with golden thread embroidery for evening parties.",
      },
      {
        product_id: "s-014",
        product_name: "Navy Blue Palazzo Suit",
        product_category: "Suit",
        tags: ["palazzo", "navy blue", "comfortable"],
        description: "Relaxed fit palazzo suit for all-day wear.",
      },
      {
        product_id: "s-015",
        product_name: "Beige Chikankari Dupatta",
        product_category: "Dupatta",
        tags: ["chikankari", "beige", "lucknow"],
        description: "Classic Lucknowi chikankari on soft beige fabric.",
      },
      {
        product_id: "s-016",
        product_name: "Multi-color Bandhani Saree",
        product_category: "Saree",
        tags: ["bandhani", "colorful", "gujarat"],
        description: "Vibrant bandhani saree for festive wear.",
      },
      {
        product_id: "s-017",
        product_name: "Indigo Cotton Kaftan",
        product_category: "Kaftan",
        tags: ["kaftan", "indigo", "boho"],
        description: "Indigo handblock kaftan for comfort and style.",
      },
      {
        product_id: "s-018",
        product_name: "Grey Office Wear Kurti",
        product_category: "Kurti",
        tags: ["office", "grey", "formal"],
        description: "Simple kurti in grey with minimal detailing.",
      },
      {
        product_id: "s-019",
        product_name: "Orange Mirror Work Dupatta",
        product_category: "Dupatta",
        tags: ["mirror work", "orange", "traditional"],
        description: "Mirror work dupatta to enhance plain suits.",
      },
      {
        product_id: "s-020",
        product_name: "Floral Anarkali with Gold Print",
        product_category: "Anarkali",
        tags: ["anarkali", "floral", "print"],
        description: "Printed floral anarkali with gold highlights.",
      },
    ];
  
    localStorage.setItem("seller_catalogue", JSON.stringify(sellerProducts));
  
    toast({
      title: "Seller Catalogue Synced",
      description: "20 products added successfully for trend matching.",
    });
  
    window.location.href = "/trends/opportunities";
  }}
  
>
  Sync Catalogue
</Button>


            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trends;
