

// //D:\FixItNow-Backend\src\app.ts

// import express, { Application, Request, Response } from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";

// import router from "./routes";
// import notFound from "./middlewares/notFound";
// import errorHandler from "./middlewares/errorHandler";

// const app: Application = express();

// app.use(
//   cors({
//     origin: true,
//     credentials: true,
//   })
// );

// app.use(express.json());

// app.use(express.urlencoded({ extended: true }));

// app.use(cookieParser());

// app.get("/", (_req: Request, res: Response) => {
//   res.status(200).json({
//     success: true,
//     message: "Welcome to FixItNow Backend API",
//   });
// });

// app.use("/api/v1", router);

// app.use(notFound);

// app.use(errorHandler);

// export default app;



import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import router from "./routes";
import notFound from "./middlewares/notFound";
import errorHandler from "./middlewares/errorHandler";

const app: Application = express();

/**
 * Middlewares
 */
app.use(
  cors({
    origin: true, // পরে Frontend URL দিব
    credentials: true,
  })
);

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cookieParser());

/**
 * Root Route
 */
app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Welcome to FixItNow Backend API",
  });
});

/**
 * API Routes
 */
app.use("/api/v1", router);

/**
 * Not Found Middleware
 */
app.use(notFound);

/**
 * Global Error Handler
 */
app.use(errorHandler);

export default app;