# 💰 FinanceAI — AI-Powered Personal Finance & Expense Intelligence SaaS

![License](https://img.shields.io/badge/license-MIT-green)
![Django](https://img.shields.io/badge/Django-6.0.5-green)
![React](https://img.shields.io/badge/React-18.x-blue)
![AI](https://img.shields.io/badge/AI-Groq%20Llama%203-purple)
![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-blue)
![Status](https://img.shields.io/badge/Status-Active-brightgreen)

---

## 📌 Overview

**FinanceAI** is an AI-Powered Personal Finance & Expense Intelligence SaaS application built with Django, React, and Groq AI (Llama 3). It helps users track expenses, analyze spending patterns, set budgets, achieve saving goals, and get smart AI-powered financial advice — all in one platform.

> **Developed by:** Agha Wafa Abbas — AI-Powered Full Stack Cloud SaaS Developer

---

## 👤 Author

**Agha Wafa Abbas**
*AI-Powered Full Stack Cloud SaaS Developer*

📧 [agha.wafa@port.ac.uk](mailto:agha.wafa@port.ac.uk) | [awabbas@arden.ac.uk](mailto:awabbas@arden.ac.uk) | [wafa.abbas.lhr@rootsivy.edu.pk](mailto:wafa.abbas.lhr@rootsivy.edu.pk)

🎓 University of Portsmouth, UK · Arden University, UK · Pearson, UK · IVY College of Management Sciences, Lahore, Pakistan

---

## 🎯 Purpose & Problem Statement

### ❌ Problem:
People struggle with:
- Not knowing where their money goes
- Overspending without realizing it
- No clear saving plan
- Financial stress and poor money management

### ✅ Solution:
FinanceAI provides:
- Smart expense tracking with AI analysis
- Budget planning with smart alerts
- Saving goals with progress tracking
- Personalized AI chat assistant for financial advice

---

## 👥 Target Users (Actors)

| Actor | Description |
|-------|-------------|
| 👨‍🎓 Students | Track pocket money, rent, food expenses |
| 💼 Freelancers | Manage irregular income and expenses |
| 👨‍💼 Employees | Monthly salary planning and budgeting |
| 🌍 Immigrants | Manage expenses in new countries |
| 🏢 Small Business Owners | Track daily expenses and profit/loss |

---

## 🚀 Key Features

| Feature | Description |
|---------|-------------|
| 🔐 JWT Authentication | Secure login/register system |
| 💰 Balance Tracker | Income vs expenses with progress bar & smart alerts |
| 🤖 AI Financial Analysis | Groq AI (Llama 3) analyzes spending patterns |
| 💬 AI Chat Assistant | Interactive AI financial advisor |
| 📊 Expense Charts | Pie chart & bar chart visualization |
| 📈 Monthly Comparison | Monthly spending trends & line chart |
| 📅 Budget Planner | Set and track monthly budgets |
| 🎯 Saving Goals | Set goals with progress tracking |
| 🏷️ Categories | Organize expenses by category |
| 🔍 Search & Filter | Filter by date, period, category |
| 📄 Export PDF | Download expense reports as PDF |
| 📧 Email Report | Send expense report to email |
| 👤 Profile Management | Avatar upload & profile editing |
| 🌙 Dark/Light Mode | Toggle between themes |
| 🌍 Multi-currency | PKR, CAD, USD, GBP, EUR, AED, SAR, AUD |
| 📱 PWA Ready | Installable as mobile app |

---

## 🛠️ Technology Stack

### Frontend:
| Technology | Purpose |
|-----------|---------|
| React 18 | UI Framework |
| Tailwind CSS 3 | Styling |
| Recharts | Data Visualization |
| Axios | API Communication |
| jsPDF | PDF Generation |
| Context API | State Management |

### Backend:
| Technology | Purpose |
|-----------|---------|
| Django 6.0.5 | Web Framework |
| Django REST Framework | API Development |
| SimpleJWT | JWT Authentication |
| PostgreSQL 17 | Database |
| Groq AI (Llama 3.3) | AI Analysis & Chat |
| Python Dotenv | Environment Variables |
| Pillow | Image Processing |
| Django CORS Headers | Cross-Origin Requests |

---

## 🏗️ System Design & Architecture

```
┌─────────────────────────────────────────────────┐
│                   CLIENT LAYER                   │
│         React + Tailwind CSS (Frontend)          │
│                                                  │
│  Login | Dashboard | Profile | Charts | Chat    │
└──────────────────────┬──────────────────────────┘
                       │ HTTP/REST API
                       │ JWT Token Auth
┌──────────────────────▼──────────────────────────┐
│                   API LAYER                      │
│         Django REST Framework (Backend)          │
│                                                  │
│  ┌─────────┐  ┌──────────┐  ┌───────────────┐  │
│  │  Users  │  │ Expenses │  │  AI Services  │  │
│  │   API   │  │   API    │  │  Groq/Llama3  │  │
│  └─────────┘  └──────────┘  └───────────────┘  │
│                                                  │
│         Gmail SMTP (Email Reports)              │
└──────────────────────┬──────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────┐
│                 DATABASE LAYER                   │
│              PostgreSQL Database                 │
│                                                  │
│  Users | UserProfile | Expenses | Categories   │
│              Budgets | Media Files              │
└─────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
finance-saas/
├── backend/
│   ├── core/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── users/
│   │   ├── models.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   └── ai_service.py
│   ├── expenses/
│   │   ├── models.py
│   │   ├── views.py
│   │   ├── serializers.py
│   │   └── urls.py
│   ├── .gitignore
│   └── manage.py
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AIChat.js
│   │   │   ├── Categories.js
│   │   │   ├── ExpenseChart.js
│   │   │   ├── MonthlyChart.js
│   │   │   ├── SavingGoals.js
│   │   │   ├── SearchFilter.js
│   │   │   ├── Footer.js
│   │   │   └── Loader.js
│   │   ├── pages/
│   │   │   ├── Dashboard.js
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Profile.js
│   │   │   └── Budget.js
│   │   ├── context/
│   │   │   ├── AuthContext.js
│   │   │   └── ThemeContext.js
│   │   └── services/
│   │       └── api.js
│   ├── public/
│   │   ├── manifest.json
│   │   └── sw.js
│   └── package.json
├── Screenshots/
├── LICENSE
└── README.md
```

---

## ⚙️ Installation & Setup

### Prerequisites:
```
- Python 3.12+
- Node.js 18+
- PostgreSQL 17+
- Git
```

### 1. Clone Repository:
```bash
git clone https://github.com/Aghawafaabbass/finance-saas.git
cd finance-saas
```

### 2. Backend Setup:
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install django djangorestframework djangorestframework-simplejwt
pip install psycopg2-binary python-dotenv groq Pillow django-cors-headers
```

### 3. Create `.env` file in backend folder:
```
GROQ_API_KEY=your_groq_api_key_here
EMAIL_HOST_USER=your_gmail@gmail.com
EMAIL_HOST_PASSWORD=your_16_digit_app_password
```

### 4. Database Setup:
```bash
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

### 5. Frontend Setup:
```bash
cd ../frontend
npm install
npm start
```

---

## 🔌 API Endpoints

### Authentication:
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/users/register/` | Register new user |
| POST | `/api/users/login/` | Login & get JWT token |
| POST | `/api/users/token/refresh/` | Refresh JWT token |

### User Management:
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users/profile/` | Get user profile |
| PUT | `/api/users/update-profile/` | Update profile |
| POST | `/api/users/upload-avatar/` | Upload profile picture |
| GET/POST | `/api/users/income/` | Get/Set monthly income |

### Expenses:
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET/POST | `/api/expenses/expenses/` | List/Create expenses |
| PUT/DELETE | `/api/expenses/expenses/{id}/` | Update/Delete expense |
| GET/POST | `/api/expenses/categories/` | List/Create categories |
| GET/POST | `/api/expenses/budgets/` | List/Create budgets |

### AI Services:
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users/ai-analysis/` | AI expense analysis |
| POST | `/api/users/ai-chat/` | AI chat assistant |
| POST | `/api/users/send-report/` | Send email report |

---

## 📸 Screenshots

### 1. 📝 Register Page
![Register](Screenshots/Register.PNG)

### 2. 🔐 Login Page
![Login](Screenshots/Login.PNG)

### 3. ⏳ Loader Screen
![Loader](Screenshots/Loader.PNG)

### 4. 🌙 Dark Mode Dashboard
![Dark Mode](Screenshots/Dark%20Mode.PNG)

### 5. ☀️ Light Mode Dashboard
![Light Mode](Screenshots/Light%20Mode.PNG)

### 6. 💰 Income Set
![Income Set](Screenshots/Income%20Set.PNG)

### 7. 💰 Income Updated
![Income Updated](Screenshots/Income%20Set%20Update.PNG)

### 8. 🧾 Rent Expense Adding
![Rent Expense](Screenshots/Rent%20Expense%201.PNG)

### 9. ✅ Rent Expense Saved
![Rent Saved](Screenshots/Rent%20Expense%201%20Saved.PNG)

### 10. 🍔 Food Expense Adding
![Food Expense](Screenshots/Expense%202%20Food.PNG)

### 11. ✅ Food Expense Saved
![Food Saved](Screenshots/Expense%202%20Food%20Saved.PNG)

### 12. 🚗 Transport Expense Adding
![Transport Expense](Screenshots/Transport%20Expense%203.PNG)

### 13. ✅ Transport Expense Saved
![Transport Saved](Screenshots/Transport%20Expense%203%20Saved.PNG)

### 14. 🎬 Entertainment Expense Adding
![Entertainment Expense](Screenshots/Expense%204%20Entertainment.PNG)

### 15. ✅ Entertainment Expense Saved
![Entertainment Saved](Screenshots/Expense%204%20Entertainment%20Saved.PNG)

### 16. 📊 Dashboard Balance Tracker
![Balance Tracker](Screenshots/Dashbaord%20Balance%20Tracker.PNG)

### 17. 🤖 AI Analysis
![AI Analysis](Screenshots/Al%20Analysis.PNG)

### 18. 📈 AI Analysis Results
![AI Results](Screenshots/AI%20Analysis%20Results.PNG)

### 19. 💬 AI Chat Assistant
![AI Chat](Screenshots/AI%20Chat%20Assistant.PNG)

### 20. 💬 AI Chat 2
![AI Chat 2](Screenshots/AI%20Chat%20Assistant%202.PNG)

### 21. 💬 AI Chat 3
![AI Chat 3](Screenshots/AI%20Chat%20Assistant%203.PNG)

### 22. 💬 AI Chat 4
![AI Chat 4](Screenshots/AI%20Chat%20Assistant%204.PNG)

### 23. 📊 Charts 1
![Charts 1](Screenshots/Charts%201.PNG)

### 24. 📊 Charts 2
![Charts 2](Screenshots/Charts%202.PNG)

### 25. 🍔 Food Category Adding
![Food Category](Screenshots/Food%20Category%20going%20to%20add.PNG)

### 26. ✅ Food Category Saved
![Food Category Saved](Screenshots/Food%20Category%20Saved.PNG)

### 27. 🚗 Transport Category Adding
![Transport Category](Screenshots/Transport%20Category%20is%20going%20to%20be%20add.PNG)

### 28. ✅ Transport Category Added
![Transport Category Added](Screenshots/Transport%20Category%20Added.PNG)

### 29. 🏠 Rent Category Adding
![Rent Category](Screenshots/Rent%20Category%20is%20going%20to%20be%20add.PNG)

### 30. ✅ Rent Category Added
![Rent Category Added](Screenshots/Rent%20Catgory%20Added.PNG)

### 31. 🎬 Entertainment Category Adding
![Entertainment Category](Screenshots/Entertainment%20Category%20is%20going%20to%20be%20add.PNG)

### 32. ✅ Entertainment Category Added
![Entertainment Category Added](Screenshots/Entertainment%20Category%20added.PNG)

### 33. 📅 Budget Planner Adding
![Budget Adding](Screenshots/Budget%20Planner%20is%20going%20to%20be%20add.PNG)

### 34. ✅ Budget Saved
![Budget Saved](Screenshots/Budget%20Saved.PNG)

### 35. 🎯 Saving Goals Adding
![Goals Adding](Screenshots/Saving%20Goals%20are%20adding.PNG)

### 36. 🎯 Saving Goals Adding 2
![Goals Adding 2](Screenshots/Saving%20Goals%20are%20adding%202.PNG)

### 37. ✅ Saving Goals Added
![Goals Added](Screenshots/Saving%20Goals%20Added.PNG)

### 38. ✅ Saving Goals Added 2
![Goals Added 2](Screenshots/Saving%20Goals%20added%202.PNG)

### 39. ✅ Saving Goals Added 3
![Goals Added 3](Screenshots/Saving%20Goals%20added%203.PNG)

### 40. 📱 New Phone Goal
![New Phone Goal](Screenshots/New%20Phone%20Saving%20Goals%20are%20adding.PNG)

### 41. 🔍 Search Rent Filter
![Search Rent](Screenshots/Search%20Rent.PNG)

### 42. 🔍 Clearing Filter
![Clear Filter](Screenshots/Clearing%20Rent%20apply%20filter.PNG)

### 43. 📄 Exporting PDF
![Export PDF](Screenshots/Exporting%20PDF.PNG)

### 44. 📄 PDF Report
![PDF Report](Screenshots/PDF%20report%20Finally.PNG)

### 45. 📧 Email Sending
![Email Sending](Screenshots/Email%20Sending.PNG)

### 46. 📧 Email Received
![Email Received](Screenshots/Email%20recieved.PNG)

### 47. 👤 Profile Modal
![Profile](Screenshots/Profile%20Modal.PNG)

### 48. 🖼️ Profile Picture Changed
![Profile Picture](Screenshots/Profile%20Picture%20Changed.PNG)

### 49. ✏️ Editing Profile
![Edit Profile](Screenshots/Editing%20Profile.PNG)

### 50. ✅ Profile Updated
![Profile Updated](Screenshots/Profile%20Updated.PNG)

### 51. ✏️ Editing Expenses
![Edit Expenses](Screenshots/Editing%20Expenses.PNG)

### 52. ✅ Expenses Updated
![Expenses Updated](Screenshots/Expenses%20Udpated.PNG)

### 53. 🗑️ Delete Expenses
![Delete Expenses](Screenshots/Delete%20Expenses%20Rent.PNG)

### 54. 🔧 Django Administration
![Django Admin](Screenshots/Django%20Administration.PNG)

---

## 🔒 Security Features

- ✅ JWT Authentication with auto token refresh
- ✅ Password hashing (Django built-in)
- ✅ Environment variables for all secrets
- ✅ CORS protection
- ✅ User data isolation
- ✅ Secure file uploads with Pillow
- ✅ GitHub push protection

---

## ⚠️ Disclaimer

This project is developed for **educational and portfolio purposes** by **Agha Wafa Abbas** as part of academic and professional development:

The AI financial advice provided by this application is **for informational purposes only** and should **not** be considered as professional financial advice. Users should consult qualified financial advisors for important financial decisions.

The developer is **not responsible** for any financial decisions made based on the AI recommendations provided by this application.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgements

- [Groq AI](https://groq.com) — Blazing fast Llama 3 API
- [Django](https://djangoproject.com) — Robust backend framework
- [React](https://reactjs.org) — Powerful frontend library
- [Tailwind CSS](https://tailwindcss.com) — Utility-first CSS framework
- [Recharts](https://recharts.org) — Beautiful data visualizations
- [PostgreSQL](https://postgresql.org) — Reliable database

---

<div align="center">

### 💰 FinanceAI

**Made with ❤️ by Agha Wafa Abbas**

*AI-Powered Full Stack Cloud SaaS Developer*

*University of Portsmouth, UK · Arden University, UK · Pearson, UK · IVY College of Management Sciences, Lahore, Pakistan*

</div>
