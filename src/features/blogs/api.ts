import { api } from "@/lib/axios";
import type { Blog } from "./types";

export const fetchBlogs = async () => {
  const { data } = await api.get<Blog[]>("/blogs");
  return data;
};

export const createBlog = async (data: Omit<Blog, "id">) => {
  const res = await api.post("/blogs", data);
  return res.data;
};

export const fetchBlog = async (id: string) => {
  const { data } = await api.get<Blog>(`/blogs/${id}`);
  return data;
};
