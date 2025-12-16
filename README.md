🧠 PratyakshaAI
Intelligent Food Health Analysis Powered by AI

PratyakshaAI is an AI-driven food intelligence platform that helps individuals make safer, healthier food choices by analyzing packaged food products against their personal health profile.

Using barcode scanning, OCR, verified nutrition databases, and generative AI, PratyakshaAI delivers clear, personalized dietary guidance in seconds.

🌟 Why PratyakshaAI?

Modern food labels are complex, misleading, and difficult to interpret — especially for people managing:

Diabetes

Food allergies

Weight goals

Special diets (low sugar, keto, vegan, etc.)

PratyakshaAI bridges the gap between food data and personal health.

🚀 Core Capabilities
🔍 Smart Food Scanning

Barcode scanning via camera or image upload

Ingredient OCR from packaging

Global product lookup via OpenFoodFacts

🧠 AI-Powered Personal Health Analysis

Each product is evaluated specifically for the user, considering:

Health conditions

Allergies & sensitivities

Dietary preferences

Wellness goals

The AI returns:

Overall health fit (Good / Moderate / Poor)

Personalized warnings

Clear dietary advice

Ingredient-level risk assessment

🧬 Deep Nutrition Insights

Sugar, salt, fat & saturated fat levels

Additives & allergens

NOVA food classification

NutriScore awareness

🗂 Intelligent Data Architecture

Global product caching (no repeated API calls)

User-specific AI analysis history

Secure, scalable Firebase backend

🏗 Technology Stack
Frontend

Next.js 16 (App Router)

React

Tailwind CSS

shadcn/ui

Lucide Icons

Backend & AI

Next.js API Routes

Google Gemini AI

OpenFoodFacts API

Database & Authentication

Firebase Authentication

Cloud Firestore

📦 System Architecture
User
 ↓
Scan (Barcode / OCR)
 ↓
Local Cache Check (Firestore)
 ↓
OpenFoodFacts (if needed)
 ↓
AI Analysis (Gemini)
 ↓
Personalized Health Verdict

🗃 Firestore Data Model
👤 Users (users)

Stores health profile and preferences.

{
  "uid": "string",
  "email": "string",
  "age": 28,
  "gender": "Male",
  "conditions": ["Diabetes"],
  "allergies": ["Milk", "Soy"],
  "diet": "Low Sugar",
  "goal": "Weight loss"
}

📦 Product Cache (productdetails)

Stores complete product data safely as raw JSON.

{
  "barcode": "8906010502591",
  "raw_json": "{...stringified product data...}",
  "createdAt": "timestamp"
}

🤖 AI Analysis Results (airesult)

Stores user-specific AI health evaluations.

{
  "uid": "user_uid",
  "barcode": "8906010502591",
  "analysis": { "...AI result JSON..." },
  "createdAt": "timestamp"
}

🧠 AI Response Format
{
  "overall_fit": "poor",
  "health_score": 15,
  "is_recommended": false,
  "negative_factors": ["High sugar content"],
  "health_warnings": ["Not suitable for diabetes"],
  "final_advice": "This product should be avoided."
}

🔐 Security & Privacy

🔒 HTTP-only authentication cookies

🔐 No secrets committed to source control

🧾 Strict JSON validation for AI responses

🛡 GitHub secret scanning enabled

⚙️ Environment Setup

Create .env.local:

NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

NEXT_PUBLIC_GEMINI_API_KEY=


⚠️ Never commit API keys or service account files

🧪 Local Development
npm install
npm run dev


Open:

http://localhost:3000

🛣 Roadmap

✅ Barcode scanning

✅ OCR ingredient scanning

✅ Personalized AI health analysis

⏳ Scan history & analytics

⏳ Health trend tracking

⏳ Offline scanning support

⏳ Multi-language support

⚠️ Medical Disclaimer

PratyakshaAI provides informational guidance only.
It does not replace professional medical advice.
Always consult a qualified healthcare provider for medical decisions.

📜 License

MIT License © 2025
PratyakshaAI

👨‍💻 Team

PratyakshaAI
Building responsible AI for healthier lives.
