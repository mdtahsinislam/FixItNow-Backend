// import { PrismaClient, UserRole, TechnicianStatus } from "@prisma/client";
// import bcrypt from "bcrypt";

// const prisma = new PrismaClient();

// async function main() {
//   console.log("🌱 Seeding started...");

//   // ======================
//   // 1. Create Admin
//   // ======================
//   const hashedPassword = await bcrypt.hash("admin123", 12);

//   const admin = await prisma.user.upsert({
//     where: { email: "admin@fixitnow.com" },
//     update: {},
//     create: {
//       name: "Super Admin",
//       email: "admin@fixitnow.com",
//       password: hashedPassword,
//       phone: "01700000000",
//       role: UserRole.ADMIN,
//       isActive: true,
//     },
//   });

//   console.log("✅ Admin created:", admin.email);

//   // ======================
//   // 2. Create Sample Customer
//   // ======================
//   const customerPassword = await bcrypt.hash("customer123", 12);

//   const customer = await prisma.user.upsert({
//     where: { email: "customer@example.com" },
//     update: {},
//     create: {
//       name: "John Customer",
//       email: "customer@example.com",
//       password: customerPassword,
//       phone: "01811111111",
//       address: "Dhaka, Bangladesh",
//       role: UserRole.CUSTOMER,
//     },
//   });

//   console.log("✅ Customer created:", customer.email);

//   // ======================
//   // 3. Create Sample Technician
//   // ======================
//   const techPassword = await bcrypt.hash("technician123", 12);

//   const technicianUser = await prisma.user.upsert({
//     where: { email: "technician@example.com" },
//     update: {},
//     create: {
//       name: "Karim Technician",
//       email: "technician@example.com",
//       password: techPassword,
//       phone: "01922222222",
//       address: "Mirpur, Dhaka",
//       role: UserRole.TECHNICIAN,
//     },
//   });

//   const technician = await prisma.technician.upsert({
//     where: { userId: technicianUser.id },
//     update: {},
//     create: {
//       userId: technicianUser.id,
//       skills: ["Plumbing", "Electrical", "AC Repair"],
//       experience: 5,
//       hourlyRate: 500,
//       bio: "Experienced home service technician with 5+ years",
//       status: TechnicianStatus.APPROVED,
//       availability: true,
//     },
//   });

//   console.log("✅ Technician created:", technicianUser.email);

//   // ======================
//   // 4. Create Sample Services
//   // ======================
//   const servicesData = [
//     {
//       title: "Plumbing Service",
//       description: "Professional plumbing repair and installation",
//       category: "Plumbing",
//       price: 800,
//     },
//     {
//       title: "Electrical Wiring",
//       description: "Home and office electrical wiring and repair",
//       category: "Electrical",
//       price: 1200,
//     },
//     {
//       title: "AC Servicing",
//       description: "Air conditioner cleaning and gas refill",
//       category: "AC Repair",
//       price: 1500,
//     },
//     {
//       title: "House Cleaning",
//       description: "Deep cleaning service for home",
//       category: "Cleaning",
//       price: 1000,
//     },
//     {
//       title: "Painting Service",
//       description: "Interior and exterior painting",
//       category: "Painting",
//       price: 2000,
//     },
//   ];

//   for (const service of servicesData) {
//     await prisma.service.upsert({
//       where: { id: service.title }, // temporary
//       update: {},
//       create: service,
//     }).catch(async () => {
//       // if upsert fails due to id, just create
//       const exists = await prisma.service.findFirst({
//         where: { title: service.title },
//       });
//       if (!exists) {
//         await prisma.service.create({ data: service });
//       }
//     });
//   }

//   console.log("✅ Services created");

//   console.log("🎉 Seeding completed successfully!");
//   console.log("--------------------------------");
//   console.log("Admin Login:");
//   console.log("Email   : admin@fixitnow.com");
//   console.log("Password: admin123");
//   console.log("--------------------------------");
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });




import { PrismaClient, UserRole, TechnicianStatus } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding started...");

  const hashedPassword = await bcrypt.hash("admin123", 12);

  // 1. Admin
  const admin = await prisma.user.upsert({
    where: { email: "admin@fixitnow.com" },
    update: {},
    create: {
      name: "Super Admin",
      email: "admin@fixitnow.com",
      password: hashedPassword,
      phone: "01700000000",
      role: UserRole.ADMIN,
      isActive: true,
    },
  });
  console.log("✅ Admin created:", admin.email);

  // 2. Customer
  const customerPassword = await bcrypt.hash("customer123", 12);

  const customer = await prisma.user.upsert({
    where: { email: "customer@example.com" },
    update: {},
    create: {
      name: "John Customer",
      email: "customer@example.com",
      password: customerPassword,
      phone: "01811111111",
      address: "Dhaka, Bangladesh",
      role: UserRole.CUSTOMER,
    },
  });
  console.log("✅ Customer created:", customer.email);

  // 3. Technician
  const techPassword = await bcrypt.hash("technician123", 12);

  const technicianUser = await prisma.user.upsert({
    where: { email: "technician@example.com" },
    update: {},
    create: {
      name: "Karim Technician",
      email: "technician@example.com",
      password: techPassword,
      phone: "01922222222",
      address: "Mirpur, Dhaka",
      role: UserRole.TECHNICIAN,
    },
  });

  await prisma.technician.upsert({
    where: { userId: technicianUser.id },
    update: {},
    create: {
      userId: technicianUser.id,
      skills: ["Plumbing", "Electrical", "AC Repair"],
      experience: 5,
      hourlyRate: 500,
      bio: "Experienced home service technician",
      status: TechnicianStatus.APPROVED,
      availability: true,
    },
  });
  console.log("✅ Technician created:", technicianUser.email);

  // 4. Services
  const services = [
    {
      title: "Plumbing Service",
      description: "Professional plumbing repair and installation",
      category: "Plumbing",
      price: 800,
    },
    {
      title: "Electrical Wiring",
      description: "Home and office electrical wiring and repair",
      category: "Electrical",
      price: 1200,
    },
    {
      title: "AC Servicing",
      description: "Air conditioner cleaning and gas refill",
      category: "AC Repair",
      price: 1500,
    },
    {
      title: "House Cleaning",
      description: "Deep cleaning service for home",
      category: "Cleaning",
      price: 1000,
    },
    {
      title: "Painting Service",
      description: "Interior and exterior painting",
      category: "Painting",
      price: 2000,
    },
  ];

  for (const service of services) {
    const exists = await prisma.service.findFirst({
      where: { title: service.title },
    });

    if (!exists) {
      await prisma.service.create({ data: service });
    }
  }

  console.log("✅ Services created");
  console.log("🎉 Seeding completed!");
  console.log("----------------------------");
  console.log("Admin Email   : admin@fixitnow.com");
  console.log("Admin Password: admin123");
  console.log("----------------------------");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });