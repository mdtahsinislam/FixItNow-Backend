# FixItNow 🔧
**Your Trusted Home Service Platform**

A complete Backend API for a home services marketplace built with Node.js, Express, TypeScript, Prisma, PostgreSQL, JWT, and Stripe.

---

## 🔗 Live Links

| Item              | Link |
|-------------------|------|
| **Live API**      | https://fixitnow-backend-ashy.vercel.app |
| **API Base URL**  | https://fixitnow-backend-ashy.vercel.app/api/v1 |
| **API Docs**      | See `API_DOCUMENTATION.md` / Postman Collection |
| **GitHub Repo**   | https://github.com/YOUR_USERNAME/fixitnow-backend |

---

## 👨‍💼 Admin Credentials

| Field    | Value                 |
|----------|-----------------------|
| Email    | `admin@fixitnow.com` |
| Password | `admin123`            |

---

## 👥 Test Accounts

| Role       | Email                     | Password        |
|------------|---------------------------|-----------------|
| Admin      | admin@fixitnow.com       | admin123        |
| Customer   | customer@example.com      | customer123     |
| Technician | technician@example.com    | technician123   |

---

## ✨ Features

### Public
- Browse all services and technicians
- View technician profiles and reviews
- Filter services by category

### Customer
- Register / Login
- Book technicians for services
- Make payments via **Stripe**
- Track booking status
- Leave reviews after job completion
- Manage profile

### Technician
- Register / Login & create profile
- Set skills, experience, hourly rate
- Accept / Reject bookings
- Mark jobs as Ongoing / Completed

### Admin
- View all users, bookings, services
- Ban / Unban users
- Approve / Reject technicians
- Create / Update / Delete services
- Dashboard statistics (users, revenue, bookings)

---

## 🛠️ Tech Stack

| Technology       | Purpose                  |
|------------------|--------------------------|
| Node.js + Express| REST API                 |
| TypeScript       | Type safety              |
| PostgreSQL       | Database                 |
| Prisma           | ORM                      |
| JWT              | Authentication           |
| Stripe           | Payment Integration      |
| Zod              | Input Validation         |
| Vercel           | Deployment               |

---

## 📦 Installation (Local)

```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/fixitnow-backend.git
cd fixitnow-backend

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your DATABASE_URL, JWT secrets, STRIPE_SECRET_KEY

# Generate Prisma Client & Run migrations
npx prisma generate
npx prisma migrate dev

# Seed database
npm run seed

# Start development server
npm run dev
```

Server runs at: `http://localhost:5000`

---

## 🔐 Environment Variables

```env
NODE_ENV=development
PORT=5000

DATABASE_URL="your_postgresql_connection_string"

JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
JWT_ACCESS_EXPIRES_IN=7d
JWT_REFRESH_EXPIRES_IN=30d

STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
```

---

## 📁 Project Structure

```
src/
├── app.ts
├── server.ts
├── config/
├── middlewares/
├── modules/
│   ├── auth/
│   ├── user/
│   ├── technician/
│   ├── service/
│   ├── booking/
│   ├── payment/
│   ├── review/
│   └── dashboard/
├── routes/
├── utils/
└── interfaces/
prisma/
├── schema.prisma
└── seed.ts
```

---

## 🔄 Booking Status Flow

```
PENDING → ACCEPTED → ONGOING → COMPLETED
         ↘ REJECTED
         ↘ CANCELLED (Customer can cancel before ONGOING)
```

**Happy Path:**
1. Customer creates booking
2. Technician accepts booking
3. Customer pays via Stripe
4. Technician marks Ongoing → Completed
5. Customer leaves review

---

## 💳 Payment Integration (Stripe)

- `POST /payments/create` → Creates Stripe PaymentIntent
- `POST /payments/confirm` → Confirms payment & updates status to PAID
- Payment history available via `GET /payments`

Simulated / fake payments are **not** used. Real Stripe test keys are integrated.

---

## 🧪 API Testing

Use the provided **Postman Collection** or follow `API_DOCUMENTATION.md`.

**Quick Health Check:**
```
GET https://fixitnow-backend-ashy.vercel.app/api/v1
```

---

## 📜 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run seed         # Seed database
npx prisma studio    # Open Prisma Studio
npx prisma generate  # Generate Prisma Client
```

---

## ✅ Assignment Requirements Checklist

| # | Requirement                        | Status |
|---|------------------------------------|--------|
| 1 | API Documentation (Postman/Docs)   | ✅     |
| 2 | Consistent Error Responses         | ✅     |
| 3 | 20+ Meaningful Commits             | ✅     |
| 4 | Input Validation (Zod)             | ✅     |
| 5 | Admin Credentials                  | ✅     |
| 6 | Stripe Payment Integration         | ✅     |
| 7 | Live API URL                       | ✅     |
| 8 | Role-based Access Control          | ✅     |
| 9 | Demo Video                         | ✅     |



---

## 📄 License

This project is for educational purposes (Programming Hero Assignment).
