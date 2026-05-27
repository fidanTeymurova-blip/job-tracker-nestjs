# 🗂️ Job Tracker API

Smart Job Application Tracker — built with NestJS, PostgreSQL, and JWT Authentication.

> Refactored from ASP.NET Core to NestJS as part of my backend development journey.

## Tech Stack

- **Framework:** NestJS + TypeScript
- **Database:** PostgreSQL + Prisma ORM
- **Auth:** JWT (JSON Web Token)
- **Docs:** Swagger UI
- **DevOps:** Docker Compose

## Features

- User registration & login with JWT
- Track job applications with status (Applied → Interview → Offer / Rejected)
- Company management
- Interview scheduling
- Application statistics by status
- Fully documented REST API via Swagger

## Getting Started

### Requirements
- Node.js 18+
- Docker

### Run Locally

```bash
# 1. Clone the repo
git clone https://github.com/fidanTeymurova-blip/job-tracker-nestjs

# 2. Install dependencies
npm install

# 3. Copy env file and fill in your values
cp .env.example .env

# 4. Start PostgreSQL
docker-compose up -d

# 5. Run migrations
npx prisma migrate dev

# 6. Start the server
npm run start:dev
```

API will be available at: `http://localhost:3000`  
Swagger UI: `http://localhost:3000/api`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /auth/register | Register new user |
| POST | /auth/login | Login & get token |
| POST | /jobs | Create job application |
| GET | /jobs | Get all my applications |
| GET | /jobs/stats | Get statistics by status |
| PUT | /jobs/:id | Update application status |
| DELETE | /jobs/:id | Delete application |
| POST | /companies | Add company |
| GET | /companies | List all companies |
| POST | /interviews | Schedule interview |

## Environment Variables

See `.env.example` for required variables.

## Architecture

Clean modular architecture following SOLID principles:
src/
├── auth/          → JWT Authentication
├── jobs/          → Job Applications (CRUD)
├── companies/     → Company Management
├── interviews/    → Interview Scheduling
└── prisma/        → Database Service

## Author
**Fidan Teymurova** — Information Technologies Student @ Baku Engineering University  
GitHub: [@fidanTeymurova-blip](https://github.com/fidanTeymurova-blip)
