# Gemini AI Chatbot with PDF Context

A full-stack application that integrates Gemini AI for contextual conversations with PDF document support.

## Features

- **Authentication System**: Secure user authentication using Supabase Auth
- **Gemini AI Integration**: Powerful AI chat capabilities using Google's Gemini API
- **PDF Document Processing**: Upload and extract text from PDF documents to provide context for conversations
- **Chat History**: Persistent storage of conversations for authenticated users
- **Responsive UI**: Clean, modern interface built with Next.js and Tailwind CSS

## Technology Stack

- **Frontend**: Next.js, React, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes
- **Authentication**: Supabase Auth
- **Database**: Supabase PostgreSQL
- **AI**: Google Gemini API
- **PDF Processing**: pdf.js-extract

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Supabase account
- Google AI Studio API key (Gemini)

### Environment Setup

Create a `.env.local` file with the following variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GEMINI_API_KEY=your_gemini_api_key
```

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/gemini-pdf-chatbot.git
cd gemini-pdf-chatbot
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. Register or log in to access the chat interface
2. Upload a PDF document to provide context for your conversation
3. Start chatting with the AI assistant
4. View your chat history from previous sessions

## Project Structure

- `/app` - Next.js application routes and pages
- `/components` - Reusable UI components
- `/lib` - Utility functions and shared code
- `/utils` - Helper functions for authentication and API calls

## API Endpoints

- `POST /api/chat/stream` - Stream AI responses for real-time chat
## Deployment

This application can be deployed on Vercel with the following configuration:

1. Connect your GitHub repository to Vercel
2. Configure environment variables in the Vercel dashboard
3. Deploy the application
