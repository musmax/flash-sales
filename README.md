## Quick Start

``
Install the dependencies:

```bash
yarn install
```

## Environment Variables

```create a .env in the root folder and add the following
```

# DATABASE_URL=mongodb://localhost:27017/stitches_be
BCRYPT_SALT_ROUNDS=10
DEFAULT_PASS=user12345
DEFAULT_PASS=user12345
RESET_PASS_UI_LINK=http://localhost:5173/
SUPER_ADMIN_PASSWORD=admin12345


# Port number
PORT=3030

#Dev Status
NODE_ENV=development

# cloudinary
CLOUD_NAME=dvkmfyw3r
CLOUDINARY_API_KEY=879584361933139
CLOUDINARY_API_SECRET=_7Pq3VpV-QElND_oFzI4qS76xmE

MONGODB_URL=mongodb://127.0.0.1:27017/flash-sales

BCRYPT_SALT_ROUNDS=10
DEFAULT_PASS=user12345
JWT_SECRET=c033b5ff4531e622ea3f93170e045222963319662b7e4a34f0cdd
JWT_REFRESH_SECRET=41b991b21dc0a439cb45fed544992ba3fafa3f912d3c4dedebec3592d7d552fb74a86a4d69
JWT_ACCESS_EXPIRES_IN=100
JWT_REFRESH_EXPIRES_IN=365
RESET_PASS_UI_LINK=http://localhost:5173/


# SMTP configuration options for the email service
# For testing, you can use a fake SMTP service like Ethereal: https://ethereal.email/create
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=465
SMTP_USERNAME="bongshime@gmail.com"
SMTP_PASSWORD="gfuqhhyqdonqikvm"
EMAIL_FROM="bongshime@gmail.com"

# Paystack url
PAYSTACK_SECRET=sk_test_b67c74ff0ca0c976a02d9689b30d5ecb7f04398f 
```


To run the project, simply run:

```bash
yarn dev
````

```bash
open your browser and type http://localhost:3030/v1/docs this will open the swagger documentation and you can interact with the endpoint as you want. if you change the port it also means u change the accessing port on the browser.

Set the environment variables:

```bash
cp .env.example .env

# open .env and modify the environment variables (if needed)
```

Running locally:

```bash
yarn dev
```

Running in production:

```bash
yarn start
```

Testing:

```bash
# run all tests
yarn test

# run all tests in watch mode
yarn test:watch

# run test coverage
yarn coverage
```

Docker:

```bash
# run docker container in development mode
yarn docker:dev

# run docker container in production mode
yarn docker:prod

# run all tests in a docker container
yarn docker:test
```

Linting:

```bash
# run ESLint
yarn lint

# fix ESLint errors
yarn lint:fix

# run prettier
yarn prettier

# fix prettier errors
yarn prettier:fix
```
