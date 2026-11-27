import os
from typing import Optional
from supabase import create_client, Client

SUPABASE_URL = os.getenv("SUPABASE_URL", "https://aograbohxutnakmcnrgm.supabase.co")
SUPABASE_KEY = os.getenv("SUPABASE_KEY", "")

supabase_client: Optional[Client] = None

try:
    if SUPABASE_KEY:
        supabase_client = create_client(SUPABASE_URL, SUPABASE_KEY)
except Exception as e:
    print(f"Warning: Could not initialize Supabase client: {e}")
