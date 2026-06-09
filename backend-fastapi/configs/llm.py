from openai import OpenAI
from google import genai
from google.genai import types

def create_gemini_client(api_key) :
    client = genai.Client(api_key = api_key)
    return client


OPENAI_BASE_URL_GEMINI = "https://generativelanguage.googleapis.com/v1beta/openai/"

def create_openai_client(api_key) :
    client = OpenAI(
        api_key = api_key,
        base_url = OPENAI_BASE_URL_GEMINI
    )
    return client