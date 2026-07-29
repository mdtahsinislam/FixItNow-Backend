export interface ICreateBooking {
    technicianId: string;
    serviceId: string;
    bookingDate: string;
    address: string;
    note?: string;
}
export interface IUpdateBookingStatus {
    status: "ACCEPTED" | "REJECTED" | "ONGOING" | "COMPLETED" | "CANCELLED";
}
//# sourceMappingURL=booking.interface.d.ts.map