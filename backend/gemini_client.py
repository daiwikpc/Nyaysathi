import google.generativeai as genai
import os
from typing import Optional

class GeminiClient:
    def __init__(self):
        # Your Google AI Studio API key
        self.api_key = "AIzaSyAFsS7rYGXBsoqu23RvFm9_nReOVX8YzWs"
        genai.configure(api_key=self.api_key)
        self.model = genai.GenerativeModel('gemini-1.5-flash')  # Free model
        self.available = True
    
    def enhance_summary(self, text: str) -> Optional[str]:
        """Use Google Gemini to enhance/validate Ollama summary"""
        if not self.available:
            return None
        
        try:
            prompt = f"""Review this contract summary and add any important legal points that might be missing. Keep it concise:

Original Summary:
{text}

Enhanced Summary (add missing key legal points):"""
            
            response = self.model.generate_content(prompt)
            return response.text.strip()
        except Exception as e:
            print(f"Gemini enhancement failed: {e}")
            return None
    
    def risk_analysis(self, text: str) -> Optional[str]:
        """Analyze legal risks using Gemini"""
        if not self.available:
            return None
        
        try:
            prompt = f"""Analyze this legal text and identify TOP 3 RISKS in bullet points:

Legal Text:
{text[:3000]}

Risk Analysis (3 bullet points max):"""
            
            response = self.model.generate_content(prompt)
            return response.text.strip()
        except Exception as e:
            print(f"Risk analysis failed: {e}")
            return None
    
    def translate_hindi(self, text: str) -> Optional[str]:
        """Translate legal text to Hindi using Gemini"""
        if not self.available:
            return None
        
        try:
            prompt = f"""Translate this legal text to Hindi, keeping legal terms accurate:

English Text:
{text}

Hindi Translation:"""
            
            response = self.model.generate_content(prompt)
            return response.text.strip()
        except Exception as e:
            print(f"Translation failed: {e}")
            return None

# Global instance
gemini_client = GeminiClient()
