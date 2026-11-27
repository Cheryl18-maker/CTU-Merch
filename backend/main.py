import uuid
import datetime
from typing import List, Optional
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

try:
    from supabase_client import supabase_client
except Exception:
    supabase_client = None

app = FastAPI(title="CTU Merch Kiosk API", version="1.0.0")

# Enable CORS for local Vite development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initial products based on CTU Merch Figma design
PRODUCTS = [
    {
        "id": "ctu-tee-classic",
        "name": "CTU Classic Tee",
        "tag": "CAMPUS ESSENTIALS",
        "category": "Apparel",
        "price": 350.00,
        "image": "/assets/products/prod_1.png",
        "gallery": [
            "/assets/products/prod_1.png",
            "/assets/products/detail_main.png",
            "/assets/products/detail_thumb1.png"
        ],
        "description": "Your everyday campus essential. Soft cotton, a relaxed unisex fit, and bold CTU lettering.",
        "inStock": True,
        "stockCount": 18,
        "stockInfo": "18 available in White / M",
        "sizes": ["S", "M", "L", "XL", "XXL"],
        "colors": [
            {"name": "White", "hex": "#FFFFFF", "border": "#E5E5E5"},
            {"name": "Orange", "hex": "#F47721", "border": "#F47721"}
        ]
    },
    {
        "id": "ctu-varsity-hoodie",
        "name": "Varsity Hoodie",
        "tag": "CAMPUS ESSENTIALS",
        "category": "Apparel",
        "price": 850.00,
        "image": "/assets/products/prod_2.jpg",
        "gallery": [
            "/assets/products/prod_2.jpg",
            "/assets/products/prod_8.png"
        ],
        "description": "Heavyweight premium cotton fleece hoodie featuring embroidered Cebu Technological University crest.",
        "inStock": True,
        "stockCount": 12,
        "stockInfo": "12 available across all sizes",
        "sizes": ["S", "M", "L", "XL", "XXL"],
        "colors": [
            {"name": "Orange", "hex": "#F47721", "border": "#F47721"},
            {"name": "Navy Blue", "hex": "#1B2A4A", "border": "#1B2A4A"},
            {"name": "Gray", "hex": "#8A8D91", "border": "#8A8D91"}
        ]
    },
    {
        "id": "ctu-everyday-tote",
        "name": "Everyday Tote",
        "tag": "DAILY COMPANIONS",
        "category": "Accessories",
        "price": 250.00,
        "image": "/assets/products/prod_3.jpg",
        "gallery": [
            "/assets/products/prod_3.jpg"
        ],
        "description": "Heavy-duty canvas tote with reinforced handles. Perfect for campus notebooks, laptops, and everyday essentials.",
        "inStock": True,
        "stockCount": 35,
        "stockInfo": "35 available",
        "sizes": ["Standard"],
        "colors": [
            {"name": "Natural Cream", "hex": "#F5F2EB", "border": "#D8D4CA"},
            {"name": "CTU Orange", "hex": "#F47721", "border": "#F47721"}
        ]
    },
    {
        "id": "ctu-campus-cap",
        "name": "Campus Cap",
        "tag": "DAILY COMPANIONS",
        "category": "Accessories",
        "price": 280.00,
        "image": "/assets/products/prod_4.jpg",
        "gallery": [
            "/assets/products/prod_4.jpg"
        ],
        "description": "Classic 6-panel unstructured dad cap with 3D CTU monogram embroidery and brass buckle closure.",
        "inStock": True,
        "stockCount": 24,
        "stockInfo": "24 available",
        "sizes": ["Adjustable"],
        "colors": [
            {"name": "Black", "hex": "#252525", "border": "#252525"},
            {"name": "CTU Orange", "hex": "#F47721", "border": "#F47721"}
        ]
    },
    {
        "id": "ctu-stainless-tumbler",
        "name": "Stainless Tumbler 750ml",
        "tag": "CAMPUS ESSENTIALS",
        "category": "Drinkware",
        "price": 420.00,
        "image": "/assets/products/prod_5.jpg",
        "gallery": [
            "/assets/products/prod_5.jpg"
        ],
        "description": "Double-wall vacuum insulated flask. Keeps campus coffee hot for 12 hours or cold iced drinks chilled for 24 hours.",
        "inStock": True,
        "stockCount": 15,
        "stockInfo": "15 available",
        "sizes": ["750 ml"],
        "colors": [
            {"name": "Matte White", "hex": "#FFFFFF", "border": "#E5E5E5"},
            {"name": "Matte Black", "hex": "#252525", "border": "#252525"},
            {"name": "CTU Orange", "hex": "#F47721", "border": "#F47721"}
        ]
    },
    {
        "id": "ctu-official-lanyard",
        "name": "Official Campus Lanyard",
        "tag": "DAILY COMPANIONS",
        "category": "Accessories",
        "price": 120.00,
        "image": "/assets/products/prod_6.png",
        "gallery": [
            "/assets/products/prod_6.png"
        ],
        "description": "High-density woven lanyard with metal swivel clasp and safety breakaway buckle for CTU Student/Faculty ID cards.",
        "inStock": True,
        "stockCount": 80,
        "stockInfo": "80 available",
        "sizes": ["Standard"],
        "colors": [
            {"name": "CTU Orange", "hex": "#F47721", "border": "#F47721"}
        ]
    },
    {
        "id": "ctu-enamel-pin-set",
        "name": "CTU Heritage Pin Set",
        "tag": "COLLECTIBLES",
        "category": "Accessories",
        "price": 180.00,
        "image": "/assets/products/prod_7.png",
        "gallery": [
            "/assets/products/prod_7.png"
        ],
        "description": "Set of 3 die-cast hard enamel collectible pins with gold plating and rubber clutches.",
        "inStock": True,
        "stockCount": 40,
        "stockInfo": "40 sets available",
        "sizes": ["Set of 3"],
        "colors": [
            {"name": "Gold / Enamel", "hex": "#D4AF37", "border": "#B3922D"}
        ]
    },
    {
        "id": "ctu-ceramic-mug",
        "name": "CTU Ceramic Coffee Mug",
        "tag": "DRINKWARE",
        "category": "Drinkware",
        "price": 200.00,
        "image": "/assets/products/prod_11.png",
        "gallery": [
            "/assets/products/prod_11.png"
        ],
        "description": "Classic 11oz ceramic mug featuring the Cebu Technological University seal in durable glaze.",
        "inStock": True,
        "stockCount": 26,
        "stockInfo": "26 available",
        "sizes": ["11 oz"],
        "colors": [
            {"name": "Gloss White", "hex": "#FFFFFF", "border": "#E5E5E5"},
            {"name": "Navy Blue", "hex": "#1B2A4A", "border": "#1B2A4A"}
        ]
    }
]

# Simulated user account
CURRENT_USER = {
    "id": "CTU-2024-08219",
    "name": "Dominic Magalso",
    "role": "Student",
    "department": "College of Computer, Information and Communications Technology",
    "campus": "Main Campus",
    "balance": 1250.00,
    "points": 450
}

# Initial orders
ORDERS = [
    {
        "id": "CTU-ORD-84920",
        "date": "Nov 25, 2026 · 02:15 PM",
        "status": "Ready for Pickup",
        "pickupLocation": "Campus Store Counter A",
        "kioskTerminal": "Kiosk Terminal #02 (Main Building)",
        "paymentMethod": "Campus Student Wallet",
        "subtotal": 600.00,
        "tax": 0.00,
        "discount": 0.00,
        "total": 600.00,
        "items": [
            {
                "id": "ctu-tee-classic",
                "name": "CTU Classic Tee",
                "size": "M",
                "color": "White",
                "price": 350.00,
                "quantity": 1,
                "image": "/assets/products/prod_1.png"
            },
            {
                "id": "ctu-everyday-tote",
                "name": "Everyday Tote",
                "size": "Standard",
                "color": "Natural Cream",
                "price": 250.00,
                "quantity": 1,
                "image": "/assets/products/prod_3.jpg"
            }
        ]
    }
]

# Rewards list
REWARDS = [
    {
        "id": "rew-1",
        "title": "CTU Sticker Pack (5-pcs)",
        "cost": 150,
        "description": "Waterproof vinyl campus decals for laptops and water bottles.",
        "icon": "sparkles"
    },
    {
        "id": "rew-2",
        "title": "₱50 Merchandise Voucher",
        "cost": 250,
        "description": "₱50 discount applicable on any campus apparel item.",
        "icon": "ticket"
    },
    {
        "id": "rew-3",
        "title": "CTU Heritage Lanyard",
        "cost": 300,
        "description": "Free official university ID lanyard with metal clasp.",
        "icon": "award"
    },
    {
        "id": "rew-4",
        "title": "Free Campus Store Tote",
        "cost": 450,
        "description": "Complimentary standard CTU canvas shopping tote.",
        "icon": "shopping-bag"
    }
]


# Pydantic schemas
class CartItem(BaseModel):
    id: str
    name: str
    size: str
    color: str
    price: float
    quantity: int
    image: str

class CreateOrderRequest(BaseModel):
    items: List[CartItem]
    paymentMethod: str
    notes: Optional[str] = ""

class RedeemRewardRequest(BaseModel):
    rewardId: str

class TopupRequest(BaseModel):
    amount: float

class LoginRequest(BaseModel):
    idNumber: str
    password: str
    role: str = "Student"


@app.get("/api/health")
def health():
    return {"status": "ok", "timestamp": datetime.datetime.now().isoformat()}

@app.get("/api/products")
def get_products(category: Optional[str] = None, search: Optional[str] = None):
    results = PRODUCTS
    if category and category != "All merchandise":
        results = [p for p in results if p["category"].lower() == category.lower()]
    if search:
        s = search.lower()
        results = [p for p in results if s in p["name"].lower() or s in p["description"].lower() or s in p["tag"].lower()]
    return results

@app.get("/api/products/{product_id}")
def get_product(product_id: str):
    for p in PRODUCTS:
        if p["id"] == product_id:
            return p
    raise HTTPException(status_code=404, detail="Product not found")

@app.get("/api/categories")
def get_categories():
    return ["All merchandise", "Apparel", "Accessories", "Drinkware"]

@app.get("/api/user")
def get_user_profile():
    return CURRENT_USER

@app.post("/api/user/topup")
def topup_wallet(req: TopupRequest):
    if req.amount <= 0:
        raise HTTPException(status_code=400, detail="Amount must be positive")
    CURRENT_USER["balance"] += req.amount
    return {"success": True, "balance": CURRENT_USER["balance"]}

@app.get("/api/orders")
def get_orders():
    return ORDERS

@app.get("/api/orders/{order_id}")
def get_order(order_id: str):
    for o in ORDERS:
        if o["id"] == order_id:
            return o
    raise HTTPException(status_code=404, detail="Order not found")

@app.post("/api/orders")
def place_order(req: CreateOrderRequest):
    if not req.items:
        raise HTTPException(status_code=400, detail="Order contains no items")
    
    subtotal = sum(item.price * item.quantity for item in req.items)
    
    # Check wallet balance if payment is Campus Wallet
    if req.paymentMethod == "Campus Student Wallet":
        if CURRENT_USER["balance"] < subtotal:
            raise HTTPException(
                status_code=402,
                detail={
                    "code": "INSUFFICIENT_BALANCE",
                    "currentBalance": CURRENT_USER["balance"],
                    "requiredAmount": subtotal,
                    "shortfall": subtotal - CURRENT_USER["balance"]
                }
            )
        # Deduct balance
        CURRENT_USER["balance"] -= subtotal
    
    # Award reward points (1 point per ₱10 spent)
    earned_points = int(subtotal // 10)
    CURRENT_USER["points"] += earned_points

    order_id = f"CTU-ORD-{str(uuid.uuid4().int)[:5]}"
    order = {
        "id": order_id,
        "date": datetime.datetime.now().strftime("%b %d, %Y · %I:%M %p"),
        "status": "Ready for Pickup",
        "pickupLocation": "Campus Store Counter A",
        "kioskTerminal": "Kiosk Terminal #01 (Main Gate)",
        "paymentMethod": req.paymentMethod,
        "subtotal": subtotal,
        "tax": 0.00,
        "discount": 0.00,
        "total": subtotal,
        "pointsEarned": earned_points,
        "items": [item.dict() for item in req.items]
    }
    ORDERS.insert(0, order)
    return {
        "success": True,
        "order": order,
        "remainingBalance": CURRENT_USER["balance"],
        "updatedPoints": CURRENT_USER["points"]
    }

@app.get("/api/rewards")
def get_rewards():
    return {
        "points": CURRENT_USER["points"],
        "rewards": REWARDS
    }

@app.post("/api/rewards/redeem")
def redeem_reward(req: RedeemRewardRequest):
    reward = next((r for r in REWARDS if r["id"] == req.rewardId), None)
    if not reward:
        raise HTTPException(status_code=404, detail="Reward not found")
    
    if CURRENT_USER["points"] < reward["cost"]:
        raise HTTPException(status_code=400, detail="Insufficient reward points")
    
    CURRENT_USER["points"] -= reward["cost"]
    return {
        "success": True,
        "message": f"Successfully redeemed {reward['title']}!",
        "reward": reward,
        "remainingPoints": CURRENT_USER["points"],
        "voucherCode": f"CTU-REW-{uuid.uuid4().hex[:6].upper()}"
    }

@app.post("/api/auth/login")
def login(req: LoginRequest):
    # Simulated login
    CURRENT_USER["role"] = req.role
    if req.idNumber:
        CURRENT_USER["id"] = req.idNumber
    return {"success": True, "user": CURRENT_USER}
