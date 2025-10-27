# **App Name**: PharmaVaidya

## Core Features:

- Plant Identification: Allow users to upload or capture plant photos to identify species using a TensorFlow.js model, displaying English, Hindi, and tribal names with endangerment status and family/genus information. The plant identification process is 100% client-side, ensuring user privacy.
- Medicinal Knowledge Base & AI Chatbot: Provide medicinal uses, preparation methods, and precautions for identified plants, coupled with an AI chatbot (using Gemini API) for answering plant/health-related questions referencing the plant database. The chatbot tool falls back to a code-based FAQ if the API fails.
- Tribal Language Learning: Display plant names in 400+ Indian tribal languages with pronunciation guides. Offer a gamified test where users listen to or record plant names, with speech recognition (Web Speech API) scoring for correctness, along with points, progress tracking, and achievements on a leaderboard.
- Community Knowledge Remedies: Enable users to submit new remedies (photo, plant, description, language, rating) through a form with a client-side preview, saved in localStorage or optionally submitted via GitHub Issues/Discussions API. AI-assisted verification performs plausibility checks, and users can upvote/downvote with sorting by rating/recency.
- Voice Interaction: Implement voice input throughout the application for uploads, questions, and submissions in Hindi/English via the microphone (Web Speech API), with results read aloud using SpeechSynthesis. Buttons for microphone and speech provide error/fallback support.
- Leaderboard & Progress Tracking: Track user's plant identifications, language progress, and remedy contributions with gamified badges for achievements. This feature persistently stores data in localStorage to maintain the user's state.

## Style Guidelines:

- Primary color: Green (#4CAF50), to evoke a sense of nature, health, and growth, consistent with the app's focus on plants and medicinal knowledge.
- Background color: Light Beige (#F5F5DC), creating a calm and natural feel that aligns well with a health and plant-focused app. The light color provides a clean base for content.
- Accent color: Orange (#FF7043) to add vibrancy and energy, providing a contrasting highlight for interactive elements and important calls to action, complementing the app's core functionality.
- Body and headline font: 'PT Sans' (sans-serif), chosen for its readability and modern appearance suitable for both headlines and body text.
- Code font: 'Source Code Pro' (monospace), ideal for displaying plant data snippets.
- Utilize rounded and friendly icons with a theme related to plants, people, and speech microphones.
- Employ large, rounded cards/sections with a soft shadow and the designated background color to present information in an organized, visually appealing manner, using sufficient white-space for readability.
- Incorporate subtle CSS transitions for state changes and loading animations to enhance user experience without overwhelming the interface.