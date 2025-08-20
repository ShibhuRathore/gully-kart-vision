import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "@/components/ui/use-toast";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

const Dashboard = () => {
  const [flyers, setFlyers] = useState(4502);
  const [clicks, setClicks] = useState(811);
  const [conversions, setConversions] = useState(249);
  const [rate, setRate] = useState(18.3);

  useEffect(() => {
    const interval = setInterval(() => {
      setFlyers(f => f + Math.floor(Math.random() * 3));
      setClicks(c => c + Math.floor(Math.random() * 2));
      setConversions(c => c + 1);
      setRate(r => Math.min(100, r + 0.1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const conversionData = [
    { day: "Jul 1", value: 100 },
    { day: "Jul 2", value: 140 },
    { day: "Jul 3", value: 190 },
    { day: "Jul 4", value: 230 },
    { day: "Jul 5", value: 260 },
    { day: "Jul 6", value: 310 },
    { day: "Jul 7", value: 370 }
  ];

  const productEngagement = [
    { name: "Kurtis", value: 85 },
    { name: "Sarees", value: 70 },
    { name: "Jeans", value: 60 },
    { name: "Tops", value: 75 },
    { name: "Dupattas", value: 90 }
  ];

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-blue-900 px-4 sm:px-6 md:px-8 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="fixed top-4 right-4 bg-white/10 backdrop-blur-lg px-3 py-1 text-xs rounded-full text-white border border-white/20 z-50">
        🔧 Preview Mode – Data is simulated
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div className="text-white">
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-bold">GullyKart Vision</h1>
            <span className="bg-green-400 text-green-900 px-3 py-1 rounded-full text-sm font-medium">Beta</span>
          </div>
          <p className="text-white/80">AI-powered hyperlocal fashion analytics</p>
        </div>
       <a
  href="/sample_report.png"
  download
  className="inline-flex items-center bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-md font-medium transition-all shadow-md"
>
  <Download size={16} className="mr-2" />
  Download Report
</a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Summary */}
        <Card
          onClick={() => toast({ title: "Summary", description: "Analytics overview coming soon!" })}
          className="p-6 bg-white/90 backdrop-blur-sm shadow-md rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-xl cursor-pointer"
        >
          <h2 className="text-2xl font-bold mb-6 text-foreground">Summary</h2>
          <div className="space-y-4 text-sm sm:text-base">
            <div className="flex justify-between"><span>Top Product</span><strong>Anokhi</strong></div>
            <div className="flex justify-between"><span>Flyers Shared</span><strong>{flyers.toLocaleString()}</strong></div>
            <div className="flex justify-between"><span>Clicks</span><strong>{clicks.toLocaleString()}</strong></div>
            <div className="flex justify-between"><span>Conversions</span><strong>{conversions.toLocaleString()}</strong></div>
            <div className="flex justify-between"><span>Engagement Rate</span><strong>{rate.toFixed(1)}%</strong></div>
          </div>
        </Card>

        {/* Flyer Engagement */}
        <Card
          onClick={() => toast({ title: "Flyer Engagement", description: "Click-through insights coming soon." })}
          className="p-6 bg-white/10 backdrop-blur-sm text-white rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-xl cursor-pointer"
        >
          <h2 className="text-2xl font-bold mb-6">Flyer Engagement</h2>
          <div className="flex items-center justify-center mb-4">
            <div className="relative w-48 h-48">
              <div className="w-full h-full rounded-full relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-cyan-400" style={{ clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 61%, 50% 50%)' }}></div>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-yellow-400" style={{ clipPath: 'polygon(50% 50%, 100% 61%, 100% 89%, 50% 50%)' }}></div>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-red-400" style={{ clipPath: 'polygon(50% 50%, 100% 89%, 50% 100%, 50% 50%)' }}></div>
                <div className="absolute inset-4 bg-purple-700 rounded-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{(rate + 43).toFixed(0)}%</div>
                    <div className="text-sm opacity-80">Click-Through</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className="text-center text-green-400 text-sm">● Click-Through Rate</p>
        </Card>

        {/* Daily Conversions (Recharts) */}
        <Card
          onClick={() => toast({ title: "Daily Conversions", description: "Live trend visualization enabled!" })}
          className="p-6 bg-white/10 backdrop-blur-sm text-white rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-xl cursor-pointer"
        >
          <h2 className="text-2xl font-bold mb-6">Daily Conversions</h2>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={conversionData}>
              <XAxis dataKey="day" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" stroke="#555" />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Product Engagement */}
        <Card
          onClick={() => toast({ title: "Product Engagement", description: "Top category-level engagement." })}
          className="p-6 bg-white/10 backdrop-blur-sm text-white rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-xl cursor-pointer"
        >
          <h2 className="text-2xl font-bold mb-6">Product Engagement</h2>
          <div className="space-y-3">
            {productEngagement.map((item, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-sm font-medium">
                  <span>{item.name}</span>
                  <span>{item.value}%</span>
                </div>
                <div className="w-full h-3 bg-white/20 rounded-full">
                  <div className="h-3 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-full" style={{ width: `${item.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Back Button */}
      <div className="mt-10 text-center">
        <Link to="/">
          <Button
            className="bg-white text-purple-700 font-semibold hover:bg-pink-100 hover:text-pink-600 px-6 py-3 rounded-full transition-all duration-300 shadow-md"
          >
            ⬅️ Back to Home
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};

export default Dashboard;
