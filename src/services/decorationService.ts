import type { Decoration, DecorationDetail } from "../models/model";
import api from "./api";

export const getAllDecorations = async (): Promise<{ data: Decoration[] }> => {
  const res = await api.get("decoration");
  return res.data;
};

export const getDecorationById = async (
  id: string
): Promise<{ data: DecorationDetail }> => {
  const res = await api.get(`/decoration/${id}`);
  return res.data;
};
