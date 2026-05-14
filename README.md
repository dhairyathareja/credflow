# CredFlow AI - Smart Payment Recovery System

![CredFlow Banner](https://img.shields.io/badge/Status-Active-brightgreen)
![Tech Stack](https://img.shields.io/badge/Stack-MERN-blue)
![AI Powered](https://img.shields.io/badge/AI-Gemini%20Flash-orange)

**CredFlow AI** is a professional-grade automated payment recovery platform designed to streamline the accounts receivable process. By leveraging Google Gemini AI and smart escalation logic, it automates the creation and delivery of personalized, context-aware payment reminders based on invoice maturity.

---

## 🚀 Key Features

- **🤖 AI-Driven Communication**: Automatically generates personalized reminder emails using Google's Gemini AI, ensuring professional yet effective communication.
- **📈 Dynamic Escalation Logic**: Intelligently adjusts reminder tones—from *Gentle* to *Assertive*—based on the number of days past the due date.
- **📊 Real-Time Analytics**: Interactive dashboard providing bird's-eye view of recovery statistics, success rates, and legal escalation flags.
- **📂 Bulk CSV Processing**: Upload hundreds of invoice records simultaneously for high-performance background processing.
- **📜 Detailed Audit Logs**: Complete transparency with a detailed history of every communication sent, including content previews and delivery status.
- **⚖️ Legal Escalation Safeguards**: Automatically flags critical overdue cases for manual legal review when standard recovery paths are exhausted.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 (Vite)
- **Styling**: Tailwind CSS 4 (Modern, utility-first UI)
- **State/Routing**: React Router DOM & Axios for API communication
- **Design**: Premium dark-mode interface with smooth micro-animations

### Backend
- **Runtime**: Node.js & Express
- **Database**: MongoDB via Mongoose
- **AI Integration**: Google Generative AI (@google/generative-ai)
- **File Handling**: Multer & CSV-Parser
- **Email Service**: Nodemailer

---

## 📂 Project Structure

```text
TravelCorporation/
├── frontend/             # React + Vite application
│   ├── src/              # Application logic and components
│   └── public/           # Static assets
├── backend/              # Node.js + Express API
│   ├── controllers/      # Business logic (Invoice processing, AI generation)
│   ├── models/           # MongoDB Schemas (Audit Logs)
│   ├── routes/           # API Endpoints
│   ├── services/         # Third-party integrations (Gemini Service)
│   └── utils/            # Helper functions (Emailer, Escalation logic)
└── README.md             # Project documentation
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas or local MongoDB instance
- Google Gemini API Key

### 1. Clone the repository
```bash
git clone [https://github.com/dhairyathareja/credflow.git](https://github.com/dhairyathareja/credflow.git)
cd credflow
```

### 2. Backend Setup
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and add your credentials:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   GEMINI_API_KEY=your_google_gemini_api_key
   ```
4. Start the server:
   ```bash
   npm start
   ```

### 3. Frontend Setup
1. Navigate to the frontend folder:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

---

## 📝 Usage

1. **Dashboard**: Monitor your recovery performance and recent activities.
2. **Upload**: Use the "Upload Invoices" feature to select a CSV file.
   - *CSV Format*: Ensure headers include `invoice_no`, `client_name`, `email`, and `due_date`.
3. **Processing**: The system will process records in the background, generating AI emails and sending them via the configured SMTP server.
4. **Audit Logs**: Review the generated content and status of each reminder in the Logs section.

---

## 🛡️ Security & Scalability

- **Async Processing**: Invoices are queued and processed asynchronously to ensure the UI remains responsive even during large uploads.
- **Error Handling**: Robust date parsing and CSV validation prevent system crashes on malformed data.
- **Environment Safety**: Sensitive credentials are managed via environment variables.

---

## 👨‍💻 Author

**Dhairya Thareja**  
*Professional Full Stack Developer & AWS Enthusiast*

---

> [!TIP]
> When testing, use the `test.csv` file provided in the root directory for a quick demonstration of the bulk upload and AI generation capabilities.
