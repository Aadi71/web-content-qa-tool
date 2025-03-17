
# **Web Content Q&A Tool**

A web-based tool that allows users to input one or more URLs, ingest their content, and ask questions based on the information from those pages. The tool uses **Gemini** for question answering and has a user-friendly interface built with **React.js** (frontend) and **NestJS** (backend).

---

## **Features**

- **URL Ingestion**: Input one or more URLs to scrape and ingest their content.
- **Question Answering**: Ask questions based on the ingested content.
- **Gemini Integration**: Uses **Gemini** for accurate and context-aware question answering.
- **Minimal UI**: Clean and intuitive user interface for seamless interaction.

---

## **Tech Stack**

### **Frontend**
- **Framework**: React.js (with Vite)
- **Styling**: Tailwind CSS
- **Hosting**: Vercel

### **Backend**
- **Framework**: NestJS
- **Web Scraping**: `axios` + `cheerio`
- **Question Answering**: Gemini API
- **Hosting**: Render

---

## **Hosted Links**

- **Frontend**: [https://web-content-qa-tool.vercel.app](https://web-content-qa-tool.vercel.app)
- **Backend**: [https://web-content-qa-tool-v7ks.onrender.com](https://web-content-qa-tool-v7ks.onrender.com)

---

## **How to Run Locally**

Follow these steps to set up and run the project on your local machine.

### **Prerequisites**

- **Node.js**: Ensure you have Node.js installed (v18 or higher).
- **npm**: npm comes bundled with Node.js.
- **Gemini API Key**: Get your API key from [Google AI Studio](https://makersuite.google.com/).

---

### **Step 1: Clone the Repository**

Clone the repository to your local machine:

```bash
git clone https://github.com/your-username/web-content-qa-tool.git
cd web-content-qa-tool
```

---

### **Step 2: Set Up the Backend**

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend` directory and add your Gemini API key:
   ```env
   GEMINI_API_KEY=your-gemini-api-key
   ```

4. Start the backend server:
   ```bash
   npm run start
   ```

   The backend will run on `http://localhost:3000`.

---

### **Step 3: Set Up the Frontend**

1. Navigate to the `frontend` directory:
   ```bash
   cd ../frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `frontend` directory and add the backend URL:
   ```env
   VITE_BACKEND_API_URL=http://localhost:3000
   ```

4. Start the frontend development server:
   ```bash
   npm run dev
   ```

   The frontend will run on `http://localhost:5173`.

---

### **Step 4: Access the Application**

Open your browser and navigate to `http://localhost:5173` to use the Web Content Q&A Tool.

---

## **Project Structure**

```
web-content-qa-tool/
├── backend/                  # NestJS backend
│   ├── src/                  # Source code
│   │   ├── app.controller.ts # API endpoints
│   │   ├── app.module.ts     # Application module
│   │   ├── app.service.ts    # Business logic
│   │   ├── scraping.service.ts # Web scraping logic
│   │   └── gemini.service.ts # Gemini integration
│   ├── .env                  # Environment variables
│   ├── package.json          # Backend dependencies
│   └── tsconfig.json         # TypeScript configuration
├── frontend/                 # React.js frontend
│   ├── src/                  # Source code
│   │   ├── App.tsx           # Main application component
│   │   ├── main.tsx          # Entry point
│   │   ├── components/       # Reusable components
│   │   └── services/         # API service calls
│   ├── .env                  # Environment variables
│   ├── package.json          # Frontend dependencies
│   └── vite.config.ts        # Vite configuration
├── README.md                 # Project documentation
└── .gitignore                # Git ignore file
```

---

## **Environment Variables**

### **Backend**
- `GEMINI_API_KEY`: Your Gemini API key.

### **Frontend**
- `VITE_BACKEND_API_URL`: The URL of the backend server (e.g., `http://localhost:3000`).

---

## **How It Works**

1. **URL Ingestion**:
   - The user inputs one or more URLs.
   - The backend scrapes the content of the URLs using `axios` and `cheerio`.

2. **Question Answering**:
   - The user asks a question based on the ingested content.
   - The backend sends the question and context to the **Gemini API**.
   - Gemini generates an answer based on the provided context.

3. **Response Display**:
   - The frontend displays the answer to the user.

---

## **Dependencies**

### **Backend**
- `@google/generative-ai`: Gemini API client.
- `axios`: HTTP client for web scraping.
- `cheerio`: HTML parsing library.
- `@nestjs/config`: Environment variable management.

### **Frontend**
- `axios`: HTTP client for API calls.
- `react`: Frontend framework.
- `vite`: Build tool and development server.

---

## **Contributing**

Contributions are welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes.
4. Submit a pull request.

---

## **License**

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## **Acknowledgments**

- **Gemini**: For providing the question-answering API.
- **NestJS**: For the robust backend framework.
- **React.js**: For the intuitive frontend framework.
- **Vercel** and **Render**: For hosting the application.

---
