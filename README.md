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
| 🌍 Immigrants | Manage expenses in new countries (Canada focus) |
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
| ⏳ Loader Screen | Professional loading animation |

---

## 🛠️ Technology Stack

### Frontend:
| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 18.x | UI Framework |
| Tailwind CSS | 3.x | Styling |
| Recharts | Latest | Data Visualization |
| Axios | Latest | API Communication |
| jsPDF | Latest | PDF Generation |
| Context API | Built-in | State Management |

### Backend:
| Technology | Version | Purpose |
|-----------|---------|---------|
| Django | 6.0.5 | Web Framework |
| Django REST Framework | 3.17 | API Development |
| SimpleJWT | Latest | JWT Authentication |
| PostgreSQL | 17 | Database |
| Groq AI (Llama 3.3) | Latest | AI Analysis & Chat |
| Python Dotenv | Latest | Environment Variables |
| Pillow | Latest | Image Processing |
| Django CORS Headers | Latest | Cross-Origin Requests |

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

### 1. Register Page
![Register](Screenshots/1_register.png)

### 2. Login Page
![Login](Screenshots/2_login.png)

### 3. Loader Screen
![Loader](Screenshots/3_loader.png)

### 4. Dashboard
![Dashboard](Screenshots/4_dashboard.png)

### 5. Balance Tracker
![Balance](Screenshots/5_balance_tracker.png)

### 6. Add Expense
![Add Expense](Screenshots/6_add_expense.png)

### 7. AI Analysis
![AI Analysis](Screenshots/7_ai_analysis.png)

### 8. AI Chat
![AI Chat](Screenshots/8_ai_chat.png)

### 9. Expense Charts
![Charts](Screenshots/9_charts.png)

### 10. Monthly Chart
![Monthly](Screenshots/10_monthly_chart.png)

### 11. Categories
![Categories](Screenshots/11_categories.png)

### 12. Budget Planner
![Budget](Screenshots/12_budget_planner.png)

### 13. Saving Goals
![Goals](Screenshots/13_saving_goals.png)

### 14. Search & Filter
![Search](Screenshots/14_search_filter.png)

### 15. Export PDF
![PDF](Screenshots/15_export_pdf.png)

### 16. Email Report
![Email](Screenshots/16_email_report.png)

### 17. Profile
![Profile](Screenshots/17_profile.png)

### 18. Dark Mode
![Dark](Screenshots/18_dark_mode.png)

### 19. Light Mode
![Light](Screenshots/19_light_mode.png)

---

## 🔒 Security Features

- ✅ JWT Authentication with auto token refresh
- ✅ Password hashing (Django built-in)
- ✅ Environment variables for all secrets
- ✅ CORS protection
- ✅ User data isolation (each user sees only their data)
- ✅ Secure file uploads with Pillow
- ✅ GitHub push protection

---

## ⚠️ Disclaimer

This project is developed for **educational and portfolio purposes** by **Agha Wafa Abbas** as part of academic and professional development at:
- University of Portsmouth, UK
- Arden University, UK
- Pearson, UK
- IVY College of Management Sciences, Lahore, Pakistan

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
