# 1. you first run yarn install to install the dependecies
# 2. you create a .env file the the project root and paste the following
BCRYPT_SALT_ROUNDS=10
DEFAULT_PASS=user12345
DEFAULT_PASS=user12345
RESET_PASS_UI_LINK=http://localhost:5173/
SUPER_ADMIN_PASSWORD=admin12345
PORT=3030
#Dev Status
NODE_ENV=development
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
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=465
SMTP_USERNAME="bongshime@gmail.com"
SMTP_PASSWORD="gfuqhhyqdonqikvm"
EMAIL_FROM="bongshime@gmail.com"


# 3. in your compass, you create a database call it flash-sales

# 4. then you run the project with yarn dev

# 5. to access the endpoints via swagger you type http://localhost:3030/v1/docs/ in your browser



