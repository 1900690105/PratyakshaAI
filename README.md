🧠 PratyakshaAI

AI-Powered Food Health & Nutrition Analyzer

PratyakshaAI helps users make informed food choices by scanning food barcodes or ingredient labels and analyzing them based on personal health profiles using AI.

🚀 Features
🔍 Food Scanning

📷 Barcode Scanning (Camera / Image upload)

🧾 Ingredient OCR Scan

🌍 Fetches verified product data from OpenFoodFacts

🧠 AI-Powered Personal Analysis

Personalized food suitability analysis using Google Gemini AI

Considers:

Health conditions (e.g. Diabetes)

Allergies

Diet preferences

Weight & health goals

Clear verdict: Good / Moderate / Poor fit

🧬 Nutrition & Ingredient Insights

Nutrient levels (Sugar, Fat, Salt, Saturated Fat)

Additives & allergen detection

NOVA & NutriScore awareness

Health warnings & advice

🗂 Smart Data Storage

Product caching in Firestore (avoids repeated API calls)

User-specific AI analysis history

Secure authentication with Firebase

🏗 Tech Stack
Frontend

Next.js 16 (App Router)

React

Tailwind CSS

shadcn/ui

Lucide Icons

Backend

Next.js API Routes

Google Gemini API

OpenFoodFacts API

Database & Auth

Firebase Authentication

Cloud Firestore

📦 Project Structure
app/
 ├─ api/
 │   ├─ for-me-analysis/       # AI health analysis API
 │   └─ auth/                  # Auth routes
 ├─ components/
 │   ├─ BarcodeScanner.tsx
 │   ├─ OCRUploader.tsx
 │   ├─ ProductInfo.tsx
 │   └─ PersonalizeData.tsx
 ├─ dashboard/
 │   └─ scan-food/
 └─ auth/
lib/
 ├─ firebase.ts
 ├─ auth.ts
 ├─ cookies.ts
 ├─ productCache.ts

🗃 Firestore Collections
users

Stores user profile & health information.

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

productdetails (Global Cache)

Stores full OpenFoodFacts product JSON safely.

{
  "barcode": "8906010502591",
  "raw_json": "{...stringified product...}",
  "createdAt": "timestamp"
}

airesult

Stores personalized AI analysis results.

{
  "uid": "user_uid",
  "barcode": "8906010502591",
  "analysis": { ...AI result JSON... },
  "createdAt": "timestamp"
}

🔐 Environment Variables

Create a .env.local file:

NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key


⚠️ Never commit secrets or service account keys to GitHub

🧪 Local Development
# Install dependencies
npm install

# Run development server
npm run dev


Open:
👉 http://localhost:3000

🧠 AI Analysis Output Example
{
  "overall_fit": "poor",
  "health_score": 15,
  "is_recommended": false,
  "negative_factors": ["High sugar content"],
  "health_warnings": ["Not suitable for diabetes"],
  "final_advice": "This product should be avoided."
}

🔒 Security Notes

Firebase cookies are HTTP-only

Product caching avoids unnecessary API calls

AI responses are strictly JSON-validated

GitHub push protection enabled

🛣 Roadmap

✅ Barcode scanning

✅ OCR ingredient scanning

✅ Personalized AI analysis

⏳ Scan history dashboard

⏳ Health trend analytics

⏳ Offline scanning support

⏳ Multi-language support

👨‍⚕️ Disclaimer

PratyakshaAI provides informational insights only and is not a medical diagnosis tool. Always consult a healthcare professional for medical advice.

📜 License

MIT License © 2025
PratyakshaAI

🙌 Author

Built with ❤️ by PratyakshaAI Team
