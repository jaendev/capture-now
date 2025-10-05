import { apiClient } from "@/app/api/apiClient";
import { CreateTagDTO, Tag } from "../types/Tag";

export const createTag = (tagData: CreateTagDTO) =>
  apiClient.post<Tag>("/tags", tagData);

export const getTags = () =>
  apiClient.get<Tag[]>("/tags");

export const createDefaultTags = () =>
  apiClient.post<Tag[]>("/tags", { createDefaults: true });