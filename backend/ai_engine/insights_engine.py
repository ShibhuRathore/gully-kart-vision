# import json
# import logging
# import re
# from collections import defaultdict
# from ai_engine.trend_researcher import fetch_ethnic_trends

# # --- Logging Setup ---
# logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")

# # --- Helper Functions ---
# def normalize(text: str) -> str:
#     """Convert text to lowercase and remove punctuation for matching."""
#     return re.sub(r"[^a-z0-9\s]", " ", text.lower())

# def score_product_against_keyword(product: dict, keyword: str) -> int:
#     """
#     Simple score: +2 if keyword in product name, +1 if in description.
#     """
#     keyword = keyword.lower()
#     name_score = 2 if keyword in normalize(product.get("product_name", "")) else 0
#     desc_score = 1 if keyword in normalize(product.get("description", "")) else 0
#     return name_score + desc_score

# # --- Main Matching Function ---
# # def get_ai_powered_opportunities(seller_products: list) -> list:
# #     """
# #     Matches seller products to trends using keyword scoring (no Gemini).
# #     """
# #     if not seller_products:
# #         logging.warning("Seller product list is empty.")
# #         return []

# #     raw_trend_data = fetch_ethnic_trends(["Diwali", "Rakhi", "Karva Chauth", "Durga Puja"])
# #     if not raw_trend_data:
# #         logging.error("No trend data fetched.")
# #         return []

# #     fashion_keywords = [
# #         "saree", "lehenga", "anarkali", "kurta", "salwar", "choli",
# #         "organza", "banarasi", "pastel", "zari", "mirror", "chaniya"
# #     ]

# #     opportunities = []

# #     for trend_group in raw_trend_data:
# #         festival = trend_group["festival"]
# #         for trend in trend_group["trends"]:
# #             trend_title = trend["title"]

# #             # --- Smart Keyword Extraction ---
# #             normalized_title = normalize(trend_title)
# #             found = [kw for kw in fashion_keywords if kw in normalized_title]
# #             keyword = found[0] if found else None
# #             if not keyword:
# #                 continue  # Skip if no keyword found

# #             scored = []
# #             for product in seller_products:
# #                 score = score_product_against_keyword(product, keyword)
# #                 if score > 0:
# #                     scored.append((score, product))

# #             scored.sort(reverse=True, key=lambda x: x[0])
# #             top_products = [prod for _, prod in scored[:2]]

# #             if top_products:
# #                 opportunities.append({
# #                     "trend_name": trend_title,
# #                     "trend_context": f"Trending during {festival}. Related to keyword: {keyword}.",
# #                     "recommended_product_ids": [p["product_id"] for p in top_products],
# #                     "recommended_products": top_products
# #                 })

# #     logging.info(f"✅ Found {len(opportunities)} matched opportunities.")
# #     return opportunities
# def get_ai_powered_opportunities(seller_products: list) -> list:
#     if not seller_products:
#         logging.warning("Seller product list is empty.")
#         return []

#     raw_trend_data = fetch_ethnic_trends(["Diwali", "Rakhi", "Karva Chauth", "Durga Puja"])
#     if not raw_trend_data:
#         logging.error("No trend data fetched.")
#         return []

#     # Manual mapping of some known keywords for each festival
#     fallback_keywords = {
#         "Diwali": ["banarasi", "zari", "lehenga", "saree"],
#         "Rakhi": ["pastel", "organza", "anarkali"],
#         "Karva Chauth": ["choli", "mirror", "saree"],
#         "Durga Puja": ["kurta", "salwar", "anarkali"]
#     }

#     opportunities = []

#     for trend_group in raw_trend_data:
#         festival = trend_group["festival"]
#         keywords = fallback_keywords.get(festival, [])

#         for trend in trend_group["trends"]:
#             trend_title = trend["title"]

#             matched_products = set()
#             for keyword in keywords:
#                 for product in seller_products:
#                     score = score_product_against_keyword(product, keyword)
#                     if score > 0:
#                         matched_products.add((score, product["product_id"], product))

#             sorted_matches = sorted(list(matched_products), reverse=True, key=lambda x: x[0])
#             top_products = [p for _, _, p in sorted_matches[:2]]

#             if top_products:
#                 opportunities.append({
#                     "trend_name": trend_title,
#                     "trend_context": f"Trending during {festival}",
#                     "recommended_product_ids": [p["product_id"] for p in top_products],
#                     "recommended_products": top_products
#                 })

#     logging.info(f"✅ Found {len(opportunities)} matched opportunities.")
#     return opportunities

# # --- Test Harness ---
# if __name__ == "__main__":
#     MOCK_SELLER_PRODUCTS = [
#         {
#             "product_id": "p-01",
#             "product_name": "Royal Red & Gold Banarasi Silk Saree",
#             "description": "Classic zari weave, perfect for weddings."
#         },
#         {
#             "product_id": "p-02",
#             "product_name": "Pastel Lavender Organza Saree",
#             "description": "Lightweight sheer organza in trendy pastel shade."
#         },
#         {
#             "product_id": "p-03",
#             "product_name": "Mint Green Pastel Anarkali Suit",
#             "description": "Floor-length suit, great for daytime functions."
#         }
#     ]

#     print("\n🔍 Testing AI Matching Engine...\n")
#     results = get_ai_powered_opportunities(MOCK_SELLER_PRODUCTS)

#     if results:
#         print(f"📦 Matched {len(results)} trend opportunities:\n")
#         print(json.dumps(results, indent=2, ensure_ascii=False))
#     else:
#         print("⚠️ No matches found.")
import json
import logging
import re
from ai_engine.trend_researcher import fetch_ethnic_trends

# --- Logging Setup ---
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")

# --- Helper Functions ---
def normalize(text: str) -> str:
    """Convert text to lowercase and remove punctuation for matching."""
    return re.sub(r"[^a-z0-9\s]", " ", text.lower())

def score_product_against_keyword(product: dict, keyword: str) -> int:
    """
    Simple score: +2 if keyword in product name, +1 if in description.
    """
    keyword = keyword.lower()
    name_score = 2 if keyword in normalize(product.get("product_name", "")) else 0
    desc_score = 1 if keyword in normalize(product.get("description", "")) else 0
    return name_score + desc_score

# --- Main Matching Function ---
def get_ai_powered_opportunities(seller_products: list) -> list:
    if not seller_products:
        logging.warning("Seller product list is empty.")
        return []

    raw_trend_data = fetch_ethnic_trends(["Diwali", "Rakhi", "Karva Chauth", "Durga Puja"])
    if not raw_trend_data:
        logging.error("No trend data fetched.")
        return []

    # Manual fallback mapping of keywords per festival
    fallback_keywords = {
        "Diwali": ["banarasi", "zari", "lehenga", "saree"],
        "Rakhi": ["pastel", "organza", "anarkali"],
        "Karva Chauth": ["choli", "mirror", "saree"],
        "Durga Puja": ["kurta", "salwar", "anarkali"]
    }

    opportunities = []

    for trend_group in raw_trend_data:
        festival = trend_group["festival"]
        keywords = fallback_keywords.get(festival, [])

        for trend in trend_group["trends"]:
            trend_title = trend["title"]

            matched_products = []
            for keyword in keywords:
                for product in seller_products:
                    score = score_product_against_keyword(product, keyword)
                    if score > 0:
                        matched_products.append((score, product["product_id"], product))

            # Sort by score descending
            sorted_matches = sorted(matched_products, reverse=True, key=lambda x: x[0])

            # Top 2 unique products only
            seen_ids = set()
            top_products = []
            for _, pid, prod in sorted_matches:
                if pid not in seen_ids:
                    top_products.append(prod)
                    seen_ids.add(pid)
                if len(top_products) == 2:
                    break

            if top_products:
                opportunities.append({
                    "trend_name": trend_title,
                    "trend_context": f"Trending during {festival}",
                    "recommended_product_ids": [p["product_id"] for p in top_products],
                    "recommended_products": top_products
                })

    logging.info(f"✅ Found {len(opportunities)} matched opportunities.")
    return opportunities

# --- Test Harness ---
if __name__ == "__main__":
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

    print("\n🔍 Testing AI Matching Engine...\n")
    results = get_ai_powered_opportunities(MOCK_SELLER_PRODUCTS)

    if results:
        print(f"📦 Matched {len(results)} trend opportunities:\n")
        print(json.dumps(results, indent=2, ensure_ascii=False))
    else:
        print("⚠️ No matches found.")
