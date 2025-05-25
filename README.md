# QuickLink API | URL Shortener Backend

**QuickLink API** is the backend service for the QuickLink URL shortener. Built with the **PERN stack** (PostgreSQL, Express, React, Node.js), this RESTful API handles authentication, link creation, and all interactions with the database.

It uses **JWT-based authentication** and **cookie management** to manage user sessions securely.

## Table of Contents

- [Overview 📋](#quicklink-api--url-shortener-backend)

  - [Getting Started 🚀](#getting-started-🚀)

    - [Prerequisites](#prerequisites)
    - [Installation](#installation)

  - [Built With 🛠️](#built-with-🛠️)
  - [License 📜](#license-📜)

## Getting Started 🚀

### Prerequisites

- [x] [Node.js](https://nodejs.org) (v20.x or higher)
- [x] [pnpm](https://pnpm.io) (v10 or higher)
- [x] [PostgreSQL](https://www.postgresql.org/) (running locally or in the cloud)
- [x] [Visual Studio Code](https://code.visualstudio.com) with recommended extensions (ESLint, Prettier)

### Installation

1. **Clone this repository**:

   ```bash
   git clone https://github.com/JefferGonzalez/quicklink-api.git
   ```

2. **Navigate to the project directory**:

   ```bash
   cd quicklink-api
   ```

3. **Install dependencies**:

   ```bash
   pnpm install
   ```

4. **Configure environment variables**:
   Create a `.env` file in the root directory based on the `.env.example` file provided.

   - **JSON_WEB_TOKEN_SECRET**: A secret key for signing JWT tokens. You can generate a random string using `openssl rand -base64 32` or any other method.

   - **Github OAuth**:

     - [Creating an OAuth app](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app)

   - **Google OAuth**:

     - [Using OAuth 2.0 to Access Google APIs Google for Developers](https://developers.google.com/identity/protocols/oauth2?hl=es-419)

5. **Set up the database**:

   You can use a cloud-based or local PostgreSQL instance. The project uses [Prisma](https://www.prisma.io/) for ORM, and environment variables are provided for both setups.

   **Choose one of the following options:**

   - **Using Neon (recommended for ease of setup in the cloud):**

     - Sign up at [neon](https://neon.tech/docs/get-started-with-neon/signing-up)
     - Create a PostgreSQL project and get your connection string
     - Set the `DATABASE_URL` and `DIRECT_URL` variables in your `.env` file with that connection string

   - **Using a local PostgreSQL instance:**

     - Make sure PostgreSQL is installed and running locally
     - Create a database (e.g., `quicklink`)
     - Update the `DATABASE_URL` in your `.env` file with your local connection string. For more details, see [Prisma: Connect your database (PostgreSQL)](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/connect-your-database-node-postgresql)

   Once configured, you can initialize the database schema with:

   ```bash
   pnpm prisma migrate dev
   ```

6. **Run the development server**:

   ```bash
    pnpm dev
   ```

   The server will start on `http://localhost:1234` by default.

## Built With 🛠️

- [Node.js](https://nodejs.org/) – JavaScript runtime
- [Express.js](https://expressjs.com/) – Web framework for Node.js
- [TypeScript](https://www.typescriptlang.org/) – Superset of JavaScript for type safety
- [Prisma](https://www.prisma.io/) – ORM for database interactions
- [PostgreSQL](https://www.postgresql.org/) – Relational database
- [JWT](https://jwt.io/) – JSON Web Tokens for authentication
- [pnpm](https://pnpm.io/) - A fast, disk space-efficient package manager

## License 📜

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
