"use strict";
// // // // // // // // //D:\FixItNow-Backend\src\routes\index.ts
Object.defineProperty(exports, "__esModule", { value: true });
// // // // // // // // import { Router } from "express";
// // // // // // // // const router = Router();
// // // // // // // // /**
// // // // // // // //  * Health Check Route
// // // // // // // //  */
// // // // // // // // router.get("/", (_req, res) => {
// // // // // // // //   res.status(200).json({
// // // // // // // //     success: true,
// // // // // // // //     message: "FixItNow API v1 Running Successfully",
// // // // // // // //   });
// // // // // // // // });
// // // // // // // // /**
// // // // // // // //  * Future Modules
// // // // // // // //  *
// // // // // // // //  * router.use("/auth", authRoutes);
// // // // // // // //  * router.use("/users", userRoutes);
// // // // // // // //  * router.use("/technicians", technicianRoutes);
// // // // // // // //  * router.use("/services", serviceRoutes);
// // // // // // // //  * router.use("/bookings", bookingRoutes);
// // // // // // // //  * router.use("/payments", paymentRoutes);
// // // // // // // //  * router.use("/reviews", reviewRoutes);
// // // // // // // //  */
// // // // // // // // export default router;
// // // // // // // //D:\FixItNow-Backend\src\routes\index.ts
// // // // // // // import { Router } from "express";
// // // // // // // import { AuthRoutes } from "../modules/auth/auth.routes";
// // // // // // // const router = Router();
// // // // // // // /**
// // // // // // //  * Health Check Route
// // // // // // //  */
// // // // // // // router.get("/", (_req, res) => {
// // // // // // //   res.status(200).json({
// // // // // // //     success: true,
// // // // // // //     message: "FixItNow API v1 Running Successfully",
// // // // // // //   });
// // // // // // // });
// // // // // // // /**
// // // // // // //  * Authentication Routes
// // // // // // //  */
// // // // // // // router.use("/auth", AuthRoutes);
// // // // // // // /**
// // // // // // //  * Future Modules
// // // // // // //  */
// // // // // // // //
// // // // // // // // router.use("/users", UserRoutes);
// // // // // // // // router.use("/technicians", TechnicianRoutes);
// // // // // // // // router.use("/services", ServiceRoutes);
// // // // // // // // router.use("/bookings", BookingRoutes);
// // // // // // // // router.use("/payments", PaymentRoutes);
// // // // // // // // router.use("/reviews", ReviewRoutes);
// // // // // // // //
// // // // // // // export default router;
// // // // // // //Gork
// // // // // // // src/routes/index.ts
// // // // // // import { Router } from "express";
// // // // // // import { AuthRoutes } from "../modules/auth/auth.routes";
// // // // // // import { UserRoutes } from "../modules/user/user.routes";
// // // // // // const router = Router();
// // // // // // /**
// // // // // //  * Health Check
// // // // // //  */
// // // // // // router.get("/", (_req, res) => {
// // // // // //   res.status(200).json({
// // // // // //     success: true,
// // // // // //     message: "FixItNow API v1 Running Successfully",
// // // // // //   });
// // // // // // });
// // // // // // /**
// // // // // //  * Module Routes
// // // // // //  */
// // // // // // const moduleRoutes = [
// // // // // //   {
// // // // // //     path: "/auth",
// // // // // //     route: AuthRoutes,
// // // // // //   },
// // // // // //   {
// // // // // //     path: "/users",
// // // // // //     route: UserRoutes,
// // // // // //   },
// // // // // // ];
// // // // // // moduleRoutes.forEach((route) => {
// // // // // //   router.use(route.path, route.route);
// // // // // // });
// // // // // // export default router;
// // // // // //gork 2
// // // // // // src/routes/index.ts
// // // // // import { Router } from "express";
// // // // // import { AuthRoutes } from "../modules/auth/auth.routes";
// // // // // import { UserRoutes } from "../modules/user/user.routes";
// // // // // import { TechnicianRoutes } from "../modules/technician/technician.routes";
// // // // // const router = Router();
// // // // // /**
// // // // //  * Health Check
// // // // //  */
// // // // // router.get("/", (_req, res) => {
// // // // //   res.status(200).json({
// // // // //     success: true,
// // // // //     message: "FixItNow API v1 Running Successfully",
// // // // //   });
// // // // // });
// // // // // /**
// // // // //  * Module Routes
// // // // //  */
// // // // // const moduleRoutes = [
// // // // //   {
// // // // //     path: "/auth",
// // // // //     route: AuthRoutes,
// // // // //   },
// // // // //   {
// // // // //     path: "/users",
// // // // //     route: UserRoutes,
// // // // //   },
// // // // //   {
// // // // //     path: "/technicians",
// // // // //     route: TechnicianRoutes,
// // // // //   },
// // // // // ];
// // // // // moduleRoutes.forEach((route) => {
// // // // //   router.use(route.path, route.route);
// // // // // });
// // // // // export default router;
// // // // // src/routes/index.ts
// // // // import { Router } from "express";
// // // // import { AuthRoutes } from "../modules/auth/auth.routes";
// // // // import { UserRoutes } from "../modules/user/user.routes";
// // // // import { TechnicianRoutes } from "../modules/technician/technician.routes";
// // // // import { ServiceRoutes } from "../modules/service/service.routes";
// // // // const router = Router();
// // // // /**
// // // //  * Health Check
// // // //  */
// // // // router.get("/", (_req, res) => {
// // // //   res.status(200).json({
// // // //     success: true,
// // // //     message: "FixItNow API v1 Running Successfully",
// // // //   });
// // // // });
// // // // /**
// // // //  * Module Routes
// // // //  */
// // // // const moduleRoutes = [
// // // //   { path: "/auth", route: AuthRoutes },
// // // //   { path: "/users", route: UserRoutes },
// // // //   { path: "/technicians", route: TechnicianRoutes },
// // // //   { path: "/services", route: ServiceRoutes },
// // // // ];
// // // // moduleRoutes.forEach((route) => {
// // // //   router.use(route.path, route.route);
// // // // });
// // // // export default router;
// // // // src/routes/index.ts
// // // import { Router } from "express";
// // // import { AuthRoutes } from "../modules/auth/auth.routes";
// // // import { UserRoutes } from "../modules/user/user.routes";
// // // import { TechnicianRoutes } from "../modules/technician/technician.routes";
// // // import { ServiceRoutes } from "../modules/service/service.routes";
// // // import { BookingRoutes } from "../modules/booking/booking.routes";
// // // const router = Router();
// // // router.get("/", (_req, res) => {
// // //   res.status(200).json({
// // //     success: true,
// // //     message: "FixItNow API v1 Running Successfully",
// // //   });
// // // });
// // // const moduleRoutes = [
// // //   { path: "/auth", route: AuthRoutes },
// // //   { path: "/users", route: UserRoutes },
// // //   { path: "/technicians", route: TechnicianRoutes },
// // //   { path: "/services", route: ServiceRoutes },
// // //   { path: "/bookings", route: BookingRoutes },
// // // ];
// // // moduleRoutes.forEach((route) => {
// // //   router.use(route.path, route.route);
// // // });
// // // export default router;
// // // src/routes/index.ts
// // import { Router } from "express";
// // import { AuthRoutes } from "../modules/auth/auth.routes";
// // import { UserRoutes } from "../modules/user/user.routes";
// // import { TechnicianRoutes } from "../modules/technician/technician.routes";
// // import { ServiceRoutes } from "../modules/service/service.routes";
// // import { BookingRoutes } from "../modules/booking/booking.routes";
// // import { PaymentRoutes } from "../modules/payment/payment.routes";
// // const router = Router();
// // router.get("/", (_req, res) => {
// //   res.status(200).json({
// //     success: true,
// //     message: "FixItNow API v1 Running Successfully",
// //   });
// // });
// // const moduleRoutes = [
// //   { path: "/auth", route: AuthRoutes },
// //   { path: "/users", route: UserRoutes },
// //   { path: "/technicians", route: TechnicianRoutes },
// //   { path: "/services", route: ServiceRoutes },
// //   { path: "/bookings", route: BookingRoutes },
// //   { path: "/payments", route: PaymentRoutes },
// // ];
// // moduleRoutes.forEach((route) => {
// //   router.use(route.path, route.route);
// // });
// // export default router;
// // src/routes/index.ts
// import { Router } from "express";
// import { AuthRoutes } from "../modules/auth/auth.routes";
// import { UserRoutes } from "../modules/user/user.routes";
// import { TechnicianRoutes } from "../modules/technician/technician.routes";
// import { ServiceRoutes } from "../modules/service/service.routes";
// import { BookingRoutes } from "../modules/booking/booking.routes";
// import { PaymentRoutes } from "../modules/payment/payment.routes";
// import { ReviewRoutes } from "../modules/review/review.routes";
// const router = Router();
// router.get("/", (_req, res) => {
//   res.status(200).json({
//     success: true,
//     message: "FixItNow API v1 Running Successfully",
//   });
// });
// const moduleRoutes = [
//   { path: "/auth", route: AuthRoutes },
//   { path: "/users", route: UserRoutes },
//   { path: "/technicians", route: TechnicianRoutes },
//   { path: "/services", route: ServiceRoutes },
//   { path: "/bookings", route: BookingRoutes },
//   { path: "/payments", route: PaymentRoutes },
//   { path: "/reviews", route: ReviewRoutes },
// ];
// moduleRoutes.forEach((route) => {
//   router.use(route.path, route.route);
// });
// export default router;
// src/routes/index.ts
const express_1 = require("express");
const auth_routes_1 = require("../modules/auth/auth.routes");
const user_routes_1 = require("../modules/user/user.routes");
const technician_routes_1 = require("../modules/technician/technician.routes");
const service_routes_1 = require("../modules/service/service.routes");
const booking_routes_1 = require("../modules/booking/booking.routes");
const payment_routes_1 = require("../modules/payment/payment.routes");
const review_routes_1 = require("../modules/review/review.routes");
const dashboard_routes_1 = require("../modules/dashboard/dashboard.routes");
const router = (0, express_1.Router)();
router.get("/", (_req, res) => {
    res.status(200).json({
        success: true,
        message: "FixItNow API v1 Running Successfully",
    });
});
const moduleRoutes = [
    { path: "/auth", route: auth_routes_1.AuthRoutes },
    { path: "/users", route: user_routes_1.UserRoutes },
    { path: "/technicians", route: technician_routes_1.TechnicianRoutes },
    { path: "/services", route: service_routes_1.ServiceRoutes },
    { path: "/bookings", route: booking_routes_1.BookingRoutes },
    { path: "/payments", route: payment_routes_1.PaymentRoutes },
    { path: "/reviews", route: review_routes_1.ReviewRoutes },
    { path: "/dashboard", route: dashboard_routes_1.DashboardRoutes },
];
moduleRoutes.forEach((route) => {
    router.use(route.path, route.route);
});
exports.default = router;
//# sourceMappingURL=index.js.map