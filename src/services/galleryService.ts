import api from "./api";
import type { GalleryItem } from "../models/model";

export const getAllGalleryDecorations = async (): Promise<{
  data: GalleryItem[];
}> => {
  const res = await api.get("/gallery-decorations");
  return res.data;
};
