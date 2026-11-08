# Contact Management Project

A Node.js + Express backend for managing users, contacts, addresses, and hierarchical categories. This project is designed for learning backend development, Prisma ORM, authentication flow, and Redis caching strategies.

## Features

- User registration and login
- Token-based authentication for protected routes
- Create, read, update, and delete contact records
- Add, update, and remove addresses for each contact
- Category API with hierarchical data structure
- Redis caching for frequently accessed category data
- Input validation and structured error handling
- Prisma ORM integration with MySQL
- Automated tests with Jest

## Tech Stack

- Node.js
- Express.js
- Prisma ORM
- MySQL / MariaDB
- Redis
- Jest
- bcrypt for password hashing
- dotenv for environment configuration
- ioredis for Redis client

## Project Structure

```bash
.
├── src/
│   ├── application/
│   │   ├── database.js
│   │   ├── logging.js
│   │   ├── redis.js
│   │   └── web.js
│   ├── controller/
│   │   ├── controller-categories.js
│   │   └── controller-user.js
│   ├── error/
│   ├── middleware/
│   ├── router/
│   │   ├── api-public.js
│   │   └── api.js
│   ├── services/
│   │   ├── service-categories.js
│   │   └── service-user.js
│   ├── validation/
│   ├── main.js
│   ├── script.js
│   ├── testApp.http
│   └── testRedis.http
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── generated/
├── test/
├── package.json
├── tsconfig.json
├── .gitignore
├── README.md
└── redis/
    └── redis.conf
```

## Prerequisites

Before running this project, make sure you have:

- Node.js 18 or newer
- MySQL or MariaDB server installed and running
- Redis server installed and running
- Access to a local database instance

## Environment Configuration

Create a local `.env` file in the project root and configure your database and Redis connection details. Keep this file private and never commit real credentials to version control.

Example:

```env
DATABASE_URL="mysql://root:your_password@localhost:3306/belajar_nodejs_redis_cache"
DATABASE_HOST=localhost
DATABASE_USER=root
DATABASE_PASSWORD=your_local_db_password
DATABASE_NAME=belajar_nodejs_redis_cache
REDIS_HOST=127.0.0.1
REDIS_PORT=6380
REDIS_DB=0
```

> Keep `.env` in your local environment only. Do not expose real passwords or production secrets in public repositories.

## Installation

```bash
npm install
```

If Redis is not installed yet, start it locally:

```bash
redis-server
```

Or if you are using a custom port:

```bash
redis-server --port 6380
```

## Database Setup

This project uses Prisma with MySQL. You can either:

1. Create the database manually in MySQL, then generate the Prisma client.
2. Use the migration files included in the project.

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

- `GET /api/categories` — get root categories with nested children data
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

### Category Endpoint

The `GET /api/categories` endpoint is used to fetch hierarchical category data. The data is loaded from MySQL/Prisma and cached in Redis to reduce repeated database queries.

Example response:

```json
{
  "data": [
    {
      "id": "food",
      "name": "Food",
      "children": [
        {
          "id": "fruit",
          "name": "Fruit",
          "children": []
        }
      ]
    }
  ]
}
```

## Redis Implementation

The project uses Redis for caching category queries.

Flow:

1. The application tries to read the `categories` key from Redis.
2. If the key exists, the cached JSON is returned immediately.
3. If not, Prisma queries the database for top-level categories (`parentId: null`).
4. The result is stored in Redis with a TTL of 3600 seconds (`SETEX categories 3600 ...`).
5. Subsequent requests reuse the cached data instead of hitting MySQL repeatedly.

This pattern is implemented in `src/services/service-categories.js` and uses the Redis client configured in `src/application/redis.js`.

Default Redis configuration used in this project:

```js
export const redis = new Redis({
  host: "127.0.0.1",
  port: 6380,
  db: 0,
  maxRetriesPerRequest: 3,
  enableOfflineQueue: false,
});
```

## Notes

- This project is intended for learning and local development.
- The category tree is stored in a relational database and exposed through a Redis-cached API.
- Sensitive values such as database credentials, tokens, and private environment settings should remain local-only.
- Do not publish real `.env` values or credentials in public repositories.

## License

This project is currently configured with the ISC license as defined in `package.json`.
