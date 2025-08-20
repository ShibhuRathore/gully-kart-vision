# import os
# import io
# import base64
# import logging
# import requests
# from fastapi import FastAPI, HTTPException
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel
# from PIL import Image
# from dotenv import load_dotenv
# import google.generativeai as genai

# # Load environment variables
# load_dotenv()

# # Setup API keys
# GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
# STABILITY_API_KEY = os.getenv("STABILITY_API_KEY")

# genai.configure(api_key=GOOGLE_API_KEY)

# # Constants
# GOOGLE_TEXT_MODEL = "models/gemini-1.5-flash-latest"
# FALLBACK_IMG = "https://i.imgur.com/ExdKOOz.png"
# STABILITY_API_URL = "https://api.stability.ai/v1/generation/stable-diffusion-v1-6/text-to-image"

# # FastAPI App
# app = FastAPI()
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # You can restrict later
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Request schema
# class CampaignRequest(BaseModel):
#     product_image_url: str
#     product_name: str
#     event_name: str
#     location: str

# # Main API endpoint
# @app.post("/generate-kit")
# def generate_campaign_kit(payload: CampaignRequest):
#     try:
#         # Step 1: Generate ad copy with Gemini
#         ad_prompt = (
#             f"You are a skilled marketing copywriter for Meesho. Write one short, exciting WhatsApp "
#             f"marketing message for a '{payload.product_name}'. The campaign is for {payload.event_name} in "
#             f"{payload.location}. Include an emoji. Output ONLY the message."
#         )
#         model = genai.GenerativeModel(GOOGLE_TEXT_MODEL)
#         response = model.generate_content(ad_prompt)
#         generated_ad_copy = response.text.strip()

#         # Step 2: Fetch and describe image
#         try:
#             image_response = requests.get(payload.product_image_url, headers={"User-Agent": "Mozilla/5.0"})
#             image = Image.open(io.BytesIO(image_response.content))
#         except Exception:
#             image_response = requests.get(FALLBACK_IMG, headers={"User-Agent": "Mozilla/5.0"})
#             image = Image.open(io.BytesIO(image_response.content))

#         vision_prompt = "Describe the clothing item in this image in a short phrase like 'red silk saree with gold border'."
#         image_desc_response = model.generate_content([vision_prompt, image])
#         image_description = image_desc_response.text.strip()

#         # Step 3: Generate model image using Stability AI
#         headers = {
#             "Authorization": f"Bearer {STABILITY_API_KEY}",
#             "Content-Type": "application/json",
#             "Accept": "application/json"
#         }
#         payload_json = {
#             "text_prompts": [{
#                 "text": f"cinematic photo of a happy young indian woman wearing ({image_description}), celebrating {payload.event_name} in {payload.location}, festive background, sharp focus"
#             }],
#             "cfg_scale": 7,
#             "clip_guidance_preset": "FAST_BLUE",
#             "height": 512,
#             "width": 512,
#             "samples": 1,
#             "steps": 30
#         }

#         result = requests.post(STABILITY_API_URL, headers=headers, json=payload_json)
#         if result.status_code != 200:
#             raise HTTPException(status_code=500, detail="Image generation failed.")

#         result_json = result.json()
#         image_base64 = result_json["artifacts"][0]["base64"]
#         image_url = f"data:image/png;base64,{image_base64}"

#         return {
#             "generated_image_url": image_url,
#             "generated_ad_copy": generated_ad_copy
#         }

#     except Exception as e:
#         logging.error(str(e))
#         raise HTTPException(status_code=500, detail="Campaign generation failed. " + str(e))
# backend/main.py
# import os
# import replicate
# import logging
# from fastapi import FastAPI, HTTPException
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel, HttpUrl
# from dotenv import load_dotenv
# from typing import Optional

# # Initialize FastAPI app FIRST before using it below
# app = FastAPI()

# # Load environment variables
# load_dotenv()

# REPLICATE_API_KEY = os.getenv("REPLICATE_API_KEY")
# if not REPLICATE_API_KEY:
#     raise RuntimeError("❌ REPLICATE_API_KEY missing from .env")

# # Initialize Replicate client
# replicate_client = replicate.Client(api_token=REPLICATE_API_KEY)

# # Enable CORS for frontend integration
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # You can restrict this in prod
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Request model
# class KitRequest(BaseModel):
#     event_name: str
#     location: str
#     product_name: str
#     product_category: str
#     price: str

# # Response model
# class KitResponse(BaseModel):
#     description: str
#     generated_image_url: HttpUrl
#     ad_copy: str
#     flyer_text: str

# # 🔧 Manually construct prompt (no Gemini)
# def generate_prompt_description(event_name: str, location: str, product_name: str, product_category: str) -> str:
#     prompt = (
#         f"hyper-realistic photo of an Indian woman wearing {product_name}. "
#         f"She is celebrating {event_name} in {location}, vibrant festive background, "
#         f"8k, cinematic lighting, photorealism, DSLR shot"
#     )
#     return prompt.encode("utf-8", "ignore").decode("utf-8")

# # 🎨 Generate image from Replicate
# def generate_festive_image(prompt: str) -> Optional[str]:
#     try:
#         print("INFO: 📸 Replicate prompt →", prompt)

#         output = replicate_client.run(
#             "stability-ai/sdxl:7762fd07cf82c948538e41f63f77d685e02b063e37e496e96eefd46c929f9bdc",
#             input={
#                 "prompt": prompt,
#                 "width": 1024,
#                 "height": 1024,
#                 "num_outputs": 1
#             }
#         )

#         if isinstance(output, list) and len(output) > 0:
#             image_url = str(output[0])
#             print("✅ Generated image URL:", image_url)
#             return image_url
#         else:
#             raise ValueError("Unexpected output format from Replicate")

#     except Exception as e:
#         logging.error(f"Image generation failed: {e}")
#         return None

# # 🚀 Main API route
# @app.post("/generate-kit", response_model=KitResponse)
# def generate_campaign(payload: KitRequest):
#     # Step 1: Generate description prompt
#     img_desc = generate_prompt_description(
#         payload.event_name, payload.location, payload.product_name, payload.product_category
#     )

#     # Step 2: Generate image
#     image_url = generate_festive_image(img_desc)
#     if not image_url:
#         raise HTTPException(status_code=500, detail="Image generation failed")

#     # Step 3: Create ad copy and flyer
#     ad_copy = f"Celebrate {payload.event_name} in {payload.location} with our latest {payload.product_name}!"
#     flyer_text = (
#         f"🎉 {payload.product_name}\n"
#         f"👗 Category: {payload.product_category}\n"
#         f"💸 Price: ₹{payload.price}\n"
#         f"🛍️ Available now for {payload.event_name} in {payload.location}!"
#     )

#     return KitResponse(
#         description=img_desc,
#         generated_image_url=image_url,
#         ad_copy=ad_copy,
#         flyer_text=flyer_text
#     )

# # ✅ Import and attach trend opportunity router AFTER app is defined
# from ai_engine.opportunity_router import router as opportunity_router
# app.include_router(opportunity_router)


import os
import replicate
import logging
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, HttpUrl
from dotenv import load_dotenv
from typing import Optional

# Initialize FastAPI app FIRST before using it below
app = FastAPI()

# Load environment variables
load_dotenv()

REPLICATE_API_KEY = os.getenv("REPLICATE_API_KEY")
if not REPLICATE_API_KEY:
    raise RuntimeError("❌ REPLICATE_API_KEY missing from .env")

# Initialize Replicate client
replicate_client = replicate.Client(api_token=REPLICATE_API_KEY)

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:8080",
        "http://127.0.0.1:8080"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request model
class KitRequest(BaseModel):
    event_name: str
    location: str
    product_name: str
    product_category: str
    price: str

# Response model
class KitResponse(BaseModel):
    description: str
    generated_image_url: HttpUrl
    ad_copy: str
    flyer_text: str

# 🔧 Manually construct prompt (no Gemini)
def generate_prompt_description(event_name: str, location: str, product_name: str, product_category: str) -> str:
    prompt = (
        f"hyper-realistic photo of an Indian woman wearing {product_name}. "
        f"She is celebrating {event_name} in {location}, vibrant festive background, "
        f"8k, cinematic lighting, photorealism, DSLR shot"
    )
    return prompt.encode("utf-8", "ignore").decode("utf-8")

# 🎨 Generate image from Replicate
def generate_festive_image(prompt: str) -> Optional[str]:
    try:
        print("INFO: 📸 Replicate prompt →", prompt)

        output = replicate_client.run(
            "stability-ai/sdxl:7762fd07cf82c948538e41f63f77d685e02b063e37e496e96eefd46c929f9bdc",
            input={
                "prompt": prompt,
                "width": 1024,
                "height": 1024,
                "num_outputs": 1
            }
        )

        if isinstance(output, list) and len(output) > 0:
            image_url = str(output[0])
            print("✅ Generated image URL:", image_url)
            return image_url
        else:
            raise ValueError("Unexpected output format from Replicate")

    except Exception as e:
        logging.error(f"Image generation failed: {e}")
        return None

# 🚀 Main API route
@app.post("/generate-kit", response_model=KitResponse)
def generate_campaign(payload: KitRequest):
    # Step 1: Generate description prompt
    img_desc = generate_prompt_description(
        payload.event_name, payload.location, payload.product_name, payload.product_category
    )

    # Step 2: Generate image
    image_url = generate_festive_image(img_desc)
    if not image_url:
        raise HTTPException(status_code=500, detail="Image generation failed")

    # Step 3: Create ad copy and flyer
    ad_copy = f"Celebrate {payload.event_name} in {payload.location} with our latest {payload.product_name}!"
    flyer_text = (
        f"🎉 {payload.product_name}\n"
        f"👗 Category: {payload.product_category}\n"
        f"💸 Price: ₹{payload.price}\n"
        f"🛍️ Available now for {payload.event_name} in {payload.location}!"
    )

    return KitResponse(
        description=img_desc,
        generated_image_url=image_url,
        ad_copy=ad_copy,
        flyer_text=flyer_text
    )

# ✅ Import and attach trend opportunity router AFTER app is defined
from ai_engine.opportunity_router import router as opportunity_router
app.include_router(opportunity_router)
