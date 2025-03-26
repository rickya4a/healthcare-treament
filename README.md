# Healthcare Treatment Management System

A web application for medical providers to input details of treatments and medications for patients. The application consists of a React.js as frontend and a NestJS backend with PostgreSQL database.

## Project Structure

The project is organized into two main directories:

- `frontend/`: React.js application with Chakra UI
- `backend/`: NestJS application with Prisma ORM for PostgreSQL

## Features

- Patient treatment record creation
- Form validation
- Multi-select dropdown menus for treatments and medications
- Data storage in PostgreSQL database
- RESTful API with NestJS
- UI framework with Chakra UI

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL database
- npm or yarn package manager

## Getting Started

### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Set up your `.env` file with your PostgreSQL connection string:

```
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
```

or simply copy `.env.example`

4. Generate Prisma client:

```bash
npm run prisma:generate
```

5. Run database migrations:

```bash
npm run prisma:migrate
```

6. Start the development server:

```bash
npm run start:dev
```

The API will be available at `http://localhost:3001`.

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

The application will be available at `http://localhost:3000`.

## Technologies Used

- **Frontend**:
  - React.js
  - Chakra UI
  - Axios

- **Backend**:
  - NestJS
  - Prisma ORM
  - PostgreSQL
  - Class Validator

## API Endpoints

- `POST /treatment`: Create a new treatment record