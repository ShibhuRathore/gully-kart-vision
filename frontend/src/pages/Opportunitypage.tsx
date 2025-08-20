// // src/pages/OpportunitiesPage.tsx

// import React, { useState } from 'react';
// import axios from 'axios';

// interface Product {
//   product_id: string;
//   product_name: string;
//   description: string;
// }

// interface TrendInsight {
//   trend_name: string;
//   trend_context: string;
//   recommended_products: Product[];
// }

// const OpportunitiesPage = () => {
//   const [results, setResults] = useState<TrendInsight[]>([]);
//   const [loading, setLoading] = useState(false);

//   const fetchOpportunities = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.post('http://127.0.0.1:8000/trends/opportunities', {
//         seller_products: [
//           {
//             product_id: "p-01",
//             product_name: "Royal Red & Gold Banarasi Silk Saree",
//             product_category: "Saree",
//             tags: ["ethnic", "banarasi", "wedding", "diwali"],
//             description: "Classic zari weave, perfect for weddings.",
//           },
//           {
//             product_id: "p-02",
//             product_name: "Pastel Lavender Organza Saree",
//             product_category: "Saree",
//             tags: ["lightweight", "pastel", "day", "functions"],
//             description: "Lightweight sheer organza in trendy pastel shade.",
//           },
//           {
//             product_id: "p-03",
//             product_name: "Mint Green Pastel Anarkali Suit",
//             product_category: "Suit",
//             tags: ["pastel", "day", "anarkali", "chikankari"],
//             description: "Floor-length suit, great for daytime functions.",
//           }
//         ]
//       });
//       setResults(res.data);
//     } catch (err) {
//       console.error("❌ Failed to fetch opportunities:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ padding: 24 }}>
//       <h2>🔍 AI Trend Opportunities</h2>
//       <button onClick={fetchOpportunities} disabled={loading} style={{ marginBottom: 12 }}>
//         {loading ? 'Loading...' : 'Fetch Opportunities'}
//       </button>

//       {results.map((trend, index) => (
//         <div key={index} style={{ marginBottom: 16, borderBottom: "1px solid #ccc", paddingBottom: 12 }}>
//           <h3>{trend.trend_name}</h3>
//           <p>{trend.trend_context}</p>
//           <ul>
//             {trend.recommended_products.map((p) => (
//               <li key={p.product_id}>
//                 <strong>{p.product_name}</strong>: {p.description}
//               </li>
//             ))}
//           </ul>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default OpportunitiesPage;

// import axios from 'axios';
// import { useSearchParams } from "react-router-dom";
// import { useEffect, useState } from "react";


// interface Product {
//   product_id: string;
//   product_name: string;
//   description: string;
// }

// interface TrendInsight {
//   trend_name: string;
//   trend_context: string;
//   recommended_products: Product[];
// }

// const OpportunitiesPage = () => {
//   const [results, setResults] = useState<TrendInsight[]>([]);
//   const [loading, setLoading] = useState(false);

//   const fetchOpportunities = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.post('http://127.0.0.1:8000/trends/opportunities', {
//         seller_products: [
//           {
//             product_id: "p-01",
//             product_name: "Royal Red & Gold Banarasi Silk Saree",
//             product_category: "Saree",
//             tags: ["ethnic", "banarasi", "wedding", "diwali"],
//             description: "Classic zari weave, perfect for weddings.",
//           },
//           {
//             product_id: "p-02",
//             product_name: "Pastel Lavender Organza Saree",
//             product_category: "Saree",
//             tags: ["lightweight", "pastel", "day", "functions"],
//             description: "Lightweight sheer organza in trendy pastel shade.",
//           },
//           {
//             product_id: "p-03",
//             product_name: "Mint Green Pastel Anarkali Suit",
//             product_category: "Suit",
//             tags: ["pastel", "day", "anarkali", "chikankari"],
//             description: "Floor-length suit, great for daytime functions.",
//           }
//         ]
//       });
//       setResults(res.data);
//     } catch (err) {
//       console.error("❌ Failed to fetch opportunities:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ padding: 24 }}>
//       <h2>🔍 AI Trend Opportunities</h2>
//       <button onClick={fetchOpportunities} disabled={loading} style={{ marginBottom: 12 }}>
//         {loading ? 'Loading...' : 'Fetch Opportunities'}
//       </button>

//       {results.map((trend, index) => (
//         <div key={index} style={{ marginBottom: 16, borderBottom: "1px solid #ccc", paddingBottom: 12 }}>
//           <h3>{trend.trend_name}</h3>
//           <p>{trend.trend_context}</p>
//           <ul>
//             {trend.recommended_products.map((p) => (
//               <li key={p.product_id}>
//                 <strong>{p.product_name}</strong>: {p.description}
//               </li>
//             ))}
//           </ul>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default OpportunitiesPage;
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import React, { useEffect, useState } from "react";

interface Product {
  product_id: string;
  product_name: string;
  product_category?: string;
  tags?: string[];
  description: string;
}

interface TrendInsight {
  trend_name: string;
  trend_context: string;
  recommended_products: Product[];
}

const fallbackTrends: TrendInsight[] = [
  {
    trend_name: "Banarasi Brights",
    trend_context: "Diwali Festival",
    recommended_products: [
      {
        product_id: "t-01",
        product_name: "Crimson Banarasi Saree",
        description: "Luxurious red silk with golden zari work.",
      },
      {
        product_id: "t-02",
        product_name: "Golden Glow Kurti",
        description: "Bright festive wear with mirror embellishments.",
      },
    ],
  },
  {
    trend_name: "Pastel Parade",
    trend_context: "Pre-wedding Shoots",
    recommended_products: [
      {
        product_id: "t-03",
        product_name: "Mint Green Lehenga",
        description: "Ideal for mehndi with floral patterns.",
      },
      {
        product_id: "t-04",
        product_name: "Lavender Organza Saree",
        description: "Lightweight and dreamy pastel shades.",
      },
    ],
  },
  {
    trend_name: "Indigo Diaries",
    trend_context: "Monsoon Vibes",
    recommended_products: [
      {
        product_id: "t-05",
        product_name: "Indigo Cotton Suit",
        description: "Comfortable and breezy with handblock prints.",
      },
      {
        product_id: "t-06",
        product_name: "Rainy Blue Palazzo Set",
        description: "Perfect blend of function and style for wet weather.",
      },
    ],
  },
  {
    trend_name: "Vibrant Vermillion",
    trend_context: "Karwachauth",
    recommended_products: [
      {
        product_id: "t-07",
        product_name: "Red Bridal Saree",
        description: "Symbol of tradition and celebration.",
      },
    ],
  },
  {
    trend_name: "Yellow Bloom",
    trend_context: "Haldi Ceremony",
    recommended_products: [
      {
        product_id: "t-08",
        product_name: "Sunflower Yellow Sharara",
        description: "Chikankari with gota patti borders.",
      },
      {
        product_id: "t-09",
        product_name: "Mustard Short Kurti",
        description: "Simple yet elegant pre-wedding pick.",
      },
    ],
  },
  {
    trend_name: "Winter Weddings",
    trend_context: "December Ceremonies",
    recommended_products: [
      {
        product_id: "t-10",
        product_name: "Velvet Maroon Anarkali",
        description: "Heavy embroidered velvet for cold evenings.",
      },
      {
        product_id: "t-11",
        product_name: "Shawl Dupatta Suit Set",
        description: "With Pashmina touch and rich tones.",
      },
    ],
  },
];

const OpportunitiesPage = () => {
  const [results, setResults] = useState<TrendInsight[]>([]);
  const [loading, setLoading] = useState(false);
  const [apiTokenUsedUp, setApiTokenUsedUp] = useState(true); // Always show fallback warning

  const location = useLocation() as { state?: { seller_products?: Product[] } };

  const sellerCatalogue: Product[] = (() => {
    try {
      const stored = localStorage.getItem("seller_catalogue");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  })();

  useEffect(() => {
    fetchOpportunities();
  }, []);

  const fetchOpportunities = async () => {
    setLoading(true);
    setApiTokenUsedUp(true); // Simulate fallback always
    try {
      // const res = await axios.post("http://127.0.0.1:8000/trends/opportunities", {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/trends/opportunities`, {
        seller_products: sellerCatalogue,
      });
      setResults(res.data.trends || res.data);
    } catch {
      setResults(fallbackTrends);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-purple-100 px-6 py-10">
      <div className="mb-4">
        <Link to="/trends" className="text-sm text-pink-600 hover:underline flex items-center gap-1">
          ← Back to Forecasts
        </Link>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <Sparkles className="text-pink-500 animate-pulse" />
          AI-Powered Trend Opportunities
        </h1>
        <Button
          onClick={fetchOpportunities}
          disabled={loading}
          className="bg-pink-500 hover:bg-pink-600 text-white transition duration-200"
        >
          {loading ? "Loading..." : "Refetch"}
        </Button>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-lg p-4 mb-6 text-sm shadow-sm animate-pulse">
        Live trend generation is temporarily unavailable due to usage limits.
        Showing curated insights from our fallback database instead. 🔁
      </div>

      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-3 text-pink-700">Your Catalogue</h2>
        {sellerCatalogue.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sellerCatalogue.map((item) => (
              <div
                key={item.product_id}
                className="bg-white shadow-md p-4 rounded-xl border border-pink-100 hover:shadow-lg transition"
              >
                <h3 className="font-semibold text-pink-600">{item.product_name}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No products found in your catalogue.</p>
        )}
      </div>

      <h2 className="text-xl font-semibold mb-3 text-pink-700">Trending in Your Area</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl shadow animate-pulse h-48 flex flex-col justify-between"
            >
              <div className="h-5 bg-pink-100 rounded w-2/3 mb-2"></div>
              <div className="h-3 bg-purple-100 rounded w-1/2 mb-4"></div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-100 rounded w-full"></div>
                <div className="h-3 bg-gray-100 rounded w-5/6"></div>
                <div className="h-3 bg-gray-100 rounded w-2/3"></div>
              </div>
            </div>
          ))
        ) : (
          results.map((trend, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition duration-200"
            >
              <h3 className="text-xl font-bold text-pink-600 mb-2">{trend.trend_name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{trend.trend_context}</p>
              <ul className="list-disc list-inside space-y-2 text-sm">
                {trend.recommended_products.map((p) => (
                  <li key={p.product_id}>
                    <span className="font-semibold">{p.product_name}</span> — {p.description}
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>

      {results.length === 0 && !loading && (
        <div className="mt-10 text-center text-muted-foreground text-sm">
          No opportunities to display yet.
        </div>
      )}
    </div>
  );
};

export default OpportunitiesPage;
