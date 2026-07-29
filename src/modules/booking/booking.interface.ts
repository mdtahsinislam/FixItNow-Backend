export interface ICreateBooking {
  technicianId: string;
  serviceId: string;
  bookingDate: string; // ISO date string
  address: string;
  note?: string;
}

export interface IUpdateBookingStatus {
  status: "ACCEPTED" | "REJECTED" | "ONGOING" | "COMPLETED" | "CANCELLED";
}