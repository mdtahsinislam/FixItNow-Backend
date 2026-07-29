// import dotenv from "dotenv";

// dotenv.config();

// const requiredEnvVariables = [
//   "PORT",
//   "NODE_ENV",
//   "DATABASE_URL",
//   "JWT_ACCESS_SECRET",
//   "JWT_ACCESS_EXPIRES_IN",
//   "JWT_REFRESH_SECRET",
//   "JWT_REFRESH_EXPIRES_IN",
//   "STRIPE_SECRET_KEY",
//   "STRIPE_PUBLISHABLE_KEY",
// ];

// requiredEnvVariables.forEach((key) => {
//   if (!process.env[key]) {
//     throw new Error(`Missing environment variable: ${key}`);
//   }
// });

// export const env = {
//   port: Number(process.env.PORT),
//   nodeEnv: process.env.NODE_ENV!,

//   databaseUrl: process.env.DATABASE_URL!,

//   jwt: {
//     accessSecret: process.env.JWT_ACCESS_SECRET!,
//     accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN!,

//     refreshSecret: process.env.JWT_REFRESH_SECRET!,
//     refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN!,
//   },

//   stripe: {
//     secretKey: process.env.STRIPE_SECRET_KEY!,
//     publishableKey: process.env.STRIPE_PUBLISHABLE_KEY!,
//   },
// };



import dotenv from "dotenv";

dotenv.config();

const requiredEnvVariables = [
  "PORT",
  "NODE_ENV",
  "DATABASE_URL",
  "JWT_ACCESS_SECRET",
  "JWT_ACCESS_EXPIRES_IN",
  "JWT_REFRESH_SECRET",
  "JWT_REFRESH_EXPIRES_IN",
  "STRIPE_SECRET_KEY",
  "STRIPE_PUBLISHABLE_KEY",
];

requiredEnvVariables.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing environment variable: ${key}`);
  }
});

export const env = {
  port: Number(process.env.PORT),
  nodeEnv: process.env.NODE_ENV!,

  databaseUrl: process.env.DATABASE_URL!,

  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET!,
    accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN!,
    refreshSecret: process.env.JWT_REFRESH_SECRET!,
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN!,
  },

  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY!,
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY!,
  },
};