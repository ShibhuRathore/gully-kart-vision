# backend/ai_engine/opportunity_router.py

from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel
from typing import List
from ai_engine.insights_engine import get_ai_powered_opportunities

router = APIRouter()

class Product(BaseModel):
    product_id: str
    product_name: str
    description: str

@router.post("/trends/opportunities") 
async def get_trend_opportunities():
    MOCK_SELLER_PRODUCTS = [
        {
            "product_id": "p-01",
            "product_name": "Royal Red & Gold Banarasi Silk Saree",
            "description": "Classic zari weave, perfect for weddings."
        },
        {
            "product_id": "p-02",
            "product_name": "Pastel Lavender Organza Saree",
            "description": "Lightweight sheer organza in trendy pastel shade."
        },
        {
            "product_id": "p-03",
            "product_name": "Mint Green Pastel Anarkali Suit",
            "description": "Floor-length suit, great for daytime functions."
        }
    ]

    results = get_ai_powered_opportunities(MOCK_SELLER_PRODUCTS)
    return results
