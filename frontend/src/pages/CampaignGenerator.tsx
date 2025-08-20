import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MapPin, TrendingUp, Sparkles, Calendar, Download, Edit } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import APILimitNotice from "@/components/ui/APILimitNotice"; // ✅ Notice import

const CampaignGenerator = () => {
  const [form, setForm] = useState({
    product_name: "White Suit Set",
    product_category: "Women's Clothing",
    price: "999",
    event_name: "diwali",
    location: "Lucknow"
  });

  const [loading, setLoading] = useState(false);
  const [kit, setKit] = useState<{ generated_image_url: string; ad_copy: string } | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      console.log("🔁 Sending to backend:", form);
      const { data } = await axios.post(
        import.meta.env.VITE_API_URL + "/generate-kit",
        form,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      setKit(data);
      toast({ title: "Success", description: "Campaign generated" });
    } catch (e) {
      console.error("❌ Generation failed:", e);
      toast({ title: "Error", description: "Generation failed" });
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!kit?.generated_image_url) return;
    const a = document.createElement("a");
    a.href = kit.generated_image_url;
    a.download = "campaign-image.jpg";
    a.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-pink-50 font-sans">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-gradient-to-b from-fuchsia-600 to-pink-500 p-6 min-h-screen shadow-xl rounded-tr-3xl">
          <div className="text-white mb-8">
            <h2 className="text-2xl font-bold tracking-wide">GullyKart</h2>
            <p className="text-sm opacity-80 italic">Vision</p>
          </div>
          <nav className="space-y-2 text-sm">
            <Link to="/" className="flex items-center gap-3 p-3 rounded-xl text-white/90 hover:bg-white/20 transition-all duration-150"><MapPin size={20} />Home</Link>
            <Link to="/trends" className="flex items-center gap-3 p-3 rounded-xl text-white/90 hover:bg-white/20 transition-all duration-150"><TrendingUp size={20} />Forecasts</Link>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/20 text-white font-semibold shadow-md"><Sparkles size={20} />Campaigns<span className="ml-auto text-xs bg-white/30 px-2 py-1 rounded-full">BETA</span></div>
            <Link to="/dashboard" className="flex items-center gap-3 p-3 rounded-xl text-white/90 hover:bg-white/20 transition-all duration-150"><Calendar size={20} />Account</Link>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-10">
          <h1 className="text-4xl font-bold text-fuchsia-700 mb-6">✨ Campaign Generator</h1>

          {/* ⚠️ Limit Notice */}
          <APILimitNotice />

          {/* Inputs */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            {["product_name", "product_category", "price", "event_name", "location"].map((field, i) => (
              <Input
                key={i}
                type={field === "price" ? "number" : "text"}
                placeholder={field.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
                value={form[field]}
                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                className="bg-pink-100 border-pink-300 focus:ring-2 focus:ring-pink-400 rounded-xl shadow-sm placeholder:text-pink-700"
              />
            ))}
          </div>

          <Button
            className="bg-gradient-to-r from-fuchsia-500 to-pink-500 hover:from-pink-600 hover:to-fuchsia-600 text-white px-8 py-3 rounded-full text-lg shadow-md"
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading ? "Generating…" : "🚀 Generate Campaign"}
          </Button>

          {kit && (
            <div className="grid md:grid-cols-3 gap-8 mt-10">
              {/* Instagram Reel Preview */}
              <Card className="p-5 bg-white border border-pink-200 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-200">
                <h4 className="text-lg font-semibold text-center text-fuchsia-700 mb-3">Instagram Reel Preview</h4>
                <div className="bg-pink-50 rounded-xl p-3 mb-4 aspect-[9/16] flex items-center justify-center overflow-hidden">
                  <img src={kit.generated_image_url} alt="Instagram Reel" className="rounded-lg max-h-full object-cover" />
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="secondary" className="flex-1">
                    <Edit size={16} className="mr-1" />Edit
                  </Button>
                  <Button size="sm" variant="secondary" className="flex-1" onClick={handleDownload}>
                    <Download size={16} className="mr-1" />Download
                  </Button>
                </div>
              </Card>

              {/* WhatsApp Flyer */}
              <Card className="p-5 bg-gradient-to-b from-pink-400 to-fuchsia-500 text-white rounded-2xl shadow-md hover:shadow-xl">
                <div className="text-center">
                  <h4 className="text-xl font-bold tracking-wide mb-2">📲 WHATSAPP FLYER</h4>
                  <img src={kit.generated_image_url} alt="Flyer" className="w-24 h-24 rounded-xl mx-auto mb-3 object-cover border border-white" />
                  {kit.ad_copy && <p className="text-sm italic mt-2 text-white/90">{kit.ad_copy}</p>}
                  <a href="https://www.meesho.com" target="_blank" rel="noopener noreferrer">
                    <Button className="bg-white text-pink-600 hover:bg-white/90 mt-4 font-semibold shadow-sm">Shop Now</Button>
                  </a>
                </div>
              </Card>

              {/* Story Card */}
              <Card className="p-5 bg-gradient-to-b from-fuchsia-600 to-purple-700 text-white rounded-2xl shadow-md hover:shadow-xl">
                <div className="text-center mb-3">
                  <h4 className="text-xl font-bold mb-2 tracking-wider">{form.event_name.toUpperCase()} COLLECTION</h4>
                  <img src={kit.generated_image_url} alt="Story Card" className="w-24 h-24 rounded-xl mx-auto mb-3 object-cover border border-white" />
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="secondary" className="flex-1">
                    <Edit size={16} className="mr-1" />Edit
                  </Button>
                  <Button size="sm" variant="secondary" className="flex-1" onClick={handleDownload}>
                    <Download size={16} className="mr-1" />Download
                  </Button>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CampaignGenerator;
