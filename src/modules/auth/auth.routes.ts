// // import { Router } from "express";
// // import { AuthController } from "./auth.controller";

// // const router = Router();

// // router.post("/register", AuthController.register);

// // router.post("/login", AuthController.login);

// // export const AuthRoutes = router;




// // import { Router } from "express";

// // import { AuthController } from "./auth.controller";
// // import validateRequest from "../../middlewares/validateRequest";
// // import {
// //   registerValidation,
// //   loginValidation,
// // } from "./auth.validation";

// // const router = Router();

// // router.post(
// //   "/register",
// //   validateRequest(registerValidation),
// //   AuthController.register
// // );

// // router.post(
// //   "/login",
// //   validateRequest(loginValidation),
// //   AuthController.login
// // );

// // export const AuthRoutes = router;




// //D:\FixItNow-Backend\src\modules\auth\auth.routes.ts


// import { Router } from "express";
// import { AuthController } from "./auth.controller";
// import validateRequest from "../../middlewares/validateRequest";
// import auth from "../../middlewares/auth";

// import {
//   registerValidation,
//   loginValidation,
// } from "./auth.validation";

// const router = Router();

// router.post(
//   "/register",
//   validateRequest(registerValidation),
//   AuthController.register
// );

// router.post(
//   "/login",
//   validateRequest(loginValidation),
//   AuthController.login
// );

// router.post(
//   "/logout",
//   auth(),
//   AuthController.logout
// );

// router.post(
//   "/refresh-token",
//   AuthController.refreshToken
// );

// router.get(
//   "/me",
//   auth(),
//   AuthController.getMe
// );

// export const AuthRoutes = router;




import { Router } from "express";
import { AuthController } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import {
  registerValidation,
  loginValidation,
} from "./auth.validation";

const router = Router();

router.post(
  "/register",
  validateRequest(registerValidation),
  AuthController.register
);

router.post(
  "/login",
  validateRequest(loginValidation),
  AuthController.login
);

router.post("/logout", auth(), AuthController.logout);

router.post("/refresh-token", AuthController.refreshToken);

router.get("/me", auth(), AuthController.getMe);

export const AuthRoutes = router;

