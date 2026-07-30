# FixItNow API Documentation

**Project:** FixItNow –   
**Base URL (Live):** `https://fixitnow-backend-ashy.vercel.app/api/v1`  
**Base URL (Local):** `http://localhost:5000/api/v1`  
**Version:** 1.0.0  
**Authentication:** Bearer JWT Token  

---

## Table of Contents

1. [Overview](#overview)
2. [Authentication](#authentication)
3. [Roles & Permissions](#roles--permissions)
4. [Response Format](#response-format)
5. [Error Format](#error-format)
6. [API Endpoints](#api-endpoints)
   - [Auth](#1-auth-endpoints)
   - [Users](#2-user-endpoints)
   - [Technicians](#3-technician-endpoints)
   - [Services](#4-service-endpoints)
   - [Bookings](#5-booking-endpoints)
   - [Payments (Stripe)](#6-payment-endpoints-stripe)
   - [Reviews](#7-review-endpoints)
   - [Dashboard (Admin)](#8-dashboard-endpoints-admin)
7. [Booking Status Flow](#booking-status-flow)
8. [Admin Credentials](#admin-credentials)
9. [Test Accounts](#test-accounts)

---
---

## Test Accounts

| Role       | Email                     | Password        |
|------------|---------------------------|-----------------|
| Admin      | admin@fixitnow.com       | admin123        |
| Customer   | customer@example.com      | customer123     |
| Technician | technician@example.com    | technician123   |

---
## Overview

FixItNow is a home services marketplace backend API where:

- **Customers** can browse services, book technicians, make payments via Stripe, and leave reviews.
- **Technicians** can manage profiles, accept/reject bookings, and mark jobs as ongoing/completed.
- **Admins** can manage users, services, and view platform statistics.

**Tech Stack:** Node.js, Express, TypeScript, Prisma, PostgreSQL, JWT, Stripe, Zod

---

## Authentication

Most endpoints require a JWT Access Token.

**How to use:**

1. Login via `POST /auth/login`
2. Copy `accessToken` from response
3. In Postman / client:
   - Authorization → Type: **Bearer Token**
   - Token: paste the `accessToken`

---

## Roles & Permissions

| Role         | Key Permissions                                                                 |
|--------------|----------------------------------------------------------------------------------|
| **CUSTOMER** | Register/Login, Book services, Make payment, Leave review, Manage own profile   |
| **TECHNICIAN** | Manage profile, Accept/Reject bookings, Mark Ongoing/Completed                |
| **ADMIN**    | Manage users (ban/unban), Manage services, View all bookings, Dashboard stats   |

---

## Response Format

**Success Response:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Operation successful",
  "data": { }
}
```

**Error Response:**

```json
{
  "success": false,
  "message": "Error message here"
}
```

---

## Error Format

| Status Code | Meaning                |
|-------------|------------------------|
| 200         | Success                |
| 201         | Created                |
| 400         | Bad Request / Validation Error |
| 401         | Unauthorized (No/Invalid Token) |
| 403         | Forbidden (Wrong Role) |
| 404         | Not Found              |
| 500         | Internal Server Error  |

---

## API Endpoints

### 1. Auth Endpoints

#### 1.1 Register User
- **Method:** `POST`
- **URL:** `/auth/register`
- **Auth Required:** No
- **Body:**

```json
{
  "name": "John Customer",
  "email": "john@example.com",
  "password": "password123",
  "phone": "01700000000",
  "role": "CUSTOMER"
}
```

> `role` can be `CUSTOMER` or `TECHNICIAN`

---

#### 1.2 Login
- **Method:** `POST`
- **URL:** `/auth/login`
- **Auth Required:** No
- **Body:**

```json
{
  "email": "admin@fixitnow.com",
  "password": "admin123"
}
```

**Success Response:**

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "...",
      "name": "Super Admin",
      "email": "admin@fixitnow.com",
      "role": "ADMIN"
    }
  }
}
```

---

#### 1.3 Get Current User (Me)
- **Method:** `GET`
- **URL:** `/auth/me`
- **Auth Required:** Yes (Any Role)

---

#### 1.4 Logout
- **Method:** `POST`
- **URL:** `/auth/logout`
- **Auth Required:** Yes (Any Role)

---

### 2. User Endpoints

#### 2.1 Get My Profile
- **Method:** `GET`
- **URL:** `/users/me`
- **Auth Required:** Yes

---

#### 2.2 Update Profile
- **Method:** `PATCH`
- **URL:** `/users/update-profile`
- **Auth Required:** Yes
- **Body:**

```json
{
  "name": "Updated Name",
  "phone": "01811111111",
  "address": "Dhaka, Bangladesh"
}
```

---

#### 2.3 Change Password
- **Method:** `PATCH`
- **URL:** `/users/change-password`
- **Auth Required:** Yes
- **Body:**

```json
{
  "oldPassword": "customer123",
  "newPassword": "newpassword123"
}
```

---

#### 2.4 Get All Users (Admin)
- **Method:** `GET`
- **URL:** `/users`
- **Auth Required:** Yes (**ADMIN**)

---

#### 2.5 Ban / Unban User (Admin)
- **Method:** `PATCH`
- **URL:** `/users/:id/status`
- **Auth Required:** Yes (**ADMIN**)
- **Body:**

```json
{
  "isActive": false
}
```

---

### 3. Technician Endpoints

#### 3.1 Get All Technicians (Public)
- **Method:** `GET`
- **URL:** `/technicians`
- **Auth Required:** No

---

#### 3.2 Get Single Technician (Public)
- **Method:** `GET`
- **URL:** `/technicians/:id`
- **Auth Required:** No

---

#### 3.3 Get My Technician Profile
- **Method:** `GET`
- **URL:** `/technicians/profile/me`
- **Auth Required:** Yes (**TECHNICIAN**)

---

#### 3.4 Update Technician Profile
- **Method:** `PATCH`
- **URL:** `/technicians/profile/me`
- **Auth Required:** Yes (**TECHNICIAN**)
- **Body:**

```json
{
  "skills": ["Plumbing", "Electrical", "AC Repair"],
  "experience": 5,
  "hourlyRate": 600,
  "bio": "Experienced home service technician",
  "availability": true
}
```

---

#### 3.5 Get Pending Technicians (Admin)
- **Method:** `GET`
- **URL:** `/technicians/admin/pending`
- **Auth Required:** Yes (**ADMIN**)

---

#### 3.6 Approve / Reject Technician (Admin)
- **Method:** `PATCH`
- **URL:** `/technicians/admin/:id/status`
- **Auth Required:** Yes (**ADMIN**)
- **Body:**

```json
{
  "status": "APPROVED"
}
```

> Status: `APPROVED` or `REJECTED`

---

### 4. Service Endpoints

#### 4.1 Get All Services (Public)
- **Method:** `GET`
- **URL:** `/services`
- **Auth Required:** No

---

#### 4.2 Get Single Service (Public)
- **Method:** `GET`
- **URL:** `/services/:id`
- **Auth Required:** No

---

#### 4.3 Get Service Categories (Public)
- **Method:** `GET`
- **URL:** `/services/categories`
- **Auth Required:** No

---

#### 4.4 Create Service (Admin)
- **Method:** `POST`
- **URL:** `/services`
- **Auth Required:** Yes (**ADMIN**)
- **Body:**

```json
{
  "title": "Pest Control Service",
  "description": "Professional pest control for home and office",
  "category": "Cleaning",
  "price": 1500
}
```

---

#### 4.5 Update Service (Admin)
- **Method:** `PATCH`
- **URL:** `/services/:id`
- **Auth Required:** Yes (**ADMIN**)

---

#### 4.6 Delete Service (Admin)
- **Method:** `DELETE`
- **URL:** `/services/:id`
- **Auth Required:** Yes (**ADMIN**)

---

### 5. Booking Endpoints

#### 5.1 Create Booking (Customer)
- **Method:** `POST`
- **URL:** `/bookings`
- **Auth Required:** Yes (**CUSTOMER**)
- **Body:**

```json
{
  "technicianId": "TECHNICIAN_ID_HERE",
  "serviceId": "SERVICE_ID_HERE",
  "bookingDate": "2026-08-05T10:00:00.000Z",
  "address": "Mirpur-10, Dhaka",
  "note": "Please come on time"
}
```

---

#### 5.2 Get My Bookings
- **Method:** `GET`
- **URL:** `/bookings/my-bookings`
- **Auth Required:** Yes (Customer / Technician)

---

#### 5.3 Get Single Booking
- **Method:** `GET`
- **URL:** `/bookings/:id`
- **Auth Required:** Yes

---

#### 5.4 Update Booking Status
- **Method:** `PATCH`
- **URL:** `/bookings/:id/status`
- **Auth Required:** Yes (Technician / Customer)
- **Body:**

```json
{
  "status": "ACCEPTED"
}
```

**Allowed Transitions:**

| From Status | Allowed Next Status      | Who Can Change      |
|-------------|--------------------------|---------------------|
| PENDING     | ACCEPTED, REJECTED, CANCELLED | Technician / Customer |
| ACCEPTED    | ONGOING, CANCELLED       | Technician / Customer |
| ONGOING     | COMPLETED                | Technician          |
| COMPLETED   | —                        | —                   |

> Customer can only **CANCEL** (before ONGOING)

---

#### 5.5 Get All Bookings (Admin)
- **Method:** `GET`
- **URL:** `/bookings`
- **Auth Required:** Yes (**ADMIN**)

---

### 6. Payment Endpoints (Stripe)

#### 6.1 Create Payment Intent
- **Method:** `POST`
- **URL:** `/payments/create`
- **Auth Required:** Yes (**CUSTOMER**)
- **Body:**

```json
{
  "bookingId": "BOOKING_ID_HERE"
}
```

**Success Response:**

```json
{
  "success": true,
  "message": "Payment intent created successfully",
  "data": {
    "clientSecret": "pi_xxx_secret_xxx",
    "paymentIntentId": "pi_xxx",
    "paymentId": "uuid",
    "amount": 2000,
    "currency": "usd"
  }
}
```

> Note: Booking must be in **ACCEPTED** status before creating payment.

---

#### 6.2 Confirm Payment
- **Method:** `POST`
- **URL:** `/payments/confirm`
- **Auth Required:** Yes (**CUSTOMER**)
- **Body:**

```json
{
  "paymentIntentId": "pi_xxx"
}
```

---

#### 6.3 Get My Payments
- **Method:** `GET`
- **URL:** `/payments`
- **Auth Required:** Yes (**CUSTOMER**)

---

#### 6.4 Get Single Payment
- **Method:** `GET`
- **URL:** `/payments/:id`
- **Auth Required:** Yes (**CUSTOMER**)

---

### 7. Review Endpoints

#### 7.1 Create Review (Customer)
- **Method:** `POST`
- **URL:** `/reviews`
- **Auth Required:** Yes (**CUSTOMER**)
- **Body:**

```json
{
  "bookingId": "BOOKING_ID_HERE",
  "rating": 5,
  "comment": "Excellent service! Very professional."
}
```

> Rating: 1 to 5  
> Booking must be **COMPLETED**

---

#### 7.2 Get My Reviews
- **Method:** `GET`
- **URL:** `/reviews/my-reviews`
- **Auth Required:** Yes (**CUSTOMER**)

---

#### 7.3 Get Technician Reviews (Public)
- **Method:** `GET`
- **URL:** `/reviews/technician/:technicianId`
- **Auth Required:** No

---

### 8. Dashboard Endpoints (Admin)

#### 8.1 Get Admin Stats
- **Method:** `GET`
- **URL:** `/dashboard/stats`
- **Auth Required:** Yes (**ADMIN**)

**Example Response:**

```json
{
  "success": true,
  "message": "Admin dashboard stats retrieved successfully",
  "data": {
    "totalUsers": 3,
    "totalCustomers": 1,
    "totalTechnicians": 1,
    "totalServices": 5,
    "totalBookings": 4,
    "pendingBookings": 2,
    "completedBookings": 1,
    "totalPayments": 1,
    "totalRevenue": 2000,
    "pendingTechnicians": 0
  }
}
```

---

#### 8.2 Get Recent Bookings
- **Method:** `GET`
- **URL:** `/dashboard/recent-bookings`
- **Auth Required:** Yes (**ADMIN**)

---

#### 8.3 Get Recent Users
- **Method:** `GET`
- **URL:** `/dashboard/recent-users`
- **Auth Required:** Yes (**ADMIN**)

---

## Booking Status Flow

```
PENDING
   ├── ACCEPTED (by Technician)
   │      ├── ONGOING (by Technician)
   │      │      └── COMPLETED (by Technician)
   │      └── CANCELLED (by Customer)
   ├── REJECTED (by Technician)
   └── CANCELLED (by Customer)
```

**Full Happy Path:**

1. Customer creates Booking → `PENDING`
2. Technician accepts → `ACCEPTED`
3. Customer creates & confirms Payment (Stripe)
4. Technician marks → `ONGOING`
5. Technician marks → `COMPLETED`
6. Customer leaves Review

---

## Admin Credentials

| Field    | Value                  |
|----------|------------------------|
| Email    | `admin@fixitnow.com`  |
| Password | `admin123`             |

---

## Test Accounts

| Role       | Email                     | Password        |
|------------|---------------------------|-----------------|
| Admin      | admin@fixitnow.com       | admin123        |
| Customer   | customer@example.com      | customer123     |
| Technician | technician@example.com    | technician123   |

---

## Health Check

- **Method:** `GET`
- **URL:** `/` or base `/api/v1`
- **Auth Required:** No

```json
{
  "success": true,
  "message": "FixItNow API v1 Running Successfully"
}
```

---

## Notes for Testers / Evaluators

1. All protected routes require valid JWT Bearer Token.
2. Role-based access is strictly enforced (403 Forbidden on wrong role).
3. Stripe PaymentIntent is created for accepted bookings.
4. Payment confirmation updates payment status to `PAID`.
5. Reviews can only be submitted after booking is `COMPLETED`.
6. Input validation is applied using Zod on request bodies.
7. Consistent error response format is used across all endpoints.

---

**Live API:** https://fixitnow-backend-ashy.vercel.app/api/v1  
**Documentation Version:** 1.0.0  
**Last Updated:** July 2026
