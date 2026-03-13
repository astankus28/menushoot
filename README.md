# MenuShoot.ai

AI-powered food photography transformation. Upload a casual food photo (even from your phone) and receive a professionally styled hero shot.

## Tech Stack

- **Next.js 14** (App Router)
- **Tailwind CSS**
- **Google Gemini API** (image generation)
- Dark, warm food-photography aesthetic

## Setup

### 1. Install dependencies

```bash
cd /Users/andrewstankus/Documents/MenuShootAI
npm install
```

### 2. Add your API key

Copy the example env file and add your Gemini API key:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your key from [Google AI Studio](https://aistudio.google.com/apikey):

```
GOOGLE_GEMINI_API_KEY=your_api_key_here
```

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build for production

```bash
npm run build
npm start
```

## API Key Notes

Image generation requires a Gemini model with image output support (e.g. `gemini-2.0-flash-exp`). If you hit limits or errors, consider:

- Using [Vertex AI](https://cloud.google.com/vertex-ai) with Imagen for production
- Checking [Google AI Studio](https://aistudio.google.com) for model availability
