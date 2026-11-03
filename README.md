# Contact Management Project

A simple contact management API built with Node.js, Express, Prisma, and MySQL/MariaDB. This project is designed for learning and practicing backend development, authentication flow, and relational data management.

## Features

- User registration and login
- Token-based authentication for protected routes
- Create, read, update, and delete contact records
- Add, update, and remove addresses for each contact
- Input validation and structured error handling
- Prisma ORM integration with MySQL
- Automated tests with Jest

## Tech Stack

- Node.js
- Express.js
- Prisma ORM
- MySQL / MariaDB
- Jest
- bcrypt for password hashing
- dotenv for environment configuration

## Project Structure

```bash
.
├── src/
│   ├── application/
│   ├── controller/
│   ├── error/
│   ├── middleware/
│   ├── router/
│   ├── services/
│   ├── validation/
│   ├── main.js
│   └── testApp.http
├── prisma/
│   └── schema.prisma
├── lib/
│   └── prisma.ts
├── generated/
├── test/
├── package.json
├── tsconfig.json
├── .gitignore
├── contact_management_db.sql
├── users_management_db.sql
└── README.md
```

## Prerequisites

Before running this project, make sure you have:

- Node.js 18 or newer
- MySQL or MariaDB server installed and running
- Access to a local database instance

## Environment Configuration

Create a local `.env` file in the project root and configure your database connection details. Keep this file private and never commit real credentials to version control.

Example:

```env
DATABASE_HOST=localhost
DATABASE_USER=root
DATABASE_PASSWORD=your_local_db_password
DATABASE_NAME=contact_management_reactjs_learning_project
DATABASE_PORT=3306
```

> Keep `.env` in your local environment only. Do not expose real passwords or production secrets in public repositories.

## Installation

```bash
npm install
```

## Database Setup

This project uses Prisma with MySQL. You can either:

1. Create the database manually in MySQL, then generate Prisma client.
2. Import the SQL seed/schema files included in the project if available in your local setup.

Generate Prisma client:

```bash
npx prisma generate
```

If your schema has changed and you want to sync it with the database:

```bash
npx prisma db push
```

## Running the Application

Build the project:

```bash
npm run build
```

Start the server:

```bash
npm start
```

The app will run on:

```bash
http://localhost:3000
```

## Testing

Run the test suite:

```bash
npm test
```

## API Endpoints

### Public Endpoints

- `POST /api/users` — register a new user
- `POST /api/users/login` — login and receive a token

### Authenticated Endpoints

- `GET /api/users/current` — get current user profile
- `PATCH /api/users/current` — update current user
- `DELETE /api/users/logout` — logout current user

### Contact Endpoints

- `POST /api/contacts` — create a contact
- `GET /api/contacts` — list contacts
- `GET /api/contacts/:contactId` — get one contact
- `PUT /api/contacts/:contactId` — update a contact
- `DELETE /api/contacts/:contactId` — delete a contact

### Address Endpoints

- `POST /api/contacts/:contactId/address` — add address to contact
- `GET /api/contacts/:contactId/address` — list addresses
- `GET /api/contacts/:contactId/address/:addressId` — get one address
- `PUT /api/contacts/:contactId/address/:addressId` — update an address
- `DELETE /api/contacts/:contactId/address/:addressId` — delete an address

## Notes

- This project is intended for learning and local development.
- Sensitive values such as database credentials, tokens, and private environment settings should remain local-only.
- Do not publish real `.env` values or credentials in public repositories.

## License

This project is currently configured with the ISC license as defined in `package.json`.
