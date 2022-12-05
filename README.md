# devcamper-sequelize

In config/config.env file please add
NODE_ENV=development

FILE_UPLOAD_PATH=./public/uploads
MAX_FILE_UPLOADS=1000000   

JWT_SECRET=your secret
JWT_EXPIRE=Time you want the token to expire on
JWT_COOKIE_EXPIRE=Time you want the cookie to expire on


SMTP_HOST=Host name
SMTP_PORT=Host Port
SMTP_EMAIL=EMail
SMTP_PASSWORD=your password
FROM_EMAIL=sending email
FROM_NAME=your name

** For Dummy data use mailtrap.io or ethreal mail**


After that run "npm i" command then  run "num run dev"
