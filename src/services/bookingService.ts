import type {
  BookingPayload,
  BookingCreatedResponse,
  UserBookingItem,
  BookingDetail,
} from "../models/model";
import api from "./api";

export const createBooking = async (
  payload: BookingPayload
): Promise<BookingCreatedResponse> => {
  const response = await api.post("/booking", payload);
  return response.data;
};

export const getMyBookings = async (): Promise<{ data: UserBookingItem[] }> => {
  const response = await api.get("/booking/me");
  return response.data;
};

export const getBookingDetail = async (
  id: string
): Promise<{ data: BookingDetail }> => {
  const response = await api.get(`/booking/${id}`);
  return response.data;
};
