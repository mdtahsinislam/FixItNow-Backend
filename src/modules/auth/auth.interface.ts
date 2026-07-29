

// //D:\FixItNow-Backend\src\modules\auth\auth.interface.ts

// export interface IRegisterUser {
//   name: string;
//   email: string;
//   password: string;
//   phone?: string;
//   address?: string;
// }

// export interface ILoginUser {
//   email: string;
//   password: string;
// }

// export interface IJwtPayload {
//   userId: string;
//   email: string;
//   role: "ADMIN" | "CUSTOMER" | "TECHNICIAN";
// }



//gork

export interface IRegisterUser {
  name: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
  role?: "CUSTOMER" | "TECHNICIAN"; // optional, default CUSTOMER
}

export interface ILoginUser {
  email: string;
  password: string;
}

export interface IJwtPayload {
  userId: string;
  email: string;
  role: "ADMIN" | "CUSTOMER" | "TECHNICIAN";
}