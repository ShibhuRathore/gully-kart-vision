import os
import google.generativeai as genai
from dotenv import load_dotenv
import logging
import base64
import io
from PIL import Image
import requests

# --- Setup ---
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
load_dotenv()

# --- Key Verification ---
google_api_key = os.getenv("GOOGLE_API_KEY")
replicate_api_key = os.getenv("REPLICATE_API_KEY")

if not google_api_key or not replicate_api_key:
    logging.error("FATAL ERROR: GOOGLE_API_KEY or REPLICATE_API_KEY missing from .env file.")
    exit()

genai.configure(api_key=google_api_key)

# --- Constants ---
GOOGLE_TEXT_MODEL = "models/gemini-1.5-flash-latest"

def run_ai_generation_pipeline(
    product_image_url: str,
    product_name: str,
    event_name: str,
    location: str
) -> dict:
    logging.info(f"Starting AI generation pipeline for '{product_name}'...")

    # --- Step 1: Generate Ad Copy with Google Gemini ---
    try:
        logging.info("Generating ad copy with Google Gemini...")
        model = genai.GenerativeModel(GOOGLE_TEXT_MODEL)
        ad_copy_prompt = f"You are a skilled marketing copywriter for Meesho. Write one short, exciting WhatsApp marketing message for a '{product_name}'. The campaign is for {event_name} in {location}. Include an emoji. Output ONLY the marketing message."
        response = model.generate_content(ad_copy_prompt)
        generated_ad_copy = response.text.strip()
        logging.info(f"Successfully generated ad copy: '{generated_ad_copy}'")
    except Exception as e:
        logging.error(f"Error calling Google Gemini API: {e}")
        return {"error": "Failed to generate ad copy.", "details": str(e)}

    # --- Step 2: Analyze Product Image using Gemini Vision ---
    try:
        logging.info("Analyzing product image with Gemini Vision...")
        headers = {'User-Agent': 'Mozilla/5.0'}
        response = requests.get(product_image_url, headers=headers)
        response.raise_for_status()
        product_image = Image.open(io.BytesIO(response.content))

        vision_model = genai.GenerativeModel(GOOGLE_TEXT_MODEL)
        vision_prompt = "Describe this clothing item in a short phrase suitable for a fashion photo shoot, e.g. 'red silk lehenga with gold embroidery'"
        response = vision_model.generate_content([vision_prompt, product_image])
        image_description = response.text.strip()
        logging.info(f"AI-generated product description: '{image_description}'")
    except Exception as e:
        logging.error(f"Error analyzing image with Gemini Vision: {e}")
        return {"error": "Failed to analyze product image.", "details": str(e)}

    # --- Step 3: Generate Image with Replicate ---
    try:
        import replicate
        replicate.Client(api_token=replicate_api_key)

        logging.info("Generating image with Replicate API...")
        final_image_prompt = (
            f"cinematic photo of a happy young indian woman wearing ({image_description}). "
            f"She is celebrating the {event_name} festival in {location}. "
            f"festive background, professional photo, hyperdetailed, sharp focus, 8k"
        )

        output = replicate.run(
            "stability-ai/sdxl:9e663be8b8b46ec9624caa7a8f9d1ca17ee048acda1e6122c9060c20bdfd924f",
            input={
                "prompt": final_image_prompt,
                "width": 512,
                "height": 512,
                "num_outputs": 1
            }
        )

        generated_image_url = output[0]
        logging.info("Successfully generated image using Replicate.")
    except Exception as e:
        logging.error(f"Error generating image with Replicate: {e}")
        return {"error": "Failed to generate model image via Replicate", "details": str(e)}

    # --- Final Result ---
    return {
        "success": True,
        "generated_image_url": generated_image_url,
        "generated_ad_copy": generated_ad_copy
    }
