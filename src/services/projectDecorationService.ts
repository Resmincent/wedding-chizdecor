import type {
  ProjectDecoration,
  ProjectDecorationDetail,
} from "../models/model";
import api from "./api";

export const getAllProjectDecorations = async (): Promise<{
  data: ProjectDecoration[];
}> => {
  const res = await api.get("/project-decorations");
  return res.data;
};

export const getProjectDecorationById = async (
  id: string
): Promise<{ data: ProjectDecorationDetail }> => {
  const res = await api.get(`/project-decorations/${id}`);
  return res.data;
};
