import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface FestivalModalProps {
  open: boolean;
  onClose: () => void;
  festival: {
    name: string;
    category: string;
    icon: string;
  } | null;
}

const FestivalModal: React.FC<FestivalModalProps> = ({ open, onClose, festival }) => {
  const navigate = useNavigate();

  if (!festival) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md animate-in fade-in zoom-in duration-300 border-none shadow-xl">
        {/* Gradient Header */}
        <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white p-4 rounded-t-lg mb-4 text-center">
          <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
            <span>{festival.icon}</span> {festival.name} Insights
          </h2>
        </div>

        {/* Trend Highlight */}
        <div className="bg-pink-50 border border-pink-200 text-pink-800 rounded-lg p-3 text-sm mb-4">
          <strong>Top Trend:</strong> {festival.category}
        </div>

        {/* Insight Bullets */}
        <ul className="text-sm text-muted-foreground space-y-3">
          <li>✨ Consumers are actively searching for <strong>{festival.category}</strong> this season.</li>
          <li>📦 Sellers offering <strong>{festival.category}</strong> are seeing a 25% increase in engagement.</li>
          <li>🚀 Ideal for campaign targeting during this festival period.</li>
        </ul>

        {/* CTA */}
        <div className="flex justify-between items-center mt-6">
          <Button
            className="bg-purple-600 hover:bg-purple-700 text-white"
            onClick={() => navigate("/campaigns")}
          >
            Generate Campaign
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FestivalModal;
