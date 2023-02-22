# Storefront Backend Project

API for storefront application. Build with Node.js, Express, and PostgreSQL.

server is running on port 3000.

## Environment Variables

### To set up environment variables, create a .env file in the root directory of the project. The .env file should contain the following:

```bash
# application environment should be set to test if running tests
ENV
# database host, localhost by for local deployment
POSTGRES_HOST
# name of dev database
POSTGRES_DEV_DB_NAME
# name of test database
POSTGRES_TEST_DB_NAME
# name of database user, postgres by default
POSTGRES_USER
# password for database user
POSTGRES_PASSWORD
# port for database, 5432 by default
POSTGRES_PORT
# secret for bcrypt
BCRYPT_PASSWORD
# number of salt rounds for bcrypt, a number
SALT_ROUNDS
# secret for jsonwebtoken
TOKEN_SECRET
```



## Setup Database

### To create dev database, run:

```bash
yarn create-dev-db
```

### To create test database, run:

```bash
yarn create-test-db
```

### To run migrations, run:

```bash
db-migrate up
```

### To run migrations in test environment, run:

```bash
db-migrate up --env test
```

## Getting Started
### To install package dependencies, run:

```bash
yarn install
```
### To lint the code, run:

```bash
yarn lint
```

### To run the application in watch mode, run:

```bash
yarn watch
```

### To run the tests, run:

```bash
yarn test
```




