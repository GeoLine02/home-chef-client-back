export const configuration = () => ({
  port: process.env.PORT,
  db: {
    dbName: process.env.DB_NAME,
    dbPassword: process.env.DB_PASSWORD,
    dbUser: process.env.DB_USER,
  },
  jwtSecret: process.env.JWT_SECRET,
});
