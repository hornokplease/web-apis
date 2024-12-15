# Hopin Web API

This is the backend for the Hopin Dashboard. The backend endpoint is: [https://hopin.hornokplease.studio/api/](https://hopin.hornokplease.studio/api/)

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Development](#development)
- [License](#license)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/hopin-webapi.git
    cd hopin-webapi
    ```

2. Install dependencies using pnpm:
    ```sh
    pnpm install
    ```

3. Create a `.env` file in the root directory and add your environment variables.

## Usage

1. Build the project:
    ```sh
    pnpm build
    ```

2. Start the server:
    ```sh
    pnpm start
    ```

3. For development, use:
    ```sh
    pnpm dev
    ```

## API Endpoints

### Authentication

- `POST /auth/signup` - Create a new user
- `POST /auth/login` - Login a user

### Events

- `GET /events` - Get all events for the logged-in user
- `GET /events/:id` - Get a specific event by ID
- `POST /events` - Create a new event

### Forms

- `GET /forms/:id/form` - Get form data for a specific event
- `POST /forms/:id/form` - Submit form data for a specific event

## Environment Variables

- `PORT` - The port on which the server will run
- `DB_USER` - Database user
- `DB_PASSWORD` - Database password
- `DB_HOST` - Database host
- `DB_PORT` - Database port
- `DB_DATABASE` - Database name
- `AUTH_KEY` - Key for JWT authentication

## Development

1. Run the development server with hot reloading:
    ```sh
    pnpm dev
    ```

2. To run tests (if any):
    ```sh
    pnpm test
    ```

## License

This project is licensed under the ISC License.